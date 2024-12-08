import { MinusIcon, PlusIcon, TrashIcon } from "@/icons/page";
import Image from "next/image";
import React from "react";

import category01 from "/public/images/category01.webp";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
  availableStock: number;
}

export default function MyCartDetails() {
  const [products, setProducts] = React.useState<Product[]>([
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
      total: 100,
      availableStock: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 150,
      quantity: 1,
      total: 150,
      availableStock: 200,
    },
    {
      id: 3,
      name: "Product 3",
      price: 200,
      quantity: 1,
      total: 200,
      availableStock: 50,
    },
  ]);

  const [subTotal, setSubTotal] = React.useState<number>(0);

  React.useEffect(() => {
    const total = products.reduce((sum, product) => sum + product.total, 0);
    setSubTotal(total);
  }, [products]);

  const handleIncreaseQuantity = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
              total: (product.quantity + 1) * product.price,
            }
          : product
      )
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? {
              ...product,
              quantity: product.quantity - 1,
              total: (product.quantity - 1) * product.price,
            }
          : product
      )
    );
  };

  const handleRemoveProduct = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <div className="relative overflow-y-auto overflow-x-auto h-auto">
      <div className="w-full hidden sm:block">
        <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
          <thead className="sticky top-0 bg-gray text-xs uppercase bg-white">
            <tr className="border-b border-gray text-left">
              <th scope="col" className="py-3 pl-1">
                ID
              </th>
              <th scope="col" className="py-3 pl-1">
                Product
              </th>
              <th scope="col" className="py-3 pl-1">
                Price
              </th>
              <th scope="col" className="py-3 pl-1">
                Quantity
              </th>
              <th scope="col" className="py-3 pl-1">
                Total
              </th>
              <th
                scope="col"
                className="py-3 pl-1 flex items-center justify-center"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray bg-white hover:bg-gray py-6"
              >
                <td className="pl-2 py-4">{product.id}</td>
                <td>
                  <div className="flex items-start justify-start gap-4">
                    <Image
                      className="rounded"
                      src={category01}
                      alt={product.name}
                      width={60}
                      height={60}
                    />
                    <div className="flex items-start justify-start flex-col">
                      <p className="text-sm">{product.name}</p>
                      <p className="text-xs text-gray-400">
                        Available ({product.availableStock} items)
                      </p>
                    </div>
                  </div>
                </td>
                <td>${product.price}</td>
                <td>
                  <div className="flex items-center justify-start gap-6 rounded py-2 px-4">
                    <button
                      className="rounded-full bg-gray-300 text-white cursor-pointer"
                      onClick={() => handleDecreaseQuantity(product.id)}
                    >
                      <MinusIcon size={16} />
                    </button>
                    <p>{product.quantity}</p>
                    <button
                      className="rounded-full bg-gray-300 text-white cursor-pointer"
                      onClick={() => handleIncreaseQuantity(product.id)}
                    >
                      <PlusIcon size={16} />
                    </button>
                  </div>
                </td>
                <td>${product.total}</td>
                <td className="pl-2 py-4 flex items-center justify-center">
                  <TrashIcon
                    size={18}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveProduct(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-b">
            <tr>
              <td colSpan={6}>
                <div className="flex items-start justify-end py-4 gap-4 pr-6">
                  <p>Subtotal:</p>
                  <p className="font-bold">${subTotal}</p>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="block sm:hidden">
        {products?.map((val, index: number) => (
          <div className="w-full flex items-start justify-start flex-col gap-2 border-b pb-2 my-2">
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
                <p className="text-xs text-gray-500">Price: </p>
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
                <p className="text-xs text-gray-500">Sub-total: </p>
                <p className="text-sm">&nbsp;&nbsp;${val?.total}</p>
              </div>
              <div className="flex items-center justify-start gap-6 rounded py-2 px-4">
                <button
                  className="text-neon_pink cursor-pointer"
                  onClick={() => handleRemoveProduct(val.id)}
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full flex items-start justify-between gap-4 pr-4">
          <p className="text-sm text-gray-500">Total:</p>
          <p className="text-md">${subTotal}</p>
        </div>
      </div>
    </div>
  );
}
