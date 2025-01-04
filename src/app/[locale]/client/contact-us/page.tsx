import Breadcrumb from "@/components/breadCrumb";
import { TelegramIcon } from "@/icons/page";

export default function ContactUs() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", value: "/client" },
          { label: "Contact us", value: "/contact-us" },
        ]}
      />
      <a
        href="https://t.me/Telegram"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center flex-col gap-3 rounded py-6 text-gray-500 mt-6 cursor-pointer"
      >
        <h3 className="font-large text-black">Contact Us</h3>
        <div className="rounded-md bg-white flex items-start justify-between p-6">
          <div className="bg-blue-500 p-3 rounded-full">
            <TelegramIcon size={28} className="text-white" />
          </div>
          <div className="flex flex-col items-center justify-center ml-2 gap-4">
            <p className="text-md text-black">Telegram</p>
            <p className="text-xs">
              Reach out to our customer service team for assistance with any
              issues.
            </p>
          </div>
        </div>
      </a>
    </>
  );
}
