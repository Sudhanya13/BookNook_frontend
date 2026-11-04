"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    id: "new-chapter",
    eyebrow: "New and noteworthy",
    title: "Your next chapter starts here",
    text: "Hundreds of titles, one cozy corner of the internet. Discover your next favourite read at BookNook.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "borrow-simply",
    eyebrow: "Borrow simply",
    title: "Borrow in seconds, return when you like",
    text: "Pick a book, keep it for a couple of weeks, and bring it back whenever you are done. No fines, no fuss.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "fresh-shelf",
    eyebrow: "Fresh on the shelf",
    title: "New arrivals every single week",
    text: "Our shelves never sit still. Check the newest picks before somebody else carries them away.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1920&q=80",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  // Automatically move to the next slide every 4 seconds (adjust time as needed)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % SLIDES.length;

        // Scroll the container to the next slide
        if (containerRef.current) {
          const slideWidth = containerRef.current.clientWidth;
          containerRef.current.scrollTo({
            left: slideWidth * nextSlide,
            behavior: "smooth",
          });
        }

        return nextSlide;
      });
    }, 4000); // 4000ms = 4 seconds per slide

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    if (containerRef.current) {
      const slideWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      aria-label="Featured banners"
      className="relative h-[440px] w-full overflow-hidden md:h-[540px]"
    >
      {/* Slides Container */}
      <div
        ref={containerRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className="relative h-full w-full shrink-0 snap-center"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-12">
              <div className="max-w-xl space-y-5 text-white">
                <span className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
                  {slide.eyebrow}
                </span>
                <h2 className="font-heading text-3xl leading-[1.1] font-bold md:text-5xl">
                  {slide.title}
                </h2>
                <p className="text-sm leading-relaxed text-white/85 md:text-lg">
                  {slide.text}
                </p>
                <Link
                  href="/all-books"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white text-neutral-900 shadow-xl hover:bg-white/90 transition-transform active:scale-95",
                  )}
                >
                  Browse Books
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              currentSlide === index
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
