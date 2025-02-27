import React from "react";
import { useRouter } from "next/navigation";

import MyModal from "./modal";
import IconButton from "./iconButton";
import { useToast } from "@/utils/toast";
import { useMutation } from "@apollo/client";
import { formatDate } from "@/utils/dateFormat";
import { INotificationData } from "@/types/notification";
import { MUTATION_SHOP_UPDATE_NOTIFICATIONS } from "@/api/notification";
import { CancelIcon, FillCircleIcon, MessageSettingIcon } from "@/icons/page";
import { useTranslations } from "next-intl";

export default function NotificationCard(props: INotificationData) {
  const router = useRouter();
  const g = useTranslations("global");
  const t = useTranslations("purchase_history");
  const n = useTranslations("notification_page");
  const { errorMessage } = useToast();
  const [notiId, setNotiId] = React.useState<string>("");
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const [shopUpdateNotification] = useMutation(
    MUTATION_SHOP_UPDATE_NOTIFICATIONS
  );

  const handleUpdateNotification = async () => {
    console.log(notiId);
    if (!notiId) {
      return;
    }
    try {
      const res = await shopUpdateNotification({
        variables: {
          shopReadNotificationId: notiId,
        },
      });
      if (res?.data?.shopReadNotification.success) {
        console.log("success");
      } else {
        console.log("failed");
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected issue happen. Try again later!",
        duration: 300,
      });
    } finally {
      setNotiId("");
    }
  };

  React.useEffect(() => {
    if (notiId) {
      handleUpdateNotification();
    }
  }, [notiId]);

  return (
    <>
      <div
        className={`${
          props?.is_read ? "bg-gray-100" : "bg-green-50"
        } w-full border py-2 px-4 rounded-md flex items-start justify-start flex-col select-none gap-2 hover:cursor-pointer group hover:shadow transition-all duration-300 relative`}
      >
        <div className="p-2 w-full flex items-center justify-between">
          <p className="text-sm text-gray-500">{props?.title}</p>
          <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
            <FillCircleIcon
              size={10}
              className={props?.is_read ? "text-gray-400" : "text-green-500"}
            />
            {props?.is_read ? n("_read") : n("_unread")}
          </p>
        </div>
        <div className="pl-2">
          <p className="text-xs text-gray-500 flex items-center justify-center">
            {/* {t("_order_no")}:{props?.order_no} */}
            {t("_order_no")}: &nbsp;12345678
          </p>
        </div>
        <div className="pl-2">
          <p className="text-xs text-gray-500 flex items-center justify-center">
            {props?.description}
          </p>
        </div>
        <div className="p-2 w-full flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {formatDate(props?.created_at)}
          </p>
        </div>
        <button
          className={`bg-gray-500 hover:bg-neon_pink absolute bottom-0 right-0 p-1 rounded-tl-xl rounded-br-md flex items-center justify-center transition-colors duration-300`}
          onClick={() => {
            setNotiId(props?.is_read ? "" : props?.id);
            handleOpenModal();
            handleUpdateNotification();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-6 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <MyModal isOpen={openModal} onClose={handleOpenModal} className="w-3/5">
        <div className="w-full flex items-start justify-start flex-col gap-2 rounded bg-white w-full text-gray-500 py-3">
          <div className="w-full flex items-start justify-between">
            <h4 className="text-gray-500 text-md">ID: {props?.reference_id}</h4>
            <CancelIcon
              size={22}
              onClick={() => {
                handleOpenModal();
                router.refresh();
              }}
              className="text-gray-500 border rounded cursor-pointer hover:shadow-md"
            />
          </div>
          <div className="w-full flex items-center justify-start gap-2 text-sm">
            <p>
              {t("_created_at")}: {formatDate(props?.created_at)}
            </p>
          </div>
          <div className="w-full flex items-center justify-start gap-2 text-sm">
            <MessageSettingIcon size={16} />
            <p>{props?.notification_type}</p>
          </div>
          <div className="w-full flex items-start justify-start flex-col gap-2 border border-gray-100 rounded-md p-2">
            <ul className="w-full">
              {Object.entries(props?.data).map(([key, value], index) => (
                <li
                  key={key}
                  className={`rounded text-xs gap-2 p-2 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <strong>{key}</strong>: {String(value)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-4 mt-4">
          <IconButton
            title={g("_close_button")}
            type="button"
            onClick={() => {
              handleOpenModal();
              router.refresh();
            }}
            className="rounded bg-neon_pink text-white w-auto text-xs hover:font-medium hover:shadow-md"
          />
        </div>
      </MyModal>
    </>
  );
}
