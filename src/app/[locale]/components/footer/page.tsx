import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";
import { NotiIcon } from "@/icons/page";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="bg-second_black">
        <div className="container mx-auto px-4 flex items-center justify-between flex-col gap-8 pt-6 pb-6">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 pt-2 pb-2 mb-2 sm:pt-4 sm:pb-4 sm:mt-4 sm:mb-4">
            <div className="mb-4 flex items-start justify-center gap-4 flex-col">
              <Link href="/">
                <Image
                  className="rounded-full"
                  src="/images/tiktokshop-logo.png"
                  alt=""
                  width={150}
                  height={100}
                />
              </Link>
              <p className="text-sm text-white">
                If you are a retailer, brand or business with products to sell,
                you can sell on TikTok without fans threshold.
              </p>
            </div>
            <div className="mb-4 pl-0 sm:pl-4 flex items-start justify-start flex-col gap-4">
              <h1 className="text-white text-sm font-bold">Details:</h1>
              <Link
                href="/terms-condition"
                className="text-white text-xs hover:underline"
              >
                Terms & conditions
              </Link>
              <Link
                href="/refund-policy"
                className="text-white text-xs hover:underline"
              >
                Refund policy
              </Link>
              <Link
                href="/support-policy"
                className="text-white text-xs hover:underline"
              >
                Support policy
              </Link>
              <Link
                href="/privacy-policy"
                className="text-white text-xs hover:underline"
              >
                Privacy and policy
              </Link>
            </div>
            <div className="mb-4 mb-4 pl-0 sm:pl-4 flex items-start justify-start flex-col gap-4">
              <h1 className="text-white text-sm font-bold">Subscribe</h1>
              <Textfield
                name="email"
                placeholder="Email address..."
                id="email"
                title="Email"
                required
              />
              <div>
                <IconButton
                  className="text-xs rounded bg-base text-white p-2 bg-neon_pink"
                  icon={<NotiIcon size={18} />}
                  title="Subscribe"
                />
              </div>
              <p className="text-white text-xs">
                Get The Latest Updates via email. Any time you may unsubscribe
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-white bg-black">
        <div className="container mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between p-4">
          <p className="text-white text-xs">
            © Tiktokshop <strong className="text-white text-bold">2015</strong>|
            All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}
