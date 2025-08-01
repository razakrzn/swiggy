"use client";

import {
  faChevronDown,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "../auth/AuthModal";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";

const Spotlight = () => {
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const { user, setUser, logout } = useCustomerAuth();
  const router = useRouter();

  const handleClick = () => {
    router.push("/search");
  };

  const handleSignOut = () => {
    setUser(null);
    logout();
  };

  return (
    <div>
      <section className="background bg-logoColor min-h-screen">
        <header>
          <div className="wrapper py-8 flex items-center justify-between !w-[80%]">
            <Link href="/" className="logo_container flex items-center gap-5">
              <div className="logo w-[48px] h-[48px] border rounded-[12px] p-2">
                <img
                  className="block w-full h-full"
                  src="/images/swiggy-white.svg"
                  alt="logo"
                />
              </div>
              <h1 className="text-[26px] text-white font-extrabold">Swiggy</h1>
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/" className="font-bold text-sm text-white">
                Swiggy Corporate
              </Link>

              <Link
                href="/partner-login"
                className="font-bold text-sm text-white"
                target="blank"
              >
                Partner with us
              </Link>
              <Link
                href="/"
                className="border rounded-[10px] py-3 px-4 flex items-center h-14"
              >
                <span className="font-bold text-white">Get the App</span>
                <span className="ml-2">
                  <img src="/images/rating_up.svg" alt="rating_up" />
                </span>
              </Link>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="py-3 px-4 flex items-center justify-center h-[54px] text-white font-extrabold text-sm bg-black rounded-[15px] w-[135px]"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => setAuthModalVisible(true)}
                  className="py-3 px-4 flex items-center justify-center h-[54px] text-white font-extrabold text-sm bg-black rounded-[15px] w-[135px]"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
          <AuthModal
            isVisible={isAuthModalVisible}
            onClose={() => setAuthModalVisible(false)}
          />
        </header>
        <div className="spotlight ">
          <div className="">
            <div className="flex relative">
              <img
                className="w-3xs h-[450px] object-cover"
                src="/images/image1.png"
                alt=""
              />
              <div className="info mx-auto">
                <h1 className="text-5xl font-extrabold text-white mt-14 text-center">
                  Order food. Swiggy it!
                </h1>
                <div className="my-[30px]">
                  <div className="inputs_wrapper flex items-center gap-[16px]">
                    <div className="px-4 border bg-white rounded-[16px] border-[#D9DADB] flex items-center gap-[10px]">
                      <label htmlFor="locationInput" className="sr-only">
                        Enter your delivery location
                      </label>
                      <span className="w-[18px] inline-block location_icon z-1">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          size="xl"
                          className="text-logoColor"
                        />
                      </span>
                      <input
                        id="locationInput"
                        type="text"
                        placeholder="Enter your delivery location"
                        className="w-full p-2 h-[60px] border-gray-300 bg-transparent outline-none z-0 placeholder-opacity-50 placeholder:font-semibold placeholder:text-sm placeholder:tracking-tighter"
                      />
                      <button className="w-[20px] right-0 top-2 text-gray-500">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="text-black"
                        />
                      </button>
                    </div>

                    <div
                      role="button"
                      onClick={handleClick}
                      className="px-4 border w-[480px] h-[60px] bg-white rounded-[16px] border-[#D9DADB]  flex items-center gap-[10px] justify-between"
                    >
                      <div className="w-full p-2  border-gray-300 bg-transparent outline-none z-0 opacity-50 font-semibold text-sm">
                        Search for restaurants, item or more
                      </div>
                      <div className="w-[20px] right-0 top-2 text-gray-500">
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          className="opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[520px] mx-auto">
                  <Link
                    href="/restaurants"
                    target="black"
                    className="inline-block w-full h-full rounded-[36px]"
                  >
                    <img
                      src="/images/food_delivery.png"
                      alt="food_delivery"
                      className="w-full h-full block object-cover"
                    />
                  </Link>
                </div>
              </div>
              <img
                className="w-3xs h-[450px] object-cover"
                src="/images/image2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Spotlight;
