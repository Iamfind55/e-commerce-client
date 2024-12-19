import "./globals.css";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ReduxProvider } from "@/redux/provider";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "tiktokshop.net",
  description: "Tiktok shop is the largest and biggest e-commerce platform",
  keywords: ["tiktokshop", "shopping.tiktok", "online shopping"],
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale?: string | undefined }>;
}

// Dynamically import ApolloClientWrapper (client-side only)
const DynamicApolloClientWrapper = dynamic(
  () => import("../../components/ApolloClientWrapper"),
  { ssr: true }
);

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const locale = (await params).locale;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DynamicApolloClientWrapper>
        <html lang={locale}>
          <body className="bg-dark font-sans">
            <div className="justify-center text-white h-screen">
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
      </DynamicApolloClientWrapper>
    </NextIntlClientProvider>
  );
}
