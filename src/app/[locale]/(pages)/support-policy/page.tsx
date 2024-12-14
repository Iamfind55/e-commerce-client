import Breadcrumb from "@/components/breadCrumb";
import { useTranslations } from "next-intl";

export default function RefundPolicy() {
  const t = useTranslations("support_policy");
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-bg_color py-6">
        <div className="container flex items-start justify-start p-2">
          <Breadcrumb
            items={[
              { label: "Home", value: "/" },
              { label: "support-policy", value: "/support-policy" },
            ]}
          />
        </div>
        <div className="container bg-white py-6 px-4 rounded text-gray-500 gap-4">
          <div className="flex items-start justify-start flex-col gap-2">
            <p className="text-sm">{t("_support_policy_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_disclaimer_01")}</li>
              <li>{t("_disclaimer_02")}</li>
              <li>{t("_website_policies")}</li>
              <li>{t("_website_policy_01")}</li>
              <li>{t("_website_policy_02")}</li>
              <li>{t("_website_info")}</li>
              <li>{t("_email_info")}</li>
              <li>{t("_software_terms_title")}</li>
              <li>{t("_software_terms_01")}.</li>
              <li>{t("_software_terms_02")}</li>
              <li>{t("_software_terms_03")}</li>
              <li>{t("_software_terms_04")}</li>
              <li>{t("_software_terms_05")}</li>
              <li>{t("_software_terms_06")}</li>
              <li className="font-medium">{t("_legal_process_title")}:</li>
              <li>{t("_legal_process_01")}</li>
              <li>{t("_legal_process_email")}</li>
              <li>{t("_legal_process_info")}</li>
              <li>
                {t("_ip_infringement_title")}
                <br />
                {t("_ip_infringement_01")}
              </li>
              <li>{t("_ip_infringement_02")}</li>
              <li>{t("_ip_infringement_03")}</li>
              <li>
                {t("_ip_infringement_04")}
                <br />
                {t("_ip_infringement_info_01")}
                <br />
                {t("_ip_infringement_info_02")}
                <br />
                {t("_ip_infringement_info_03")}
                <br />
                {t("_ip_infringement_info_04")}
                <br />
                {t("_ip_infringement_info_05")}
                <br />
                {t("_ip_infringement_info_06")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
