import Image from "next/image";
import category01 from "/public/images/category01.webp";
import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
  availableStock: number;
}
export default function DeliveryDetails() {
  const [products, setProducts] = React.useState<Product[]>([
    {
      id: 1,
      name: "This is the best women shoe in the world",
      price: 100,
      quantity: 1,
      total: 100,
      availableStock: 100,
    },
    {
      id: 2,
      name: "This is the best women shoe in the world",
      price: 150,
      quantity: 1,
      total: 150,
      availableStock: 200,
    },
    {
      id: 3,
      name: "This is the best women shoe in the world",
      price: 200,
      quantity: 1,
      total: 200,
      availableStock: 50,
    },
  ]);
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-2">
        <div className="container w-full border-b">
          <h1 className="border-b py-2">Product lists:</h1>
          {products?.map((product, index: number) => (
            <div
              key={index + 1}
              className="flex items-start justify-start gap-2 p-4"
            >
              <Image
                className="rounded"
                src={category01}
                alt={product?.name}
                width={60}
                height={60}
              />
              <div className="text-gray-500 flex items-start justify-start flex-col">
                <p className="text-sm">{product?.name}.</p>
                <p className="text-xs">
                  ${product?.price}&nbsp;&nbsp;({product?.quantity} available)
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-sm">Select delivery type:</p>
          <div className="flex items-center justify-center gap-2 p-2 rounded border border-neon_blue">
            <input type="radio" name="address" />
            <p className="text-xs">Door-to-door delivery</p>
          </div>
        </div>
      </div>
    </>
  );
}
