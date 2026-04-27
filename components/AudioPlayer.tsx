"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import type { Locale } from "@/lib/i18n";
import { translations } from "@/lib/translations";

// Кэш декодированной формы волны — выполняется один раз за сессию браузера
const BAR_W = 2;  // css px
const GAP    = 2;  // css px
const fallbackWaveform = Array.from({ length: 120 }, (_, index) => {
  const wave = Math.sin(index * 0.42) * 0.35 + Math.sin(index * 0.13) * 0.25;
  return Math.max(0.18, Math.min(1, 0.55 + wave));
});

export default function AudioPlayer({ locale }: { locale: Locale }) {
  const audioRef    = useRef<HTMLAudioElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const waveformRef = useRef<number[]>([]);   // normalised 0..1 amplitudes
  const progressRef = useRef(0);              // 0..1
  const animRef     = useRef<number>(0);
  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const t = translations[locale].home;

  // ── Listen for videoPlayerPlay event → pause audio ──────────────────────
  useEffect(() => {
    const handler = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
        cancelAnimationFrame(animRef.current);
        setPlaying(false);
      }
    };
    window.addEventListener("videoPlayerPlay", handler);
    return () => window.removeEventListener("videoPlayerPlay", handler);
  }, []);

  // ── decode audio → waveform (один раз, результат кэшируется) ────────────
  useEffect(() => {
    waveformRef.current = fallbackWaveform;
  }, []);

  // ── draw ─────────────────────────────────────────────────────────────────
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr  = window.devicePixelRatio || 1;
    const W    = canvas.width;
    const H    = canvas.height;
    const bw   = BAR_W * dpr;
    const gap  = GAP   * dpr;
    const step = bw + gap;
    const bars = Math.floor(W / step);
    const wf   = waveformRef.current;
    const prog = progressRef.current;

    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < bars; i++) {
      const t     = i / (bars - 1);
      const idx   = Math.round(t * (wf.length - 1));
      const amp   = wf.length > 0 ? wf[idx] : 0.3;
      const barH  = Math.max(bw, amp * H * 0.85);
      const x     = i * step;
      const y     = (H - barH) / 2;
      const played = t <= prog;

      ctx.fillStyle  = "#ebe2c3";
      ctx.globalAlpha = played ? 0.9 : 0.28;

      // rounded caps
      const r = bw / 2;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + bw, y,        x + bw, y + barH, r);
      ctx.arcTo(x + bw, y + barH, x,      y + barH, r);
      ctx.arcTo(x,      y + barH, x,      y,        r);
      ctx.arcTo(x,      y,        x + bw, y,        r);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  // ── resize canvas ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      redraw();
    };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [redraw]);

  // ── redraw on waveform load or progress change ───────────────────────────
  useEffect(() => { redraw(); }, [redraw]);

  useEffect(() => {
    progressRef.current = progress;
    redraw();
  }, [progress, redraw]);

  // ── trigger global pageReady event for the PageLoader once loaded ─────────
  // ── timeupdate ────────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onMeta = () => { if (audio.duration) setDuration(audio.duration); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    // метаданные могут быть уже загружены (кэш браузера)
    if (audio.readyState >= 1 && audio.duration) setDuration(audio.duration);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  // ── play / pause ──────────────────────────────────────────────────────────
  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      cancelAnimationFrame(animRef.current);
      setPlaying(false);
    } else {
      // Dispatch event so VideoPlayer pauses
      window.dispatchEvent(new CustomEvent("audioPlayerPlay"));
      await audio.play();
      setPlaying(true);
    }
  }, [playing]);

  const onEnded = useCallback(() => {
    setPlaying(false);
    setProgress(0);
    progressRef.current = 0;
    redraw();
  }, [redraw]);

  // ── seek on click ─────────────────────────────────────────────────────────
  const onCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const audio  = audioRef.current;
    if (!canvas || !audio || !audio.duration) return;
    const { left, width } = canvas.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - left) / width));
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio);
  }, []);

  // ── format time ───────────────────────────────────────────────────────────
  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#172535] rounded-2xl lg:rounded-[20px] p-4 lg:p-5 w-full max-w-118.75 mx-auto">
      <p className="text-white font-bold text-[15px] lg:text-[20px] mb-1">
        {t.audioTitle}
      </p>
      <p className="text-white text-[12px] lg:text-[15px] mb-4 lg:mb-5 opacity-70">
        {t.audioText}
      </p>

      <div className="bg-[#1d334b] border border-[#ebe2c3]/20 rounded-xl lg:rounded-[14px] flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-2.5 lg:py-3">
        {/* Play / Pause */}
        <button
          onClick={toggle}
          className="shrink-0 w-10 h-10 rounded-full bg-[#ebe2c3] flex items-center justify-center hover:bg-[#f5efd8] transition-colors"
          aria-label={playing ? t.pause : t.play}
        >
          {playing ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <rect x="0" y="0" width="4" height="14" rx="1" fill="#0a1521" />
              <rect x="8" y="0" width="4" height="14" rx="1" fill="#0a1521" />
            </svg>
          ) : (
            <svg width="10" height="13" viewBox="0 0 10 13" fill="none">
              <path d="M1 1L9 6.5L1 12V1Z" fill="#0a1521" />
            </svg>
          )}
        </button>

        {/* Waveform */}
        <canvas
          ref={canvasRef}
          onClick={onCanvasClick}
          className="flex-1 h-10 cursor-pointer"
          style={{ width: "100%", display: "block" }}
        />

        {/* Time */}
        <span className="shrink-0 text-[#ebe2c3]/60 text-[11px] lg:text-[12px] tabular-nums w-8 text-right">
          {duration ? fmt((1 - progress) * duration) : ""}
        </span>
      </div>

      <audio ref={audioRef} src="/PodcastForPlayer.MP3" preload="metadata" onEnded={onEnded} />
    </div>
  );
}
