import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";
import {
  CallIcon,
  EmailIcon,
  FacebookIcon,
  LinkedInIcon,
  LocationIcon,
  NotiIcon,
  TiktokIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/icons/page";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="bg-secondary">
        <div className="container mx-auto px-4 flex items-center justify-between flex-col gap-8 pt-6 pb-6">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 pt-2 pb-2 mb-2 sm:pt-4 sm:pb-4 sm:mt-4 sm:mb-4">
            <div className="mb-4 flex items-start justify-center gap-4 flex-col">
              <Image
                className="rounded-full"
                src="/images/okardcare-hori-logo-white.png"
                alt=""
                width={250}
                height={200}
              />
              <p className="text-sm text-white">
                Okardcare: Connecting You to Expert Doctors Anytime, Anywhere
                Quality Healthcare Made Simple.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="border border-border rounded-full p-2 hover:bg-base cursor-pointer text-gray-500 text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <FacebookIcon size={16} />
                </div>
                <div className="border border-border rounded-full p-2 hover:bg-base cursor-pointer text-gray-500 text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <WhatsappIcon size={16} />
                </div>
                <div className="border border-border rounded-full p-2 hover:bg-base cursor-pointer text-gray-500 text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <TiktokIcon size={16} />
                </div>
                <div className="border border-border rounded-full p-2 hover:bg-base cursor-pointer text-gray-500 text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <LinkedInIcon size={16} />
                </div>
                <div className="border border-border rounded-full p-2 hover:bg-base cursor-pointer text-gray-500 text-white transition duration-300 ease-in-out transform hover:scale-105">
                  <YoutubeIcon size={16} />
                </div>
              </div>
            </div>
            <div className="mb-4 pl-0 sm:pl-4 flex items-start justify-start flex-col gap-4">
              <h1 className="text-white text-sm font-bold">Service</h1>
              <Link href="" className="text-white text-xs hover:underline">
                Therapiya
              </Link>
              <Link href="" className="text-white text-xs hover:underline">
                Dentistry
              </Link>
              <Link href="" className="text-white text-xs hover:underline">
                Virusology
              </Link>
              <Link href="" className="text-white text-xs hover:underline">
                Pharmocology
              </Link>
              <Link href="" className="text-white text-xs hover:underline">
                Cardiology
              </Link>
            </div>
            <div className="mb-4 mb-4 pl-0 sm:pl-4 flex items-start justify-start flex-col gap-4">
              <h1 className="text-white text-sm font-bold">Subscribe</h1>
              <Textfield
                name="email"
                placeholder="Email address..."
                id="email"
                title="Email"
                // value={form.email}
                // onChange={handleForm}
                required
              />
              <div>
                <IconButton
                  className="text-xs rounded bg-base text-white p-2 bg-base"
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
      <div className="w-full text-white bg-base">
        <div className="container mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between p-4">
          <p className="text-white text-xs">
            © Okardcare <strong className="text-white text-bold">2024</strong> |
            All Rights Reserved
          </p>
          <div className="flex items-center justify-around gap-4">
            <p className="text-white cursor-pointer hover:text-bold text-xs">
              Privacy
            </p>
            <div className="border border-r-white h-4"></div>
            <p className="text-white cursor-pointer hover:text-bold text-xs">
              Terms
            </p>
            <div className="border border-r-white h-4"></div>
            <p className="text-white cursor-pointer hover:text-bold text-xs">
              Sitemap
            </p>
            <div className="border border-r-white h-4"></div>
            <p className="text-white cursor-pointer hover:text-bold text-xs">
              Help
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
