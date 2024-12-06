import React from "react";
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
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./style.css";

type SliderImage = {
  src: StaticImageData | string;
  alt: string;
};

type GlobalSliderProps = {
  images: SliderImage[];
  height?: number;
  slidePerview?: number;
};

const GlobalSlider: React.FC<GlobalSliderProps> = ({
  images,
  slidePerview,
  height = 96,
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={slidePerview}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className={`w-full h-36 sm:h-${height} text-black relative`}>
            <Image
              className="w-full h-full object-cover rounded"
              src={image.src}
              alt={image.alt}
              width={200}
              height={250}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GlobalSlider;
