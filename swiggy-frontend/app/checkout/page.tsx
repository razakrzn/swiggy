"use client";
import AuthModal from "@/components/auth/AuthModal";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function checkout() {
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  return (
    <>
      <header className="fixed w-full h-[80px] shadow-custom pl-[20px] pr-[20px] bg-white z-0">
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
              <div className="locationContainer group text-[16px] pr-[10px]">
                <span className="">
                  <span className="text-[12.5px] font-extrabold uppercase">
                    Secure Checkout
                  </span>
                </span>
              </div>
            </div>
          </div>
          <nav className="flex justify-between gap-[50px] items-center h-full">
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
            <div className="hover:text-logoColor flex items-center">
              <button
                onClick={() => setAuthModalVisible(true)}
                className=" font-medium flex items-center"
              >
                <span className="inline-block w-[19px] mr-[10px]">
                  <img
                    className="block w-full"
                    src="/images/signIn.svg"
                    alt="corporate icon"
                  />
                </span>
                <span className="inline-block text-[14px]">Sign In</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
      <section>
        <div
          className="wrapper !max-w-[800px] !w-[90%] h-[calc(100vh - 80px)] flex justify-center items-center"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="flex flex-col items-center">
            <div className="w-[271px] h-[256px] bg-[url('/images/checkout.png')] bg-no-repeat bg-cover mx-auto"></div>
            <div className="text-center text-[19px] font-semibold mt-6 opacity-65 ">
              Your cart is empty
            </div>
            <div className="mt-2 text-[#7e808c] text-[13px] font-normal">
              You can go to home page to view more restaurants
            </div>
            <Link
              href="/"
              className="mt-7 px-5 py-3 uppercase bg-[#ff5200] cursor-pointer text-center hover:shadow-[0_4px_14px_#d4d5d9] after:"
            >
              <span className="text-white font-semibold inline-block text-sm w-ful h-full">
                See restaurants near you
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-[#E9ECEE]">
        <div className="wrapper !w-[80%] ">
          <div className="relative w-full mt-[31px] mb-[150px] py-8 flex justify-center items-center gap-[30px]">
            <div className="left w-[780px] flex flex-col gap-[20px]">
              <div className="bg-white px-9 py-8 relative">
                <div className="text mb-10">
                  <h4 className="font-bold text-[15.5px] text-[#282C40]">
                    Oops, something went wrong. Please clear your cart and try
                    again.
                  </h4>
                </div>
                <div className="button">
                  <button className="uppercase text-white font-extrabold text-xs px-[28px] h-[40px] bg-logoColor">
                    retry
                  </button>
                </div>
                <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-[#282C40] shadow-custom-shadow-2 p-2 box-border">
                  <span className="bg-restaurant-closed w-full h-full bg-cover bg-center inline-block "></span>
                </div>
              </div>
              <div className="bg-white px-9 py-8 relative">
                <div className="mb-10">
                  <h4 className="font-bold text-[15px] text-[#282C40] mb-[7px]">
                    Account
                  </h4>
                  <p className="font-medium text-[14px] text-[#7E808C]">
                    To place your order now, log in to your existing account or
                    sign up.
                  </p>
                </div>
                <div className="buttons flex gap-[20px]">
                  <div
                    role="button"
                    className="login py-2 px-[35px] border border-[#60B247] inline-flex flex-col justify-center items-center"
                  >
                    <small className="font-medium text-[11.5px] text-[#60B247]">
                      Have an account?
                    </small>
                    <span className="uppercase font-bold text-[12.5px] text-[#60B247]">
                      LOG IN
                    </span>
                  </div>
                  <div
                    role="button"
                    className="login py-2 px-[35px] bg-[#60B247] inline-flex flex-col justify-center items-center"
                  >
                    <small className="font-medium text-[11.5px] text-white">
                      New to swiggy?
                    </small>
                    <span className="uppercase font-bold text-[12.5px] text-white">
                      SIGN UP
                    </span>
                  </div>
                </div>
                <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-[#282C40] shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                  <span className="w-full h-full bg-cover inline-block bg-center flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      size="lg"
                      className="text-white"
                    />
                  </span>
                </div>
                <div className="absolute right-[40px] top-[30px] image w-[147px]">
                  <img
                    src="/images/image-login.png"
                    alt="image-login"
                    className="w-full block"
                  />
                </div>
              </div>
              <div className="bg-white px-9 py-8 relative">
                <div className="">
                  <h3 className="font-bold text-[15.5px] text-[#93959F]">
                    Delivery address
                  </h3>
                </div>
                <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-white shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                  <span className="w-full h-full bg-cover inline-block bg-center flex justify-center items-center"></span>
                </div>
              </div>
              <div className="bg-white px-9 py-8 relative">
                <div className="">
                  <h3 className="font-bold text-[15.5px] text-[#93959F]">
                    Payment
                  </h3>
                </div>
                <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-white shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                  <span className="w-full h-full bg-cover inline-block bg-center flex justify-center items-center"></span>
                </div>
              </div>
            </div>
            <div className="w-[366px]">
              <div className="h-full">
                <div className="px-[30px] bg-transparent">
                  <div className="text-[#7e808c] tracking-[-.3px] text-[32px] font-semibold">
                    Cart Empty
                  </div>
                  <img
                    className="mt-[47px] opacity-50 w-full h-[212px]"
                    src="/images/cart-empty.png"
                    alt="cart empty"
                  />
                  <div className="text-[#93959f] mt-[15px] text-[14px] font-normal max-w-[227px] leading-5">
                    Good food is always cooking! Go ahead, order some yummy
                    items from the menu.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
