"use client";

import React from "react";
import { useTranslations } from "next-intl";

import Accordion from "@/components/accordion";
import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import { CancelIcon, VIPIcon } from "@/icons/page";
import MyModal from "@/components/modal";
import Loading from "@/components/loading";
import Select from "@/components/select";
import { vip_levels } from "@/utils/option";
import { useMutation } from "@apollo/client";
import { MUTATION_REQUEST_VIP } from "@/api/shop";
import { useToast } from "@/utils/toast";

export default function MemberOnly() {
  const g = useTranslations("global");
  const t = useTranslations("member_page");
  const { errorMessage, successMessage } = useToast();

  const [vip, setVip] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [requestVIP] = useMutation(MUTATION_REQUEST_VIP);

  const items = [
    {
      id: 1,
      title: t("_title1"),
      content: t("_content1"),
    },
    {
      id: 2,
      title: t("_title2"),
      content: t("_content2"),
    },
    {
      id: 3,
      title: t("_title3"),
      content: t("_content3"),
    },
    {
      id: 4,
      title: t("_title4"),
      content: t("_content4"),
    },
    {
      id: 5,
      title: t("_title5"),
      content: t("_content5"),
    },
  ];

  const vipLevelItems = [
    {
      id: 1,
      title: "VIP Level 1",
      content: t("_vip_level1"),
    },
    {
      id: 2,
      title: "VIP Level 2",
      content: t("_vip_level2"),
    },
    {
      id: 3,
      title: "VIP Level 3",
      content: t("_vip_level3"),
    },
    {
      id: 4,
      title: "VIP Level 4",
      content: t("_vip_level4"),
    },
    {
      id: 5,
      title: "VIP Level 5",
      content: t("_vip_level5"),
    },
  ];

  const selectedItem = vipLevelItems.find((item) => item.id === Number(vip));

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vip) {
      setMessage("Please select VIP level that you want to apply for!");
      return;
    }
    try {
      setIsLoading(true);
      const res = await requestVIP({
        variables: {
          data: {
            request_vip: vip.toString(),
          },
        },
      });
      if (res?.data?.shopRequestVIP.success) {
        successMessage({
          message: "Update address successfull!",
          duration: 3000,
        });
        handleOpenModal();
      } else {
        setMessage(res?.data?.shopRequestVIP.error.message);
      }
    } catch (error) {
      errorMessage({ message: "Unexpected error happen!", duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("_dashboard"), value: "/client" },
          { label: t("_member_only"), value: "/client/member-only" },
        ]}
      />
      <div className="bg-white w-full h-auto rounded-sm flex items-start justify-start flex-col mt-4 text-gray-500">
        <div className="w-full flex items-start justify-start flex-col gap-6 my-6 px-2 sm:px-6">
          <div className="w-full">
            <div className="w-full flex items-center justify-center">
              <h1 className="text-xl text-gray-800">{t("_vip_level")}</h1>
            </div>
            <br />
            <div className="bg-gray-100 p-4 w-full rounded flex items-start justify-start flex-col gap-4">
              <p className="text-gray-500 text-sm">1. {t("_vip_level1")}</p>
              <p className="text-gray-500 text-sm">2. {t("_vip_level2")}</p>
              <p className="text-gray-500 text-sm">3. {t("_vip_level3")}</p>
              <p className="text-gray-500 text-sm">4. {t("_vip_level4")}</p>
              <p className="text-gray-500 text-sm">5. {t("_vip_level5")}</p>
            </div>
          </div>

          <div className="w-full flex justify-center items-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
              <h2 className="text-xl font-semibold text-gray-500">
                Apply for VIP
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                If you're interested in becoming a VIP member, click the button
                below and follow the steps to complete your application.
              </p>
              <IconButton
                type="button"
                isFront={true}
                title="Apply VIP"
                icon={<VIPIcon />}
                onClick={() => handleOpenModal()}
                className="rounded bg-neon_pink text-white p-2 w-full mt-4 italic text-xs uppercase"
              />
            </div>
          </div>

          <div className="w-full rounded-md p-4 shadow-md border-t border-gray-100 mt-6">
            <h1 className="w-full flex items-center justify-center text-xl text-gray-800">
              {t("_faq_title")}
            </h1>
            <br />
            <div className="w-full">
              <Accordion items={items} />
            </div>
          </div>
        </div>
        <div className="w-full p-4 rounded-tr-lg rounded-tl-lg bg-gray-800 text-sm text-white mt-6">
          <p>{t("_long_description")}</p>
        </div>
      </div>

      <MyModal
        isOpen={isOpenModal}
        onClose={handleOpenModal}
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-2/5 md:inset-0 h-auto shadow"
      >
        <div className="flex items-center justify-center flex-col rounded bg-white w-full py-2 px-4 gap-2">
          <h4 className="text-gray-500 text-md mb-3 font-bold">
            "Apply for VIP member"
          </h4>
          <form
            className="w-full flex items-start justify-start flex-col gap-2"
            onSubmit={handleSubmitForm}
          >
            <Select
              name="district"
              title="Select VIP level"
              option={vip_levels}
              required
              value={vip}
              onChange={(e) => {
                setVip(e.target.value);
              }}
            />
            <div className="flex items-center justify-center gap-2 flex-col text-gray-500 text-sm my-2">
              {selectedItem ? (
                <>
                  <p className="font-semibold">{selectedItem.title}</p>
                  <p>{selectedItem.content}</p>
                </>
              ) : (
                <p>Select a VIP level to see details</p>
              )}
            </div>
            {message && (
              <p className="text-red-500 text-sm text-center">{message}</p>
            )}
            <div className="w-full flex items-center justify-start gap-4">
              <IconButton
                className="rounded border text-gray-500 p-2 w-full text-xs"
                icon={<CancelIcon />}
                isFront={true}
                type="button"
                title={g("_close_button")}
                onClick={handleOpenModal}
              />
              <IconButton
                className="rounded text-white p-2 bg-neon_pink w-full text-xs"
                icon={isLoading ? <Loading /> : <VIPIcon size={16} />}
                isFront={true}
                title="Apply now"
                type="submit"
              />
            </div>
          </form>
        </div>
      </MyModal>
    </>
  );
}
