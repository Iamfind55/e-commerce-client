import Breadcrumb from "@/components/breadCrumb";
import { useTranslations } from "next-intl";

export default function RefundPolicy() {
  const t = useTranslations("refund_policy");
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-bg_color py-6">
        <div className="container flex items-start justify-start p-2">
          <Breadcrumb
            items={[
              { label: "Home", value: "/" },
              { label: "refund-policy", value: "/refund-policy" },
            ]}
          />
        </div>
        <div className="container bg-white py-6 px-4 rounded text-gray-500 gap-4">
          <div className="flex items-start justify-start flex-col gap-2">
            <p className="text-sm">{t("_return_refund_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_return_refund_01")}.</li>
              <li>{t("_return_refund_02")}.</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_refund_condition_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>
                {t("_refund_condition_description")}:
                <br />
                {t("_refund_condition_01")}
                <br />
                {t("_refund_condition_02")}
                <br />
                {t("_refund_condition_03")}
                <br />
                {t("_refund_condition_04")}
                <br />
                {t("_refund_condition_05")}
                <br />
                {t("_refund_condition_application")}
                <br />
                {t("_refund_condition_lawsuit")}
              </li>
              <li>{t("_item_conditions_title")}:</li>
              <li>{t("_item_conditions_01")}</li>
              <li>{t("_item_conditions_03")}</li>
              <li>{t("_item_conditions_04")}</li>
              <li>{t("_item_conditions_05")}</li>
              <li>{t("_item_conditions_06")}.</li>
              <li>{t("_refund_process")}</li>
              <li>{t("_product_support_title")}</li>
              <li>{t("_product_support_description")}</li>
              <li>{t("_problem_item_title")}</li>
              <li>{t("_return_exchange_refund_01")}</li>
              <li>{t("_return_exchange_refund_02")}</li>
              <li>
                {t("_precautions_title")}
                <br />
                {t("_dvd_music_software_return_title")}
              </li>
              <li>
                {t("_dvd_music_software_return_01")}
                <br />
                {t("_dvd_music_software_return_02")}
                <br />
                {t("_dvd_music_software_return_03")}
              </li>
              <li>
                {t("_consumer_rights_01")}
                <br />
                {t("_consumer_rights_02")}
              </li>
              <li>
                {t("_faq_title")}
                <br />
                {t("_refund_duration_question")}
              </li>
              <li>{t("_refund_duration_01")}</li>
              <li>{t("_refund_duration_02")}</li>
              <li>{t("_return_conditions_reminder")}</li>
              <li>{t("_proof_of_purchase_title")}</li>
              <li>{t("_proof_of_purchase_01")}</li>
              <li>{t("_proof_of_purchase_02")}</li>
              <li>{t("_proof_of_purchase_03")}</li>
              <li>{t("_proof_of_purchase_04")}</li>
              <li>{t("_proof_of_purchase_05")}</li>
              <li>{t("_proof_of_purchase_06")}</li>
              <li>{t("_proof_of_purchase_07")}</li>
              <li>{t("_proof_of_purchase_08")}</li>
              <li>{t("_return_without_problem_title")}</li>
              <li>{t("_return_without_problem_01")}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
