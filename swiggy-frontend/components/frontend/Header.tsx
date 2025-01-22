"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useState } from "react";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import AuthModal from "../auth/AuthModal";
import { useCart } from "@/contexts/CartContext";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onShowLocationSelector: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowLocationSelector }) => {
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const { user } = useCustomerAuth();
  const { totalItems } = useCart();

  const pathname = usePathname();
  const isActive = (paths: string[]) => paths.includes(pathname);
  return (
    <>
      <header className="h-[80px] shadow-custom pl-[20px] pr-[20px]">
        <div className="text-customGray wrapper flex justify-between items-center h-full">
          <div className="left flex justify-between items-center">
            <div className="flex items-center gap-10">
              <Link
                href="/restaurants"
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
                onClick={onShowLocationSelector}
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
            </div>
          </div>
          <nav className="flex justify-between gap-[50px] items-center h-full">
            <Link href="/" className="hover:text-logoColor flex">
              <span className="inline-block w-[18px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/corporate.svg"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-semibold">
                Swiggy Corporate
              </span>
            </Link>
            <Link href="/" className="hover:text-logoColor flex items-center">
              <span className="inline-block w-[17px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/search.png"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-semibold">Search</span>
            </Link>
            <Link href="/" className="hover:text-logoColor flex items-center">
              <span className="inline-block w-[19px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/offer.svg"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-semibold">Offer</span>
            </Link>
            <Link href="/" className="hover:text-logoColor flex items-center">
              <span className="inline-block w-[18px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/help.svg"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-semibold">Help</span>
            </Link>
            {user ? (
              <Link
                href="/profile"
                className={`text-[14px] font-semibold hover:text-logoColor flex items-center ${
                  isActive(["/profile/"]) ? "text-[#161823]" : "text-logoColor"
                }`}
              >
                <span className="inline-block w-[19px] mr-[10px]">
                  <img
                    className="block w-full"
                    src="/images/signIn.svg"
                    alt="user icon"
                  />
                </span>
                <span className="text-[14px] font-semibold capitalize">
                  {user.username}
                </span>
              </Link>
            ) : (
              <button
                onClick={() => setAuthModalVisible(true)}
                className="hover:text-logoColor flex items-center"
              >
                <span className="inline-block w-[19px] mr-[10px]">
                  <img
                    className="block w-full"
                    src="/images/signIn.svg"
                    alt="sign-in icon"
                  />
                </span>
                <span className="text-[14px] font-semibold">Sign In</span>
              </button>
            )}
            <Link
              href="/checkout"
              className={`hover:text-logoColor flex items-center ${
                totalItems > 0 ? "text-logoColor" : "text-black"
              }`}
            >
              <span className="relative inline-block w-[19px] mr-[10px]">
                <span className="absolute pb-[2px] top-0 text-center w-[20px] h-[11px] bg-white inline-block text-[12px] font-semibold">
                  <span
                    className={`absolute left-0 top-[-3px] text-center w-full inline-block text-[12px] font-semibold ${
                      totalItems > 0 ? "text-logoColor" : "text-black"
                    }`}
                  >
                    {totalItems > 0 ? totalItems : 0}
                  </span>
                </span>
                <FontAwesomeIcon icon={faBowlFood} size="lg" />
                {/* <img
                  className="block w-full"
                  src="/images/cart.svg"
                  alt="corporate icon"
                /> */}
              </span>
              <span className="text-[14px] font-semibold text-customGray">
                Cart
              </span>
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
