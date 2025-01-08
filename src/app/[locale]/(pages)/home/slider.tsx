import React from "react";
import Image from "next/image";

// swiper
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "./style.css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

type SlideText = {
  title: string;
  description: string;
};

type GlobalSliderProps = {
  images: Banner[];
  height?: string;
  slidePerview?: number;
  hasText?: boolean;
  pagination?: boolean;
  text?: SlideText[];
};

const GlobalSlider: React.FC<GlobalSliderProps> = ({
  images,
  slidePerview = 1,
  hasText = false,
  pagination = false,
  text = [],
  height,
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={slidePerview}
      pagination={{ clickable: pagination }}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {images &&
        images.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className="flex items-start justify-start gap-4 flex-col py-6">
              <div className={`w-full ${height} text-black relative`}>
                <Image
                  className="w-full h-full object-cover rounded"
                  src={image.image || ""}
                  alt={image.name || "Banner"}
                  width={200}
                  height={250}
                />
              </div>
              {hasText && text[index] && (
                <div className="p-4 flex items-center justify-center flex-col gap-2 py-4">
                  <h1 className="text-lg font-bold text-black">
                    {text[index]?.title}
                  </h1>
                  <p className="text-sm text-gray-600 text-center">
                    {text[index]?.description}
                  </p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default GlobalSlider;
