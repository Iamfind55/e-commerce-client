import React from "react";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";

// components
import MyModal from "./modal";
import IconButton from "./iconButton";

// icons and untils
import { ProductData, ShopProduct } from "@/types/product";

// api and images
import { QUERY_SHOP_SINGLE_PRODUCT } from "@/api/shop";
import category01 from "/public/images/category01.webp";

export default function OrderCardComponent(props: ShopProduct) {
  const defaultProductData: ProductData = {
    id: "",
    name: { name_en: "" },
    description: { name_en: "" },
    images: [],
    cover_image: "",
    price: 0,
    discount: null,
    quantity: null,
    sku: null,
    spu: null,
    total_star: null,
    total_comment: null,
    category_ids: null,
    brand_id: null,
    status: null,
    recommended: null,
    product_top: null,
    product_vip: null,
    created_at: null,
  };
  const [openDetailModel, setOpenDetailModel] = React.useState<boolean>(false);
  const [openDeliveryModel, setOpenDeliveryModel] =
    React.useState<boolean>(false);
  const [productId, setProductId] = React.useState<string>("");
  const [productData, setProductData] =
    React.useState<ProductData>(defaultProductData);

  const handleOpenDetailModal = () => {
    setOpenDetailModel(!openDetailModel);
  };
  const handleOpenDeliveryModal = () => {
    setOpenDeliveryModel(!openDeliveryModel);
  };

  const [getShopSingleProducts] = useLazyQuery(QUERY_SHOP_SINGLE_PRODUCT, {
    fetchPolicy: "no-cache",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getShopSingleProducts({
          variables: {
            getShopProductId: productId,
          },
        });
        if (res.data.getShopProduct.success) {
          console.log(res.data.getShopProduct.data.productData);
          setProductData(res.data.getShopProduct.data.productData);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <>
      <div className="cursor-pointer flex items-start justify-start flex-col select-none gap-2 w-auto rounded border hover:shadow-lg transition-all duration-300 p-2">
        <div className="flex items-start justify-start flex-col gap-2 w-full bg-white rounded text-gray-500">
          <p className="text-xs">Order Date: 2024-07-26</p>
          <div className="flex items-start justify-start gap-2">
            <Image
              className="rounded object-cover"
              src={
                !props.productData.cover_image
                  ? category01
                  : props?.productData.cover_image
              }
              alt=""
              width={80}
              height={80}
            />
            <p className="text-xs">
              Macy's Mariner Link 22" Chain Necklace in 14k Gold-Plated Sterling
              Silver
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">Payment status: </p>
            <div className="rounded py-0 px-2 bg-green-500">
              <p className="text-xs text-white font-extralight">Completed</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">Order status: </p>
            <div className="rounded py-0 px-2 bg-gray-500">
              <p className="text-xs text-white font-extralight">No Pickup</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">Sign in status: </p>
            <div className="rounded py-0 px-2 bg-gray-500">
              <p className="text-xs text-white font-extralight">
                Not delivered
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              Order Quantity: &nbsp;
              <span className="text-sm">2</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              Commodity payment: &nbsp;
              <span className="text-neon_pink font-medium">$1022.40</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              Order payment: &nbsp;
              <span className="text-neon_pink font-medium">$1278.00</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              Profit ratio: &nbsp;
              <span className="text-neon_pink font-medium">20.00 %</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              Expected revenue:
              <span className="text-green-500 font-medium">+ 255.60</span>
            </p>
          </div>
          <div className="w-full flex items-center justify-around border-t border-gray-200">
            <IconButton
              title="Show"
              type="button"
              onClick={() => handleOpenDetailModal()}
              className="rounded text-neon_blue w-auto mt-4 text-xs hover:font-medium hover:shadow-md"
            />
            <IconButton
              type="button"
              title="Immediate delivery"
              onClick={() => handleOpenDeliveryModal()}
              className="rounded text-neon_pink p-2 w-auto mt-4 text-xs hover:font-medium hover:shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Address */}
      <MyModal
        isOpen={openDetailModel}
        onClose={handleOpenDetailModal}
        className="w-11/12"
      >
        <div className="flex items-start justify-start flex-col gap-2 rounded bg-white w-full p-4">
          <h4 className="text-gray-500 text-md mb-3">
            SN: SN_TR172204647065510
          </h4>
          <p className="text-xs text-black">
            Date: &nbsp;
            <span className="text-gray-500">2024-07-26 22:14:30</span>
          </p>
          <p className="text-xs text-black">
            Order No: &nbsp;
            <span className="text-gray-500">SN_TR172204647065510</span>
          </p>
          <p className="text-xs text-black">
            Product name: &nbsp;
            <span className="text-gray-500">
              Macy's Mariner Link 22" Chain Necklace in 14k Gold-Plated Sterling
              Silver
            </span>
          </p>
          <p className="text-xs text-black">
            Price: &nbsp;<span className="text-gray-500">$639</span>
          </p>
          <p className="text-xs text-black">
            SKU: &nbsp;<span className="text-gray-500">gUa_Tr_Wc-MqH-3_</span>
          </p>
          <p className="text-xs text-black">
            SPU: &nbsp;<span className="text-gray-500">BbtyeIcknDrU</span>
          </p>
          <div className="flex items-start justify-start gap-2 text-xs text-black">
            <p className="text-black">Order Details:</p>
            <div className="flex items-start justify-start flex-col">
              <p className="text-xs text-gray-500">
                Order Quantity: <span className="text-gray-500">2</span>
              </p>
              <p className="text-xs text-gray-500">
                Subtotal: <span className="text-neon_pink">$1278.00</span>
              </p>
              <p className="text-xs text-gray-500">
                Profit ratio: <span className="text-neon_pink">20.00 %</span>
              </p>
              <p className="text-xs text-gray-500">
                Expected revenue:
                <span className="text-green-500">+ 255.60</span>
              </p>
            </div>
          </div>
          <div className="flex items-start justify-start gap-2 text-xs text-black">
            <p className="text-black">My inventory:</p>
            <div className="flex items-start justify-start flex-col">
              <p className="text-xs text-gray-500">
                Product inventory:
                <span className="text-gray-500">$26,399</span>
              </p>
              <p className="text-xs text-gray-500">
                My inventory: <span className="text-gray-500">0</span>
              </p>
              <p className="text-xs text-gray-500">
                Inventory under application:
                <span className="text-gray-500">0</span>
              </p>
            </div>
          </div>
          <div className="flex items-start justify-start gap-2 text-xs text-black">
            <p className="text-black">Product status:</p>
            <div className="flex items-start justify-start gap-2">
              <div className="bg-green-500 rounded px-2">
                <p className="text-white text-xs">On shelf</p>
              </div>
              <div className="bg-green-500 rounded px-2">
                <p className="text-white text-xs">Active</p>
              </div>
              <div className="bg-green-500 rounded px-2">
                <p className="text-white text-xs">In stock / 26,399</p>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-start gap-2 text-xs text-black">
            <p className="text-black">Payment status:</p>
            <div className="bg-green-500 rounded px-2">
              <p className="text-white text-xs">Payment completed</p>
            </div>
          </div>
          <div className="flex items-start justify-start gap-2 text-xs text-black">
            <p className="text-black">Delivery status</p>
            <div className="bg-gray-500 rounded px-2">
              <p className="text-white text-xs">not delivered</p>
            </div>
          </div>
          <div className="flex items-start justify-start gap-2 text-xs text-black">
            <p className="text-black">Order Status</p>
            <div className="bg-gray-500 rounded px-2">
              <p className="text-white text-xs">No pickup</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Logistics Doc No.</p>
          <div className="w-full flex items-end justify-end">
            <IconButton
              type="button"
              title="Close"
              className="rounded bg-neon_pink text-white w-auto text-xs hover:font-medium hover:shadow-md"
              onClick={() => handleOpenDetailModal()}
            />
          </div>
        </div>
      </MyModal>

      {/* Details modal */}
      <MyModal
        isOpen={openDeliveryModel}
        onClose={handleOpenDeliveryModal}
        className="w-11/12 sm:w-3/5"
      >
        <div className="flex items-start justify-start flex-col gap-4 rounded bg-white w-full p-4">
          <h4 className="text-gray-500 text-md mb-3">
            Please purchase the corresponding product and ship it
          </h4>
          <p className="text-sm text-black">
            Product quantity purchased: &nbsp;
            <span className="text-gray-500">1</span>
          </p>
          <p className="text-sm text-black">
            Wallet balance: &nbsp;
            <span className="text-gray-500">$99.37</span>
          </p>
          <p className="text-sm text-black">
            To be paid: &nbsp;
            <span className="text-gray-500">$1665.53</span>&nbsp;&nbsp;
            <span className="text-red-500">
              // Check whether the account balance is sufficient
            </span>
          </p>
          <div className="w-full flex items-center justify-end gap-4">
            <IconButton
              title="Close"
              type="button"
              onClick={() => handleOpenDeliveryModal()}
              className="rounded text-neon_pink border border-neon_pink w-auto text-xs hover:font-medium hover:shadow-md"
            />
            <IconButton
              type="button"
              title="Purchase & Shipping"
              //   onClick={() => handleOpenDeliveryModal()}
              className="rounded bg-neon_blue text-white p-2 w-auto text-xs hover:font-medium hover:shadow-md"
            />
          </div>
        </div>
      </MyModal>
    </>
  );
}
