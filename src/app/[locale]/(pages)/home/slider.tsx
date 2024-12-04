import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import sliderImage01 from "/public/images/slider01.jpg";
import sliderImage02 from "/public/images/slider02.jpg";
import sliderImage03 from "/public/images/slider03.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./style.css";

export default () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{
        nextEl: ".swiper-button-next", // Custom Next button
        prevEl: ".swiper-button-prev", // Custom Prev button
      }}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 3000, // Delay between slides in ms
        disableOnInteraction: false, // Keeps autoplay even if user interacts with the slider
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <div className="w-full h-36 sm:h-96 text-black relative">
          <Image
            className="w-full h-full object-cover rounded"
            src={sliderImage01}
            alt="Slider Image"
            width={200}
            height={250}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-36 sm:h-96 text-black">
          <Image
            className="w-full h-full object-cover rounded"
            src={sliderImage02}
            alt=""
            width={200}
            height={250}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-36 sm:h-96 text-black">
          <Image
            className="w-full h-full object-cover rounded"
            src={sliderImage03}
            alt=""
            width={200}
            height={250}
          />
        </div>
      </SwiperSlide>

      {/* Custom Prev Button */}
      <div className="swiper-button-prev">Previous</div>

      {/* Custom Next Button */}
      <div className="swiper-button-next absolute right-5 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full z-10 hover:bg-blue-600 cursor-pointer">
        Next
      </div>
    </Swiper>
  );
};
