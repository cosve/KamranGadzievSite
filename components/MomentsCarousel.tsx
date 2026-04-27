"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MomentsCarouselProps = {
  images: string[];
  slideLabel: string;
};

export default function MomentsCarousel({
  images,
  slideLabel,
}: MomentsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const autoplayDelay = 4000;

  const goToSlide = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  const handleSwipeEnd = (x: number) => {
    if (dragStartX === null) return;

    const delta = x - dragStartX;
    const swipeThreshold = 40;

    if (Math.abs(delta) >= swipeThreshold) {
      goToSlide(activeIndex + (delta < 0 ? 1 : -1));
    }

    setDragStartX(null);
  };

  useEffect(() => {
    if (images.length <= 1 || dragStartX !== null) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [dragStartX, images.length]);

  return (
    <div className="lg:hidden">
      <div
        className="relative aspect-[7/5] w-full rounded-xl overflow-hidden touch-pan-y"
        onPointerDown={(event) => setDragStartX(event.clientX)}
        onPointerUp={(event) => handleSwipeEnd(event.clientX)}
        onPointerCancel={() => setDragStartX(null)}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="100vw"
                draggable={false}
                className="object-cover select-none"
              />
              <div className="absolute inset-0 rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`${slideLabel} ${index + 1}`}
            className={`block w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? "bg-[#ebe2c3]" : "bg-[#172535]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
