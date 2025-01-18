import React from "react";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

// components
import { MinusIcon, PlusIcon, TrashIcon } from "@/icons/page";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/redux/slice/cartSlice";

// images
import category01 from "/public/images/category01.webp";


export default function MyCartDetails() {
  const t = useTranslations("myCartPage");
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = React.useState<number>(0);


  const cartItems = useSelector((state: RootState) => state.cart.items);
  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  React.useEffect(() => {
    const total = cartItems.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    setSubTotal(total);
  }, [cartItems]);

  console.log("Cart data:", cartItems);

  return (
    <div className="relative overflow-y-auto overflow-x-auto h-auto">
      <div className="w-full hidden sm:block">
        <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
          <thead className="sticky top-0 bg-gray text-xs uppercase bg-white">
            <tr className="border-b border-gray text-left">
              <th scope="col" className="py-3 pl-1">
                {t("_id")}
              </th>
              <th scope="col" className="py-3 pl-1">
                {t("_product")}
              </th>
              <th scope="col" className="py-3 pl-1">
                {t("_price")}
              </th>
              <th scope="col" className="py-3 pl-1">
                {t("_quantity")}
              </th>
              <th scope="col" className="py-3 pl-1">
                {t("_sub_total")}
              </th>
              <th
                scope="col"
                className="py-3 pl-1 flex items-center justify-center"
              >
                {t("_actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-gray bg-white hover:bg-gray py-6 text-gray-500"
              >
                <td className="pl-2 py-4">{index + 1}</td>
                <td>
                  <div className="flex items-start justify-start gap-4">
                    <Image
                      className="rounded"
                      src={product?.cover_image ? product?.cover_image : category01}
                      alt={product.name}
                      width={60}
                      height={60}
                    />
                    <div className="flex items-start justify-start flex-col">
                      <p className="text-xs">{product.name}</p>
                      <p className="text-xs">({product.in_stock} Available in stock)</p>
                    </div>
                  </div>
                </td>
                <td className="text-xs">${product.price}</td>
                <td>
                  <div className="flex items-center justify-start gap-6 rounded py-2 px-4">
                    <button
                      className="rounded-full bg-gray-300 text-white cursor-pointer p-0.5"
                      onClick={() => handleDecreaseQuantity(product.id)}
                    >
                      <MinusIcon size={14} />
                    </button>
                    <p className="text-xs">{product.quantity}</p>
                    <button
                      className="rounded-full bg-gray-300 text-white cursor-pointer p-0.5"
                      onClick={() => handleIncreaseQuantity(product.id)}
                    >
                      <PlusIcon size={14} />
                    </button>
                  </div>
                </td>
                <td className="text-xs">${(product.quantity * product?.price).toFixed(2)}</td>
                <td className="pl-2 py-4 flex items-center justify-center">
                  <TrashIcon
                    size={18}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveFromCart(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-b">
            <tr>
              <td colSpan={6}>
                <div className="flex items-start justify-end py-4 gap-4 pr-6">
                  <p>{t("_total")}:</p>
                  <p className="font-bold">${subTotal}</p>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="block sm:hidden">
        {cartItems?.map((val, index: number) => (
          <div
            key={index + 1}
            className="w-full flex items-start justify-start flex-col gap-2 border-b pb-2 my-2"
          >
            <div className="w-full flex items-start justify-start gap-4">
              <Image
                className="rounded"
                src={category01}
                alt="image-01"
                width={60}
                height={60}
              />
              <p>{val?.name}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-start justify-start">
                <p className="text-xs text-gray-500">{t("_price")}: </p>
                <p className="text-sm">&nbsp;&nbsp;${val?.price}</p>
              </div>
              <div className="flex items-center justify-start gap-6 rounded py-2 px-4">
                <button
                  className="rounded-full bg-gray-300 text-white cursor-pointer"
                  onClick={() => handleDecreaseQuantity(val.id)}
                >
                  <MinusIcon size={16} />
                </button>
                <p>{val.quantity}</p>
                <button
                  className="rounded-full bg-gray-300 text-white cursor-pointer"
                  onClick={() => handleIncreaseQuantity(val.id)}
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-start justify-start">
                <p className="text-xs text-gray-500">{t("_sub_total")}: </p>
                <p className="text-sm">&nbsp;&nbsp;${(val?.price * val?.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-start gap-6 rounded py-2 px-4">
                <button
                  className="text-neon_pink cursor-pointer"
                  onClick={() => removeFromCart(val.id)}
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full flex items-start justify-between gap-4 pr-4">
          <p className="text-sm text-gray-500">{t("_sub_total")}:</p>
          <p className="text-md">${subTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
