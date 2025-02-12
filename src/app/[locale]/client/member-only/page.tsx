import Accordion from "@/components/accordion";
import Breadcrumb from "@/components/breadCrumb";
import { useTranslations } from "next-intl";

export default function MemberOnly() {
  const t = useTranslations("member_page");
  const items = [
    {
      title: t("_title1"),
      content: t("_content1"),
    },
    {
      title: t("_title2"),
      content: t("_content2"),
    },
    {
      title: t("_title3"),
      content: t("_content3"),
    },
    {
      title: t("_title4"),
      content: t("_content4"),
    },
    {
      title: t("_title5"),
      content: t("_content5"),
    },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("_dashboard"), value: "/client" },
          { label: t("_member_only"), value: "/member-only" },
        ]}
      />
      <div className="bg-white w-full h-auto rounded-sm flex items-start justify-start flex-col mt-4 text-gray-500">
        <div className="w-full flex items-start justify-start flex-col gap-6 my-6 px-6">
          <div className="w-full">
            <div className="w-full flex items-center justify-center">
              <h1 className="text-xl text-gray-800">{t("_vip_level")}</h1>
            </div>
            <br />
            <div className="bg-gray-100 p-4 w-full rounded flex items-start justify-start flex-col gap-4">
              <p className="text-gray-500 text-sm">{t("_vip_level1")}</p>
              <p className="text-gray-500 text-sm">{t("_vip_level2")}</p>
              <p className="text-gray-500 text-sm">{t("_vip_level3")}</p>
              <p className="text-gray-500 text-sm">{t("_vip_level4")}</p>
              <p className="text-gray-500 text-sm">{t("_vip_level5")}</p>
            </div>
          </div>

          <div className="w-full rounded-md p-4 shadow-md border-t border-gray-100 mt-6">
            <h1 className="w-full flex items-center justify-center text-xl text-gray-800">
              {t("_faq_title")}
            </h1>
            <br />
            <div className="w-full">
              <Accordion items={items} />
            </div>
          </div>
        </div>
        <div className="p-4 rounded-tr-lg rounded-tl-lg bg-gray-800 text-sm text-white mt-6">
          <p>{t("_long_description")}</p>
        </div>
      </div>
    </>
  );
}
