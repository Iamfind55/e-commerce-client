import "./globals.css";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ReduxProvider } from "@/redux/provider";
import { NextIntlClientProvider } from "next-intl";
import DevToolsRedirect from "@/components/devtoolDetector";

export const metadata: Metadata = {
  title: "TiktokShop - The Ultimate Online Shopping Destination",
  description:
    "Discover the best deals on TiktokShop, the largest e-commerce platform. Shop trending products, exclusive discounts, and fast delivery worldwide.",
  keywords: [
    "TiktokShop",
    "Tiktok shopping",
    "online shopping",
    "buy online",
    "e-commerce",
    "best deals",
    "trending products",
    "discounts",
    "fast delivery",
    "secure shopping",
  ],
  openGraph: {
    title: "TiktokShop - The Ultimate Online Shopping Destination",
    description:
      "Shop the latest trending products with exclusive deals and fast delivery on TiktokShop.",
    url: "https://tiktokshop.online",
    siteName: "TiktokShop",
    images: [
      {
        url: "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1740281086/logo2_dwqmfv.png",
        width: 1200,
        height: 630,
        alt: "TiktokShop - Online Shopping",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TiktokShop - The Ultimate Online Shopping Destination",
    description:
      "Shop trending products, get exclusive discounts, and enjoy fast delivery worldwide on TiktokShop.",
    images: [
      "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1740281086/logo2_dwqmfv.png",
    ],
  },
  robots: {
    index: true, // Allow search engines to index the page
    follow: true, // Allow search engines to follow links on the page
  },
  alternates: {
    canonical: "https://tiktokshop.online", // Canonical URL to prevent duplicate content issues
  },
  authors: [
    { name: "TiktokShop Team", url: "https://tiktokshop.online/about" },
  ],
  publisher: "TiktokShop Online",
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
            {/* <DevToolsRedirect /> */}
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
