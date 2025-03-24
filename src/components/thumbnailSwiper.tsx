import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./style.css";

// Import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";

// Define the props interface
interface ThumbnailSwiperProps {
  images: string[];
}

export default function ThumbnailSwiper({ images }: ThumbnailSwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);

  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              // src={"https://227_cdn.pionexprocoin.cc" + image}
              src={image}
              alt={`Product Image ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              // src={"https://227_cdn.pionexprocoin.cc" + image}
              src={image}
              alt={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
