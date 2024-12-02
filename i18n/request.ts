import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "la"];

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  if (!locale || !locales.includes(locale)) {
    notFound();
  }
  return {
    messages: (await import(`../src/messages/${locale}.json`)).default,
  };
});
