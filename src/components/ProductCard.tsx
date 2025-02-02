import React from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

// components
import { CartIcon } from "@/icons/page";
import RatingStar from "./ratingStar";

// icons and untils
import { ProductData } from "@/types/product";
import { truncateText } from "@/utils/letterLimitation";

// images
import { useRouter } from "@/navigation";
import { stripHtml } from "@/utils/stripHtml";
import { addToCart } from "@/redux/slice/cartSlice";
import { useTranslations } from "next-intl";

export default function ProductCard(props: ProductData) {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = Cookies.get("auth_token");
  const s = useTranslations("shop_page");
  const p = useTranslations("product_detail");

  const handleAddToCart = () => {
    if (!token) {
      router.push("/cus-signin");
    } else {
      dispatch(
        addToCart({
          id: props?.id,
          name: props?.name.name_en,
          price: props.price,
          quantity: 1,
          cover_image: props.cover_image,
          in_stock: props?.quantity ?? 0,
        })
      );
    }
  };
  return (
    <div className="cursor-pointer flex items-start justify-start flex-col select-none gap-2 w-auto rounded border hover:shadow-lg transition-all duration-300">
      <div className="max-w-sm bg-white rounded">
        <Image
          className="rounded"
          src={props.cover_image || "/images/default-image.webp"}
          alt={props.name?.name_en || ""}
          width={500}
          height={300}
          quality={100}
        />
        <div className="p-3 flex items-start justify-start flex-col gap-2">
          <div className="w-full flex items-center justify-start flex-col gap-2">
            <i className="text-xs sm:text-md text-second_black font-normal tracking-tight">
              {truncateText(props.name?.name_en || "", 20)}
            </i>
            <RatingStar rating={props.total_star || 0} />
          </div>
          <strong className="text-second_black">$&nbsp;{props.price}</strong>
          <p className="text-second_black font-normal text-xs text-b_text">
            {truncateText(stripHtml(props?.description?.name_en ?? ""), 60)}
          </p>
          <div className="w-full flex flex-col sm:flex-row md:flex-row items-center justify-around gap-2">
            <Link
              href={`/product/${props.id}`}
              className="w-full sm:w-auto bg-neon_pink text-white flex items-center justify-center px-3 py-1 text-xs text-center rounded focus:outline-none"
            >
              {s("_view")}
            </Link>
            <button
              onClick={() => handleAddToCart()}
              className="w-full sm:w-auto text-second_black border border-neon_blue rounded flex items-center justify-center px-3 py-1 mt-0 text-xs text-center text-base rounded focus:outline-none"
            >
              {p("_add_to_cart")}
              <CartIcon
                size={16}
                className="text-second_black animate-bounce"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
