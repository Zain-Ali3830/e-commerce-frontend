"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function Crousal() {
  return (
    <div className="w-full max-w-4xl mx-auto px-10 py-10 md:px-0">
      <Carousel
        plugins={[Autoplay({ delay: 2500 })]}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem className="flex justify-center items-center">
            <div className="w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/tv.jpg"
                alt="TV"
                className="w-full h-full object-content"
              />
            </div>
          </CarouselItem>

          <CarouselItem className="flex justify-center items-center">
            <div className="w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/fridge.jpg"
                alt="Fridge"
                className="w-full h-full object-content"
              />
            </div>
          </CarouselItem>

          <CarouselItem className="flex justify-center items-center">
            <div className="w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/fan.jpg"
                alt="Fan"
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
