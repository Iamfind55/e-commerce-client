import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "tiktokshop.net",
  description: "Tiktok shop is the largest and biggest e-commerce plate form",
  keywords: ["tiktokshop", "shopping.tiktok", "online shopping"],
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale?: string | undefined }>;
}
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const locale = (await params).locale;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale}>
        <body className="bg-dark font-sans">
          <div className="text-white h-screen">
            <ReduxProvider>{children}</ReduxProvider>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
