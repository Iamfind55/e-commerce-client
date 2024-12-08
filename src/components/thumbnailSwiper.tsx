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

export default function ThumbnailSwiper() {
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
        {[...Array(10)].map((_, index) => (
          <SwiperSlide key={index}>
            <img
              src={`https://swiperjs.com/demos/images/nature-${index + 1}.jpg`}
              alt={`Nature ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {[...Array(10)].map((_, index) => (
          <SwiperSlide key={index}>
            <img
              src={`https://swiperjs.com/demos/images/nature-${index + 1}.jpg`}
              alt={`Thumbnail ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
