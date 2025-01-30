import { CancelIcon, WarningIcon } from "@/icons/page";
import React, { useRef, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          id="popup-modal"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div
            className="relative p-4 w-3/4 max-w-md max-h-full"
            ref={modalRef}
          >
            <div className="relative bg-white rounded-lg shadow border">
              <button
                type="button"
                className="absolute right-0 top-3 end-2.5 text-neon_pink bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center p-2"
                onClick={onClose}
              >
                {/* <CancelIcon size={24} className="text-neon_pink" /> */}
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-4 md:p-5 flex items-center justify-center flex-col gap-4">
                <h3 className="mt-5 text-lg font-normal text-gray-500">
                  Are you sure you want to delete this item?
                </h3>
                <h3 className="mb-2 text-xs text-gray-500">
                  Note: Any deleted files or folders will not restore again!.
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    className="py-2.5 px-5 ms-3 text-xs font-medium text-black focus:outline-none bg-gray-200 rounded py-2 focus:z-10 focus:ring-4"
                    onClick={onClose}
                  >
                    No, cancel
                  </button>
                  <button
                    type="button"
                    className="text-white bg-neon_pink focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded py-2 text-xs inline-flex items-center px-5 py-2.5 text-center"
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                  >
                    Yes, I am sure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
