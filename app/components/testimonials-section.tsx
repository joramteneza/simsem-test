"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  image: string;
  text: string[];
};

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Wilfredo Vallente",
      image: "/images/testimonial-2.png",
      text: ["The best is yet to come for sure"],
    },
    {
      id: 2,
      name: "Emily, W.",
      image: "/images/testimonial-2.png",
      text: [
        `Simsem has completely transformed my travel experience. I've always wanted to explore the Jordan beyond the
      touristy spots, and Simsem made it possible. The curated experiences by locals are a game-changer...`,
        `Plus, the $30 credit for new users was such a pleasant surprise...`,
      ],
    },
    {
      id: 3,
      name: "Sarah J.",
      image: "/images/testimonial-2.png",
      text: [
        "As a solo female traveler, safety is my top priority. Startsem's verified local guides gave me confidence.",
      ],
    },
    {
      id: 4,
      name: "Sarah J.",
      image: "/images/testimonial-2.png",
      text: [
        "As a solo female traveler, safety is my top priority. Startsem's verified local guides gave me confidence.",
      ],
    },
    {
      id: 5,
      name: "Sarah J.",
      image: "/images/testimonial-2.png",
      text: [
        "As a solo female traveler, safety is my top priority. Startsem's verified local guides gave me confidence.",
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const [containerWidth, setContainerWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const marginBetween = 60;

  useEffect(() => {
    if (carouselRef.current) {
      setContainerWidth(carouselRef.current.clientWidth - 120);
    }
  }, []);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    if ("touches" in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
    setDragOffset(0);
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;
    let clientX = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    setDragOffset(clientX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    const threshold = containerWidth / 4;

    if (dragOffset > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (
      dragOffset < -threshold &&
      currentIndex < testimonials.length - 1
    ) {
      setCurrentIndex((prev) => prev + 1);
    }
    setDragOffset(0);
    setIsDragging(false);
  };

  const slideWidth = containerWidth;

  const trackWidth =
    testimonials.length * slideWidth +
    (testimonials.length - 1) * marginBetween;

  return (
    <section className="relative pt-16 pb-32">
      <div className="absolute top-0 left-0 right-0 h-2/3 bg-cover bg-center -z-40">
        <div className="absolute inset-0 bg-rose-600/98"></div>
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-medium text-center tracking-tighter text-teal-800 my-16">
          What Travelers Say About Us
        </h2>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="overflow-hidden relative cursor-grab select-none"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Slide Track */}
          <div
            className={`grid grid-cols-5 w-full items-center justify-center ${
              !isDragging ? "transition-transform duration-300 ease-out" : ""
            }`}
            style={{
              width: `${trackWidth}px`,
              transform: `translateX(calc(-${
                currentIndex * (slideWidth + marginBetween)
              }px + ${dragOffset}px))`,
            }}
          >
            {testimonials.map((testimonial, idx) => {
              // Conditional margins: first slide has no left margin, last slide has no right margin
              return (
                <div
                  key={testimonial.id}
                  className={`md:p-10 h-full ${
                    idx !== currentIndex ? "blur-xs" : ""
                  }`}
                >
                  <div className="bg-white h-full justify-center rounded-4xl shadow-lg shadow-accent flex flex-col items-center text-center py-12 px-8">
                    <div className="flex flex-col gap-5 mb-8 text-sm font-barlow md:px-56">
                      {testimonial.text.map((text, tIdx) => (
                        <span key={tIdx}>{text}</span>
                      ))}
                    </div>

                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={70}
                      height={70}
                      className="rounded-full mb-4"
                    />

                    <h3 className="text-teal-800 font-semibold text-lg mb-2 px-20">
                      {testimonial.name}
                    </h3>

                    <div className="flex text-orange-500">
                      {[...Array(5)].map((_, starIdx) => (
                        <svg
                          key={starIdx}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 
                              5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 
                              1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 
                              18.354l-4.627 2.826c-.996.608-2.231-.29-1.96-1.425l
                              1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l
                              5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-blue-900" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
