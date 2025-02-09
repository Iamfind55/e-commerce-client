import React, { useEffect, useRef } from "react";
import { CancelIcon } from "@/icons/page";

type DrawerTypes = {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

const ShopDrawer = ({ isOpen, onClose, children }: DrawerTypes) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose && onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black bg-opacity-50">
      <div ref={drawerRef} className="flex">
        <div className="w-64 bg-white shadow-lg h-full p-2 overflow-y-auto">
          <div className="flex justify-end items-center pb-2 border-b">
            <button className="rounded" onClick={onClose}>
              <CancelIcon size={20} className="text-gray-500" />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ShopDrawer;
