import React from "react";

// swiper
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image, { StaticImageData } from "next/image";
import "swiper/css";
import "./style.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type SliderImage = {
  src: StaticImageData | string;
  alt: string;
};

type SlideText = {
  title: string;
  description: string;
};

type GlobalSliderProps = {
  images: SliderImage[];
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
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-start justify-start gap-4 flex-col py-6 ">
            {/* <div className={`w-full h-36 sm:${height} text-black relative`}> */}
            <div className={`w-full ${height} text-black relative`}>
              <Image
                className="w-full h-full object-cover rounded"
                src={image.src}
                alt={image.alt}
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
