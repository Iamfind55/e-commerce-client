import { useTranslations } from "use-intl";
import { useRouter } from "next/navigation";

// components
import { CheckCircleIcon } from "@/icons/page";
import IconButton from "@/components/iconButton";

export default function Confirmation() {
  const t = useTranslations("myCartPage");
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-2">
        <div className="container w-full flex flex-col items-center justify-center gap-4 py-6">
          <div className="p-2 rounded-full bg-green-300 border border-gray-200">
            <CheckCircleIcon size={32} className="text-white" />
          </div>
          <p className="text-xl">{t("_confirmation_title")}&nbsp;🎉🎉🎉</p>
          <p className="text-sm font-small text-center text-gray-500">
            We appreciate your trust in us. Enjoy your new items!
          </p>
          <p className="text-sm font-small text-center text-gray-500">
            Click the button below to explore more products
          </p>
          <div className="flex items-center justify-center gap-4">
            <IconButton
              onClick={() => router.push("/")}
              className="rounded bg-neon_pink text-white p-2 w-auto mt-4 text-xs"
              type="button"
              title={t("_continue_shopping_button")}
            />
            <IconButton
              onClick={() => router.push("/")}
              className="rounded bg-neon_blue text-white p-2 w-auto mt-4 text-xs"
              type="button"
              title="View details"
            />
          </div>
        </div>
      </div>
    </>
  );
}
