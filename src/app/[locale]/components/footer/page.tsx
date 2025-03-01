"use client";

import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/utils/toast";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

// icons, utils, hooks
import Textfield from "@/components/textField";
import IconButton from "@/components/iconButton";
import { NotiIcon, SubscriptionIcon } from "@/icons/page";

export default function Footer() {
  const t = useTranslations("homePage");
  const g = useTranslations("global");
  const { successMessage } = useToast();
  const [email, setEmail] = useState<string>("");
  const [isSubscription, setIsSubscription] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("subscription");
      if (storedEmail) {
        setIsSubscription(true);
      }
    }
  }, []);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSubscription) {
      localStorage.setItem("subscription", JSON.stringify(email));
      setIsSubscription(true);
      successMessage({ message: "Subscription successful!", duration: 3000 });
    }
  };

  return (
    <>
      <div className="bg-second_black">
        <div className="container mx-auto px-4 flex items-center justify-between flex-col gap-8 pt-6 pb-6">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 pt-2 pb-2 mb-2 sm:pt-4 sm:pb-4 sm:mt-4 sm:mb-4">
            <div className="mb-4 flex items-start justify-start gap-4 flex-col">
              <Link href="/">
                <Image
                  className="rounded-full"
                  src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1740281086/logo2_dwqmfv.png"
                  alt="Logo"
                  width={250}
                  height={200}
                />
              </Link>
              <p className="text-sm text-white">{t("_footer_title")}</p>
              <p className="text-sm text-white">
                {g("_email")}:&nbsp;
                <Link
                  href="mailto:info@tiktokshop.online"
                  className="underline hover:text-neon_pink"
                >
                  info@tiktokshop.online
                </Link>
              </p>
            </div>

            <div className="mb-4 pl-0 sm:pl-4 flex items-start justify-start flex-col gap-4">
              <h1 className="text-white text-sm font-bold">{t("_details")}:</h1>
              <Link
                href="/terms-condition"
                className="text-white text-xs hover:underline hover:text-neon_pink"
              >
                {t("_terms_conditions")}
              </Link>
              <Link
                href="/refund-policy"
                className="text-white text-xs hover:underline hover:text-neon_pink"
              >
                {t("_refund_policy")}
              </Link>
              <Link
                href="/support-policy"
                className="text-white text-xs hover:underline hover:text-neon_pink"
              >
                {t("_support_policy")}
              </Link>
              <Link
                href="/privacy-policy"
                className="text-white text-xs hover:underline hover:text-neon_pink"
              >
                {t("_privacy_policy")}
              </Link>
            </div>

            <form
              onSubmit={handleSubmitForm}
              className="mb-4 pl-0 sm:pl-4 flex items-start justify-start flex-col gap-4"
            >
              <h1 className="text-white text-sm font-bold">
                {t("_subscribe")}
              </h1>
              <Textfield
                required
                id="email"
                name="email"
                value={email}
                type="email"
                title={t("_email")}
                placeholder={t("_email_placeholder")}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscription} // Disable input if already subscribed
              />
              <div>
                <IconButton
                  className={`text-xs rounded text-white p-2 ${
                    isSubscription
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-neon_pink"
                  }`}
                  icon={
                    isSubscription ? (
                      <SubscriptionIcon size={18} />
                    ) : (
                      <NotiIcon size={18} />
                    )
                  }
                  title={isSubscription ? "Subscribed" : "Subscribe"}
                  type="submit"
                  disabled={isSubscription}
                />
              </div>
              <p className="text-white text-xs">
                {t("_subscribe_description")}
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full text-white bg-black">
        <div className="container mx-auto flex flex-col sm:flex-row gap-3 items-center justify-center p-4">
          <p className="text-white text-xs">
            © Tiktokshop <strong className="text-white text-bold">2015</strong>{" "}
            | All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}
