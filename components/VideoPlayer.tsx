"use client";
import { useRef, useState, useEffect, useCallback } from "react";

type FullscreenElement = HTMLDivElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void;
  msExitFullscreen?: () => Promise<void> | void;
};

type VideoPlayerProps = {
  src: string;
  poster?: string;
  fullscreenLabel?: string;
};

export default function VideoPlayer({
  src,
  poster,
  fullscreenLabel = "На весь экран",
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Format time ──────────────────────────────────────────────────────────
  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };

  // ── Show/hide controls on interaction ────────────────────────────────────
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3000);
  }, []);

  // ── Listen for audioPlayerPlay event → pause video ──────────────────────
  useEffect(() => {
    const handler = () => {
      const video = videoRef.current;
      if (video && !video.paused) {
        video.pause();
        setPlaying(false);
      }
    };
    window.addEventListener("audioPlayerPlay", handler);
    return () => window.removeEventListener("audioPlayerPlay", handler);
  }, []);

  // ── Time update ─────────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => {
      if (video.duration) {
        setProgress(video.currentTime / video.duration);
        setCurrentTime(video.currentTime);
      }
    };
    const onMeta = () => {
      if (video.duration) setDuration(video.duration);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("loadstart", onWaiting);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("playing", onCanPlay);

    if (video.readyState >= 1 && video.duration) setDuration(video.duration);

    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("loadstart", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("playing", onCanPlay);
    };
  }, []);

  // ── Play / Pause ─────────────────────────────────────────────────────────
  const toggle = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
      setShowControls(true);
    } else {
      window.dispatchEvent(new CustomEvent("videoPlayerPlay"));
      setPlaying(true);
      setLoading(video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
      resetHideTimer();
      video.play().catch(() => {
        setPlaying(false);
        setLoading(false);
        setShowControls(true);
      });
    }
  }, [playing, resetHideTimer]);

  // ── Click outside the button ──────────────────────────────────────────────
  const handleAreaClick = useCallback(() => {
    if (!playing) {
      // Paused: start playing
      toggle();
    } else if (showControls) {
      // Playing with controls visible: hide them
      setShowControls(false);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    } else {
      // Playing with controls hidden: show them
      resetHideTimer();
    }
  }, [playing, showControls, toggle, resetHideTimer]);

  // ── Ended ────────────────────────────────────────────────────────────────
  const onEnded = useCallback(() => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setShowControls(true);
  }, []);

  // ── FullScreen ───────────────────────────────────────────────────────────
  const toggleFullScreen = useCallback(async () => {
    const container = containerRef.current as FullscreenElement | null;
    const fullscreenDocument = document as FullscreenDocument;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        await container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        await container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        await container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (fullscreenDocument.webkitExitFullscreen) {
        await fullscreenDocument.webkitExitFullscreen();
      } else if (fullscreenDocument.msExitFullscreen) {
        await fullscreenDocument.msExitFullscreen();
      }
    }
  }, []);

  // ── Seek on progress bar click ───────────────────────────────────────────
  const onProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = progressRef.current;
      const video = videoRef.current;
      if (!bar || !video || !video.duration) return;
      const { left, width } = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - left) / width));
      video.currentTime = ratio * video.duration;
      setProgress(ratio);
      setCurrentTime(ratio * video.duration);
    },
    []
  );

  // ── Drag-seek on progress bar ────────────────────────────────────────────
  const [dragging, setDragging] = useState(false);

  const onProgressMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(true);
      onProgressClick(e);
    },
    [onProgressClick]
  );

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const bar = progressRef.current;
      const video = videoRef.current;
      if (!bar || !video || !video.duration) return;
      const { left, width } = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - left) / width));
      video.currentTime = ratio * video.duration;
      setProgress(ratio);
      setCurrentTime(ratio * video.duration);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full group cursor-pointer select-none bg-black"
      onMouseMove={resetHideTimer}
      onMouseLeave={() => {
        if (playing) setShowControls(false);
      }}
    >
      {/* Video — click outside button shows/hides controls */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        preload="auto"
        onEnded={onEnded}
        onClick={handleAreaClick}
      />

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20 pointer-events-none">
          <div className="w-12 h-12 rounded-full border-4 border-[#ebe2c3]/30 border-t-[#ebe2c3] animate-spin" />
        </div>
      )}

      {/* Overlay — click outside button hides interface */}
      <div
        data-loading={loading}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          !loading && (showControls || !playing) ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleAreaClick}
      >
        {/* Darkened overlay when paused */}
        {!playing && (
          <div className="absolute inset-0 bg-black/40" />
        )}

        {/* Central play/pause button — click stops propagation, toggles play */}
        <div
          className="relative z-10 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#ebe2c3]/90 hover:bg-[#ebe2c3] flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg cursor-pointer"
          onClick={(e) => { e.stopPropagation(); toggle(); }}
        >
          {playing ? (
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <rect x="1" y="0" width="6" height="24" rx="2" fill="#0a1521" />
              <rect x="13" y="0" width="6" height="24" rx="2" fill="#0a1521" />
            </svg>
          ) : (
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" className="ml-1">
              <path d="M2 1L20 13L2 25V1Z" fill="#0a1521" />
            </svg>
          )}
        </div>
      </div>

      {/* Bottom controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${
          showControls || !playing ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-t from-black/70 to-transparent pt-8 pb-3 px-4">
          {/* Progress bar */}
          <div
            ref={progressRef}
            className="relative h-1.5 bg-white/25 rounded-full cursor-pointer mb-2 group/bar"
            onMouseDown={onProgressMouseDown}
          >
            {/* Played portion */}
            <div
              className="absolute top-0 left-0 h-full bg-[#ebe2c3] rounded-full transition-[width] duration-75"
              style={{ width: `${progress * 100}%` }}
            />
            {/* Seek handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#ebe2c3] rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200"
              style={{ left: `calc(${progress * 100}% - 7px)` }}
            />
          </div>

          {/* Bottom Bar: Time + FullScreen */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-white/70 text-[11px] lg:text-[12px] tabular-nums">
                {fmt(currentTime)}
              </span>
              <span className="text-white/40 text-[10px] lg:text-[11px]">/</span>
              <span className="text-white/70 text-[11px] lg:text-[12px] tabular-nums">
                {duration ? fmt(duration) : "0:00"}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullScreen();
              }}
              className="p-1.5 -mr-1.5 hover:bg-white/20 rounded-lg transition-colors"
              aria-label={fullscreenLabel}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14L5 14L5 19L10 19L10 17L7 17L7 14Z" fill="#ebe2c3" />
                <path d="M5 10L7 10L7 7L10 7L10 5L5 5L5 10Z" fill="#ebe2c3" />
                <path d="M17 19L14 19L14 17L17 17L17 14L19 14L19 19L17 19Z" fill="#ebe2c3" />
                <path d="M14 5L14 7L17 7L17 10L19 10L19 5L14 5Z" fill="#ebe2c3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
