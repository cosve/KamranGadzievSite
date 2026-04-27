"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
}

function GalleryImg({ src, className }: { src: string; className?: string }) {
  return (
    <div className={`relative bg-[#172535] overflow-hidden ${className ?? ""}`}>
      {src && (
        <Image src={src} alt="" fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
      )}
    </div>
  );
}

export default function PageGallery({ images }: Props) {
  const [active, setActive] = useState(0);
  const [touchX, setTouchX] = useState(0);
  const count = images.length;

  const prev = () => setActive(i => Math.max(0, i - 1));
  const next = () => setActive(i => Math.min(count - 1, i + 1));

  return (
    <>
      {/* Desktop: главное изображение + 3 миниатюры справа */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_22.5%] lg:gap-6 h-[498px]">
        <GalleryImg src={images[active]} className="rounded-xl w-full h-full" />
        <div className="flex flex-col gap-6">
          {images.slice(0, 3).map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-1 rounded-xl cursor-pointer transition-all ${
                active === i ? "ring-2 ring-[#ebe2c3]" : "opacity-70 hover:opacity-90"
              }`}
            >
              <GalleryImg src={src} className="rounded-xl w-full h-full" />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: свайпер с точками */}
      <div className="lg:hidden">
        <div
          className="relative rounded-xl h-55"
          onTouchStart={e => setTouchX(e.touches[0].clientX)}
          onTouchEnd={e => {
            const diff = touchX - e.changedTouches[0].clientX;
            if (diff > 40) next();
            else if (diff < -40) prev();
          }}
        >
          <GalleryImg src={images[active]} className="rounded-xl w-full h-full" />
        </div>
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === active ? "bg-[#ebe2c3]" : "bg-[#172535]"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
