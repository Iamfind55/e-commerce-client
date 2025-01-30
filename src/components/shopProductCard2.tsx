import React from "react";
import Image from "next/image";
import Cookies from "js-cookie";

// components
import { CheckCircleIcon } from "@/icons/page";
import { CartIcon } from "@/icons/page";

// icons and utilities, type and hooks
import { stripHtml } from "@/utils/stripHtml";
import { ShopProductData } from "@/types/shop";
import { truncateText } from "@/utils/letterLimitation";

// redux
import { useRouter } from "@/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";

export default function ShopProductCard2(props: ShopProductData) {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = Cookies.get("auth_token");
  const handleAddToCart = () => {
    if (!token) {
      router.push("/cus-signin");
    } else {
      dispatch(
        addToCart({
          id: props?.productData.id,
          name: props?.productData.name.name_en,
          price: props.productData.price,
          quantity: 1,
          cover_image: props.productData.cover_image,
          in_stock: props?.quantity,
        })
      );
    }
  };

  return (
    <>
      <div className="cursor-pointer relative flex items-start justify-start flex-col select-none gap-2 w-auto rounded border hover:shadow-lg transition-all duration-300 group">
        <div className="absolute top-2 left-2 transform -translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition duration-300"
            onClick={() => handleAddToCart()}
          >
            <CartIcon size={20} className="text-neon_pink" />
          </button>
        </div>

        <div className="w-full bg-white rounded">
          <div className="w-full h-[150px] object-cover flex items-center justify-center">
            <Image
              className="rounded object-cover"
              src={
                !props.productData.cover_image
                  ? "/images/category01.webp"
                  : props?.productData.cover_image
              }
              alt=""
              width={120}
              height={120}
            />
          </div>
          <div className="p-3 flex items-start justify-start flex-col gap-1">
            <div className="w-full flex items-center justify-start gap-2">
              <i className="text-xs sm:text-md text-second_black font-normal sm:font-bold tracking-tight">
                {truncateText(`${props?.productData.name.name_en}`, 20)}
              </i>
            </div>
            <p className="text-gray-500 font-normal text-xs">
              {truncateText(
                stripHtml(props?.productData?.description?.name_en ?? ""),
                60
              )}
            </p>
            <p className="flex items-center justify-start text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp; In stock / {props?.quantity || 0}.
            </p>
            <p className="flex items-center justify-start text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp; Already on shelf.
            </p>
            <p className="flex items-center justify-start text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp; Active.
            </p>
            <div className="w-full flex flex-col sm:flex-row md:flex-row items-center justify-between gap-2 mt-2">
              <div>
                <p className="font-bold text-md">${props.productData.price}</p>
              </div>
              <button
                className="w-full sm:w-auto bg-neon_pink text-white flex items-center justify-center px-4 py-1 text-xs text-center rounded focus:outline-none"
                onClick={() => router.push(`/product/${props.productData.id}`)}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <ul className="text-gray-500 text-sm">
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul> */}
    </>
  );
}
