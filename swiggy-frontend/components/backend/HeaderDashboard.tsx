"use client";

import { useOwnerAuth } from "@/contexts/OwnerAuthContext";
import Link from "next/link";

const HeaderDashboard = () => {
  const { user, setUser, logout } = useOwnerAuth();

  return (
    <>
      <header>
        <div className="flex justify-between items-center py-4 px-20 shadow-custom bg-white">
          <div className="left flex items-center">
            <div className="logo w-5 py-[5px]">
              <Link href="/dashboard" className="">
                <img
                  src="/images/swiggy-logo2.svg"
                  alt="swiggy logo"
                  className="block w-full"
                />
              </Link>
            </div>
            <span className="text-[15px] text-[#02060C] font-semibold capitalize inline-block ml-[6px]">
              swiggy
            </span>
            <span className="text-[14px] text-[#02060C] inline-block ml-1">
              for restaurant
            </span>
          </div>
          <div className="flex items-center">
            <div className="right px-8">
              <span className="opacity-75 text-[15px] font-semibold">FAQs</span>
            </div>
            {user ? (
              <div className="flex gap-8">
                <Link
                  href="/dashboard/account"
                  className="text-[14px] font-semibold hover:text-logoColor flex items-center"
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
              </div>
            ) : (
              <Link
                href="/partner-login"
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
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
export default HeaderDashboard;
