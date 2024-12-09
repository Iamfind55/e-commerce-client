import { ShopIcon } from "@/icons/page";
import { truncateText } from "@/utils/letterLimitation";
import category01 from "/public/images/category01.webp";
import Image from "next/image";
import RatingStar from "./ratingStar";
import IconButton from "./iconButton";
import { Link } from "@/navigation";

export default function ShopCard() {
  return (
    <Link
      href="/shop/sdfgsdfgsdfgs"
      className="flex items-center justify-center cursor-pointer w-full md:w-fit bg-white rounded-lg p-2 md:p-4 hover:shadow gap-4"
    >
      <div className="flex flex-col items-center pt-2">
        <Image
          className="w-16 md:w-24 h-16 md:h-24 mb-3 rounded-full shadow-md"
          src={category01}
          alt="Bonnie image"
        />
        <h5 className="flex items-center justify-center mb-1 font-medium text-gray-900 text-sm md:text-md">
          Pk-shop
        </h5>
        <p className="text-xs md:text-sm text-gray-500">
          {truncateText("This is clothes shops", 20)}
        </p>
        <div className="mt-4 f-full flex flex-col items-center justify-center">
          <div className="flex items-center mb-2">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <RatingStar rating={4.5} />
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3 hidden md:block">
              5.0
            </span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <IconButton
              className="rounded text-white p-2 w-auto mt-4 text-xs bg-neon_pink"
              icon={<ShopIcon />}
              isFront={true}
              type="button"
              title="Visit shop"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-full lg:w-52 flex items-center justify-start border rounded gap-2">
          <Image
            src={category01}
            alt="image"
            className="w-14 md:w-18 h-16 md:h-16 rounded"
          />
          <div className="leading-loose">
            <p className="text-gray-500 text-xs">
              {truncateText("T-shirt asdgfsdfgsgs", 12)}
            </p>
            <strong className="text-sm text-gray-500">$35.5</strong>
          </div>
        </div>
        <div className="w-full lg:w-52 flex items-center justify-start border rounded gap-2">
          <Image
            src={category01}
            alt="image"
            className="w-14 md:w-18 h-16 md:h-16 rounded"
          />
          <div className="leading-loose">
            <p className="text-gray-500 text-xs">
              {truncateText("T-shirt asdgfsdfgsgs", 12)}
            </p>
            <strong className="text-sm text-gray-500">$35.5</strong>
          </div>
        </div>
        <div className="w-full lg:w-52 flex items-center justify-start border rounded gap-2">
          <Image
            src={category01}
            alt="image"
            className="w-14 md:w-18 h-16 md:h-16 rounded"
          />
          <div className="leading-loose">
            <p className="text-gray-500 text-xs">
              {truncateText("T-shirt asdgfsdfgsgs", 12)}
            </p>
            <strong className="text-sm text-gray-500">$35.5</strong>
          </div>
        </div>
      </div>
    </Link>
  );
}
