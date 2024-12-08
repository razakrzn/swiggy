"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useState } from "react";
import AuthModal from "./auth/AuthModal";
import Location from "./Location";

const Header = () => {
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);

  return (
    <>
      <header className="h-[80px] shadow-custom pl-[20px] pr-[20px]">
        <div className="text-customGray wrapper flex justify-between items-center h-full">
          <div className="left flex justify-between items-center">
            <div className="flex items-center gap-10">
              <Link
                href="/"
                className=" w-[48px] overflow-hidden inline-block rounded-[15px]"
              >
                <img
                  src="/images/logo-2.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </Link>
              <div
                role="button"
                onClick={() => setLocationModalVisible(true)}
                className="locationContainer group text-[16px] pr-[10px] relative hover:text-logoColor"
              >
                <span className="relative after:content-[''] after:absolute after:h-[2px] after:w-full after:left-0 after:bottom-[-5px] after:bg-customGray group-hover:after:bg-logoColor  ">
                  <span className="text-[13px] font-bold">Other</span>
                </span>
                <span className="ml-1 text-[13px] text-lightGray font-normal pl-1 group-hover:text-opacity-70">
                  location
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="sm"
                  className="text-logoColor absolute right-[-12px] top-1/2 transform -translate-y-1/2"
                />
              </div>
              <Location
                isVisible={isLocationModalVisible}
                onClose={() => setLocationModalVisible(false)}
              />
            </div>
          </div>
          <nav className="flex justify-between gap-[50px] items-center h-full">
            <Link href="/" className="hover:text-logoColor flex">
              <span className="inline-block w-[18px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/corporate.png"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-medium">Swiggy Corporate</span>
            </Link>
            <Link href="/" className="hover:text-logoColor flex items-center">
              <span className="inline-block w-[17px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/search.png"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-medium">Search</span>
            </Link>
            <Link href="/" className="hover:text-logoColor flex items-center">
              <span className="inline-block w-[19px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/offer.png"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-medium">Offer</span>
            </Link>
            <Link href="/" className="hover:text-logoColor flex items-center">
              <span className="inline-block w-[18px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/help.svg"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-medium">Help</span>
            </Link>
            <div
              className="hover:text-logoColor flex items-center"
              role="button"
              tabIndex={0}
              onClick={() => setAuthModalVisible(true)}
            >
              <span className="inline-block w-[19px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/signIn.svg"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-medium">Sign In</span>
            </div>
            <Link
              href="/checkout"
              className="hover:text-logoColor flex items-center"
            >
              <span className="inline-block w-[19px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/cart.svg"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-medium">Cart</span>
            </Link>
          </nav>
        </div>
        <AuthModal
          isVisible={isAuthModalVisible}
          onClose={() => setAuthModalVisible(false)}
        />
      </header>
    </>
  );
};

export default Header;
