import Breadcrumb from "@/components/breadCrumb";
import { useTranslations } from "next-intl";

export default function TermsAndConditions() {
  const t = useTranslations("privacy_policy");
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-bg_color py-6">
        <div className="container flex items-start justify-start p-2">
          <Breadcrumb
            items={[
              { label: "Home", value: "/" },
              { label: "privacy-policy", value: "/privacy-policy" },
            ]}
          />
        </div>
        <div className="container bg-white py-2 px-4 rounded text-gray-500 gap-4">
          <div className="flex items-start justify-start flex-col gap-2">
            <p className="text-sm">{t("_introduction_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_introduction_01")}</li>
              <li>{t("_introduction_02")}</li>
              <li>{t("_introduction_03")}</li>
              <li>{t("_introduction_04")}</li>
              <li>{t("_introduction_05")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_data_collection_title")}</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_data_collection_01")}</li>
              <li>{t("_data_collection_02")}</li>
              <li>{t("_data_collection_03")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_personal_data_collection_title")}</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_personal_data_collection_01")}</li>
              <li>{t("_personal_data_collection_02")}</li>
              <li>{t("_personal_data_collection_03")}</li>
              <li>{t("_personal_data_collection_04")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_collection_of_other_info_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_collection_of_other_info_01")}</li>
              <li>{t("_collection_of_other_info_02")}</li>
              <li>{t("_collection_of_other_info_03")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_cookies_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_cookies_01")}</li>
              <li>{t("_cookies_02")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_use_of_information_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_use_of_information_01")}</li>
              <li>{t("_use_of_information_02")}</li>
              <li>{t("_use_of_information_03")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">
              {t("_data_retention_and_security_title")}:
            </p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_data_retention_and_security_01")}</li>
              <li>{t("_data_retention_and_security_02")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">
              {t("_disclosure_to_external_parties_title")}
            </p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>
                {t("_disclosure_to_external_parties_01")}
                <br />
                {t("_disclosure_to_external_parties_01a")}
                <br />
                {t("_disclosure_to_external_parties_01b")}
                <br />
                {t("_disclosure_to_external_parties_01c")}
                <br />
                {t("_disclosure_to_external_parties_01d")}
                <br />
                {t("_disclosure_to_external_parties_01e")}
              </li>
              <li>{t("_disclosure_to_external_parties_02")}</li>
              <li>{t("_disclosure_to_external_parties_03")}</li>
              <li>{t("_disclosure_to_external_parties_04")}</li>
              <li>{t("_disclosure_to_external_parties_05")}</li>
              <li>{t("_disclosure_to_external_parties_06")}</li>
              <li>{t("_disclosure_to_external_parties_07")}</li>
              <li>{t("_disclosure_to_external_parties_08")}</li>
              <li>{t("_disclosure_to_external_parties_09")}</li>
              <li>{t("_disclosure_to_external_parties_09a")}</li>
              <li>{t("_disclosure_to_external_parties_09b")}</li>
              <li>{t("_disclosure_to_external_parties_09c")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_policy_on_children_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_policy_on_children_description")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_third_party_information_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_third_party_information_01")}</li>
              <li>{t("_third_party_information_02")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_disclaimer_security_title")}:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_disclaimer_security_01")}</li>
              <li>{t("_disclaimer_security_02")}</li>
              <li>{t("_disclaimer_security_03")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_overseas_transfer_title")}</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_overseas_transfer_description")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">{t("_withdrawal_of_consent_title")}</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_withdrawal_of_consent_01")}</li>
              <li>{t("_withdrawal_of_consent_02")}</li>
              <li>{t("_requests_access_or_correct_title")}</li>
              <li>{t("_requests_access_or_correct_01")}</li>
              <li>{t("_requests_access_or_correct_02")}</li>
              <li>{t("_requests_access_or_correct_03")}</li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">
              {t("_other_questions_concerns_or_complaints_title")}:
            </p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>{t("_other_questions_concerns_or_complaints_01")}</li>
              <li>{t("_other_questions_concerns_or_complaints_02")}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
