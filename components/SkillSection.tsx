"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { translations } from "@/lib/translations";

type SkillSectionProps = {
  locale: Locale;
};

export default function SkillSection({ locale }: SkillSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = translations[locale].home;
  const skills = t.skills;

  const scroll = (dir: "left" | "right") => {
    setActiveSlide(null);
    const nextSlide =
      dir === "left"
        ? (currentSlide - 1 + skills.length) % skills.length
        : (currentSlide + 1) % skills.length;

    setCurrentSlide(nextSlide);

    const nextCard = scrollRef.current?.children[nextSlide];
    nextCard?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-8 lg:px-14.5 -mt-[26px] lg:-mt-2">
      <h2 className="text-white font-bold text-[20px] lg:text-[24px] mb-6 lg:mb-8">
        {t.skillsTitle}
      </h2>
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={(event) => {
            if (window.innerWidth >= 640) return;

            const scrollLeft = event.currentTarget.scrollLeft;
            const viewportCenter =
              scrollLeft + event.currentTarget.clientWidth / 2;
            const cards = Array.from(event.currentTarget.children);
            const nearestIndex = cards.reduce((nearest, card, index) => {
              const element = card as HTMLElement;
              const cardCenter = element.offsetLeft + element.offsetWidth / 2;
              const nearestElement = cards[nearest] as HTMLElement;
              const nearestCenter =
                nearestElement.offsetLeft + nearestElement.offsetWidth / 2;

              return Math.abs(cardCenter - viewportCenter) <
                Math.abs(nearestCenter - viewportCenter)
                ? index
                : nearest;
            }, 0);

            setCurrentSlide(nearestIndex);
          }}
          className="-mx-8 px-8 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-3 gap-8 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pt-1 pb-4 sm:pt-0 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {skills.map((skill) => {
            const isActive = activeSlide === skill.label;
            return (
              <button
                type="button"
                key={skill.label}
                onClick={() => {
                  if (window.innerWidth < 640) {
                    setActiveSlide(isActive ? null : skill.label);
                  }
                }}
                className={`shrink-0 snap-center w-full sm:w-auto group relative rounded-xl h-38.5 lg:h-44.25
                          flex flex-col items-center justify-center gap-4 px-10 sm:px-4
                          transition-colors duration-300 overflow-hidden cursor-pointer lg:cursor-default
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ebe2c3]
                          ${isActive ? "bg-[#1d334b]" : "bg-[#172535] sm:hover:bg-[#1d334b]"}`}
              >
                <div className={`flex flex-col items-center gap-4 transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-100 sm:group-hover:opacity-0"}`}>
                  <Image
                    src={skill.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-12 lg:h-12"
                  />
                  <p className="text-white font-medium text-[18px] lg:text-[20px] text-center">
                    {skill.label}
                  </p>
                </div>
                <div className={`absolute inset-0 flex items-center justify-center px-12 sm:px-5 lg:px-6 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"}`}>
                  <p className="text-white text-[13px] lg:text-[15px] text-center leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scroll("left")}
          aria-label={t.previousSlide}
          className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a1521] flex items-center justify-center z-10 text-[#ebe2c3]"
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L2 10L10 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label={t.nextSlide}
          className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-[#0a1521] flex items-center justify-center z-10 text-[#ebe2c3]"
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L10 10L2 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
