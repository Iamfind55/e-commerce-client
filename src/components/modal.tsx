import { CancelIcon } from "@/icons/page";
import React, { useRef, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const MyModal = ({ isOpen, onClose, children, className }: Props) => {
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
        <div className="fixed inset-0 z-999999 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-999999 flex justify-center items-center">
          <div
            className={`
              transition-all relative duration-200 bg-white max-h-[90vh] text-info my-2 sm:my-5 overflow-y-auto p-0 sm:p-5 rounded ${
                className ? className : "md:w-3/4 w-4/5 lg:w-2/4"
              }`}
            ref={modalRef}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default MyModal;
