import React from "react";
import IconButton from "@/components/iconButton";
import Link from "next/link";
import { BackIcon } from "@/icons/page";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
  availableStock: number;
}
export default function PaymentDetails() {
  const [total, setTotal] = React.useState<number>(0);
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
  React.useEffect(() => {
    const total = products.reduce((sum, product) => sum + product.total, 0);
    setTotal(total);
  }, [products]);
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-2">
        <div className="container w-full flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="w-full sm:w-3/5">
            <h1 className="border-b py-2">Choose payment method</h1>
            <div className="flex items-center justify-center gap-1 flex-col h-52">
              <p>Your wallet balance: $0.00</p>
              <IconButton
                className="rounded text-white p-2 bg-neon_pink w-auto mt-4 text-xs"
                title="Pay with wallet"
                type="button"
              />
            </div>
            <div className="flex items-start justify-start text-xs gap-2 pl-4">
              I agree
              <Link href="#" className="text-neon_pink hover:underline">
                Terms & conditions,
              </Link>
              <Link href="#" className="text-neon_pink hover:underline">
                Refund policy,
              </Link>
              <Link href="#" className="text-neon_pink hover:underline">
                Privacy policy.
              </Link>
            </div>
            <IconButton
              className="rounded text-neon_pink p-2 w-auto mt-4 text-xs"
              icon={<BackIcon />}
              isFront={true}
              type="button"
              title="Return Back"
              //   onClick={() => handleBack()}
            />
          </div>
          <div className="w-full sm:w-2/5">
            <div className="w-full flex items-center justify-between border-b">
              <h1 className="py-2">Abstract:</h1>
              <p className="text-white bg-neon_blue py-1 px-3 rounded text-xs">
                3 Products
              </p>
            </div>
            <div className="w-full flex items-center justify-between px-2 border-b">
              <h1 className="py-2 text-sm text-gray-500">Products:</h1>
              <p className="py-1 px-3 rounded text-sm text-gray-500">price</p>
            </div>
            <div className="border-b">
              {products?.map((product, index: number) => (
                <div
                  key={index + 1}
                  className="flex items-start justify-between gap-2 p-4"
                >
                  <div className="text-gray-500 flex items-start justify-start flex-col">
                    <p className="text-sm">
                      {index + 1}.&nbsp;{product?.name}.
                    </p>
                    <p className="text-xs">
                      Price: ${product?.price}&nbsp;&nbsp;({product?.quantity}{" "}
                      available)
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">${product?.price}</p>
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-between px-2">
              <h1 className="py-2 text-sm">TOTAl:</h1>
              <p className="py-1 px-3 rounded text-sm">${total}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
