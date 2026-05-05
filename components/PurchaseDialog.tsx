"use client";
import { useState, useEffect, useCallback } from "react";

type PurchaseDialogProps = {
  phone: string;
  buttonLabel: string;
  modalTitle: string;
  modalText: string;
  closeLabel: string;
};

export default function PurchaseDialog({
  phone,
  buttonLabel,
  modalTitle,
  modalText,
  closeLabel,
}: PurchaseDialogProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-block bg-[#183b62] border border-[#ebe2c3] text-[#ebe2c3]
                   font-bold text-[14px] lg:text-[16px] uppercase px-8 py-3 rounded-xl
                   hover:bg-[#1f4a7a] transition-colors"
      >
        {buttonLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative bg-[#172535] border border-[#ebe2c3]/20 rounded-2xl p-8 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
              aria-label={closeLabel}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-[#183b62] border border-[#ebe2c3]/30 flex items-center justify-center mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6.6 10.8C7.8 13.1 9.9 15.2 12.2 16.4L14 14.6C14.3 14.3 14.7 14.2 15 14.4C16.1 14.8 17.3 15 18.5 15C19.3 15 20 15.7 20 16.5V19C20 19.8 19.3 20.5 18.5 20.5C9.9 20.5 3 13.6 3 5C3 4.2 3.7 3.5 4.5 3.5H7C7.8 3.5 8.5 4.2 8.5 5C8.5 6.2 8.7 7.4 9.1 8.5C9.3 8.8 9.2 9.2 8.9 9.5L7.1 11.3L6.6 10.8Z" fill="#ebe2c3"/>
              </svg>
            </div>

            <h3 className="font-playfair font-bold text-white text-[20px] mb-2">
              {modalTitle}
            </h3>
            <p className="text-white/70 text-[14px] mb-5">{modalText}</p>

            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 bg-[#1d334b] border border-[#ebe2c3]/20 rounded-xl px-5 py-4 hover:border-[#ebe2c3]/50 transition-colors group"
            >
              <span className="text-[#ebe2c3] font-bold text-[16px] lg:text-[18px] tracking-wide group-hover:text-white transition-colors">
                {phone}
              </span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
