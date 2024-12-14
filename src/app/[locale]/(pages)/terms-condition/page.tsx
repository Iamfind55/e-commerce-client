import Breadcrumb from "@/components/breadCrumb";
import { useTranslations } from "next-intl";

export default function TermsAndConditions() {
  const t = useTranslations("terms_conditions");
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-bg_color py-6">
        <div className="container flex items-start justify-start p-2">
          <Breadcrumb
            items={[
              { label: "Home", value: "/" },
              { label: "terms-conditions", value: "/terms-condition" },
            ]}
          />
        </div>
        <div className="container bg-white py-2 px-4 rounded text-gray-500 gap-4">
          <div className="flex items-start justify-start flex-col gap-2">
            <p className="text-sm">{t("_terms_condition_intro_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_terms_condition_01")}</li>
              <li>{t("_terms_condition_02")}</li>
              <li>{t("_terms_condition_03")}</li>
              <li>{t("_terms_condition_04")}</li>
              <li>{t("_terms_condition_05")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_privacy_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_privacy_01")}</li>
              <li>{t("_privacy_02")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_liability_limitation")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_liability_limitation_01")}</li>
              <li>{t("_liability_limitation_02")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_software_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_software_description")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_account_security_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_account_security_01")}</li>
              <li>{t("_account_security_02")}</li>
              <li>{t("_account_security_03")}</li>
              <li>{t("_account_security_04")}</li>
              <li>{t("_account_security_05")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_terms_of_use_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_terms_of_use_01")}</li>
              <li>{t("_terms_of_use_02")}</li>
              <li>{t("_terms_of_use_03")}</li>
              <li>{t("_terms_of_use_04")}</li>
              <li>{t("_terms_of_use_05")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_violation_of_term_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_violation_of_term_01")}</li>
              <li>{t("_violation_of_term_02")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_declaration_for_review")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_declaration_for_review_01")}</li>
              <li>{t("_declaration_for_review_02")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_order_payment_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>
                {t("_order_payment_description")}:
                <br />
                {t("_method_01")}
                <br />
                {t("_method_02")}
                <br />
                {t("_method_03")}
              </li>
              <li>{t("_order_payment_change_policy")}</li>
              <li>{t("_order_payment_responsibility")}</li>
              <li>{t("_order_payment_method_of_payment")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_account_balance_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_account_balance_01")}</li>
              <li>{t("_account_balance_02")}</li>
              <li>{t("_account_balance_03")}</li>
              <li>{t("_account_balance_04")}</li>
              <li>{t("_account_balance_05")}</li>
              <li>{t("_account_balance_06")}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
