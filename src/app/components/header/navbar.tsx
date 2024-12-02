"use client";

import { useRouter } from "next/navigation";
import Drawer from "@/components/drawer";
import IconButton from "@/components/iconButton";
import {
  ArrowNextIcon,
  CallIcon,
  CancelIcon,
  DoctorIcon,
  LanguageIcon,
  LoginIcon,
  MenuIcon,
  OutlineHomeIcon,
  RegisterIcon,
} from "@/icons/page";
import Link from "next/link";
import React from "react";
import { FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import DropdownComponent from "@/components/dropdown";
import { IoLogInOutline } from "react-icons/io5";

export default function Navbar() {
  const router = useRouter();
  const [openDrawer, setIsOpenDrawer] = React.useState(false);
  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
  };
  const toggleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const headerRef = React.useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = React.useState(false);
  const [originalOffset, setOriginalOffset] = React.useState(0);

  const handleScroll = () => {
    if (headerRef.current) {
      if (window.scrollY >= originalOffset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
  };

  React.useEffect(() => {
    if (headerRef.current) {
      setOriginalOffset(headerRef.current.offsetTop);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [originalOffset]);

  return (
    <>
      <div
        className={`bg-secondary
      ${
        isSticky
          ? "fixed top-0 left-0 right-0 mx-auto px-4 z-50"
          : "mx-auto px-4 z-50"
      }
      flex items-center justify-between bg-secondary p-4
    `}
        style={
          isSticky
            ? { position: "fixed", zIndex: 50 }
            : { position: "relative", zIndex: 50 }
        }
      >
        <div
          ref={headerRef}
          className="container mx-auto flex items-center justify-between bg-secondary"
        >
          <Link href="/">
            <Image
              className="rounded-full"
              src="/images/okardcare-hori-logo-white.png"
              alt=""
              width={150}
              height={120}
            />
          </Link>
          <div className="hidden lg:flex items-center justify-around gap-8 text-white cursor-pointer">
            <Link
              href="/"
              className="flex items-start justify-end text-sm hover:font-bold gap-2"
            >
              <OutlineHomeIcon size={16} />
              Home
            </Link>
            <Link
              href="/doctor"
              className="flex items-center justify-start text-sm hover:font-bold gap-1"
            >
              <DoctorIcon size={14} />
              &nbsp;Doctor
            </Link>
            <Link
              href="/contact-us"
              className="flex items-center justify-start text-sm hover:font-bold gap-1"
            >
              <CallIcon size={16} />
              &nbsp;Contact us
            </Link>
          </div>
          <div className="flex items-center justify-around gap-6">
            <DropdownComponent
              className="w-56"
              head={
                <LanguageIcon size={24} className="cursor-pointer text-white" />
              }
            >
              <div
                id="dropdownDivider"
                className="py-4 flex items-start gap-2 flex-col"
              >
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-secondary cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    // href={pathname}
                    href="#"
                    locale="en"
                    className="w-full text-sm flex items-center justify-start gap-2"
                  >
                    <Image
                      src="/images/english-flag.jpg"
                      alt=""
                      height={20}
                      width={20}
                    />
                    English
                  </Link>
                </div>
                <div className="w-full flex items-start gap-2 text-gray-500 hover:text-secondary cursor-pointer hover:bg-gray-200 py-2 px-4">
                  <Link
                    href="#"
                    locale="la"
                    className="w-full text-sm flex items-center justify-start gap-2"
                  >
                    <Image
                      src="/images/lao-flag.png"
                      alt=""
                      height={20}
                      width={20}
                    />
                    Laos
                  </Link>
                </div>
              </div>
            </DropdownComponent>
            <div className="hidden md:block">
              <IconButton
                className="rounded bg-white text-base px-2 bg-base text-xs"
                icon={<IoLogInOutline size={16} />}
                title="Log in"
                isFront={true}
                onClick={() => router.push("/signin")}
              />
            </div>
            <div className="hidden md:block">
              <IconButton
                className="rounded bg-base text-white py-1 px-2 bg-base text-xs"
                icon={<RegisterIcon size={16} />}
                title="Register"
                onClick={() => router.push("/signup")}
              />
            </div>
            <div
              className="block lg:hidden cursor-pointer"
              onClick={toggleOpenDrawer}
            >
              {openDrawer ? (
                <CancelIcon size={24} color="white" />
              ) : (
                <MenuIcon size={24} color="white" />
              )}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        isOpen={openDrawer}
        onClose={toggleCloseDrawer}
        title="OKARDCARE"
        icon={<CancelIcon size={24} />}
        className="w-full md:w-96"
      >
        <div className="w-full flex items-center justify-center flex-col overflow-scroll">
          <Link
            href="/home"
            className="text-b_text border-b w-full p-2 curso-pointer flex items-center justify-start text-xs gap-1"
          >
            <OutlineHomeIcon size={16} />
            &nbsp; Home
          </Link>
          <Link
            href="/doctor"
            className="text-b_text border-b w-full p-2 curso-pointer flex items-center justify-start text-xs gap-1"
          >
            <DoctorIcon size={16} />
            &nbsp;Doctor
          </Link>
          <Link
            href="/contact-us"
            className="text-b_text border-b w-full p-2 curso-pointer flex items-center justify-start text-xs gap-1"
          >
            <CallIcon size={16} />
            &nbsp;Contact us
          </Link>
          <Link
            href="/signin"
            className="text-b_text border-b w-full p-2 curso-pointer flex items-center justify-start text-xs gap-1"
          >
            <LoginIcon size={16} />
            &nbsp;Sign in
          </Link>
          <Link
            href="/signup"
            className="text-b_text border-b w-full p-2 curso-pointer flex items-center justify-start text-xs gap-1"
          >
            <FaUserPlus size={16} />
            &nbsp;Sign up
          </Link>
        </div>
      </Drawer>
    </>
  );
}
