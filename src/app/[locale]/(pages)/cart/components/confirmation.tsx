import IconButton from "@/components/iconButton";
import { CheckCircleIcon } from "@/icons/page";
import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";

export default function Confirmation() {
  const t = useTranslations("myCartPage");
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-2">
        <div className="container w-full flex flex-col items-center justify-center gap-6 py-6">
          <div className="p-6 rounded-full bg-green-300 border border-gray-200">
            <CheckCircleIcon size={56} className="text-green-500" />
          </div>
          <p className="text-xl">{t("_confirmation_title")}</p>
          <p className="text-sm font-small text-center">
            {t("_confirmation_description")}
          </p>
          <IconButton
            onClick={() => router.push("/")}
            className="rounded bg-neon_pink text-white p-2 w-auto mt-4 text-xs"
            type="button"
            title={t("_continue_shopping_button")}
          />
        </div>
      </div>
    </>
  );
}
