import { useEffect } from "react";
import { CancelIcon } from "@/icons/page";
import React from "react";

type DrawerTypes = {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
  title?: string;
  className?: string;
};

const Drawer = ({ isOpen, children, className, onClose }: DrawerTypes) => {
  const drawerRef = React.useRef<HTMLDivElement>(null);

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
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-50`}
    >
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-screen p-2 overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white w-80 ${className}`}
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
        <div className="flex justify-end items-center border-b border-gray-200">
          <button className="p-2 rounded" onClick={onClose}>
            <CancelIcon size={24} className="text-neon_pink" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
