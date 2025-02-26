import Breadcrumb from "@/components/breadCrumb";
import { TelegramIcon } from "@/icons/page";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function ContactUs() {
  const t = useTranslations("contact_page");
  const h = useTranslations("homePage");
  return (
    <>
      <Breadcrumb
        items={[
          { label: t("_dashboard"), value: "/client" },
          { label: t("_contact_us"), value: "/contact-us" },
        ]}
      />
      <a
        href="https://t.me/Tiktokshop24h_online"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center flex-col gap-3 rounded py-6 text-gray-500 mt-6 cursor-pointer"
      >
        <h3 className="font-large text-black">{t("_contact_us")}</h3>
        <div className="rounded-md bg-white flex items-start justify-between p-6">
          <div className="bg-blue-500 p-3 rounded-full">
            <TelegramIcon size={28} className="text-white" />
          </div>
          <div className="flex flex-col items-center justify-center ml-2 gap-4">
            <p className="text-md text-black">Telegram</p>
            <p className="text-xs">{t("_description")}</p>
          </div>
        </div>
      </a>
      <div className="flex items-center justify-center flex-col gap-3 text-gray-500 cursor-pointer">
        <div className="w-auto sm:w-2/5 bg-white text-center p-4 rounded">
          <p className="text-sm text-gray-500">
            {h("_email")}:&nbsp;
            <Link
              href="mailto:info@tiktokshop.online"
              className="underline hover:text-neon_pink"
            >
              info@tiktokshop.online
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
