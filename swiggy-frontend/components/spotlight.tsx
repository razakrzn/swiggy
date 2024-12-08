"use client";

import { useState } from "react";
import Link from "next/link";
import SignupForm from "./SignupForm";

const Spotlight = () => {
  const [showSignup, setShowSignup] = useState(false);
  const handleBackToLogin = () => setShowSignup(false);

  return (
    <div className="">
      <div className="w-full inset-0 flex flex-col items-stretch bg-cover bg-center bg-no-repeat z-[-1]">
        <div className="w-full py-5 bg-bg-1">
          <div className="flex justify-center items-center h-full ">
            <div className="mr-5 flex flex-col items-start">
              <img
                src="/images/swiggy-white.svg"
                alt="Swiggy Logo"
                className="w-[32px]"
              />
              <div className="tracking-[2px] text-[11px] font-medium my-[6px] text-white">
                PARTNER WITH SWIGGY!
              </div>
              <img
                src="/images/orgline.svg"
                alt="Orange Line"
                className="w-[72px]"
              />
              <div className="text-white max-w-[26rem] leading-10 text-[36px] font-bold my-[14px]">
                Reach customers far away from you
              </div>
              <div className="w-[72px] bg-[rgba(255,255,255,0.3)] h-1"></div>
            </div>

            <div className="flex w-[23.4rem] m-[10px] rounded-[20px] bg-white">
              <div className="py-5 px-[27px] rounded-[20px] w-full">
                {showSignup ? (
                  <SignupForm onBackToLogin={handleBackToLogin} />
                ) : (
                  <>
                    <div className="text-[20px] text-[#2A3A50] font-semibold mb-5">
                      Get Started
                    </div>
                    <form>
                      <div className="border border-[#d4d5d9] p-0 block relative transform-gpu">
                        <input
                          type="email"
                          required
                          name="email"
                          id="email"
                          tabIndex={1}
                          autoComplete="off"
                          className="bg-transparent border-0 outline-0 h-[50px] w-full text-[17px] px-5 pt-[22px] box-border font-medium peer"
                        />
                        <label
                          htmlFor="email"
                          className="text-[14px] font-medium text-[#93959f] absolute left-0 bottom-[15px] pl-[20px] w-full transform transition-all duration-300 peer-valid:-translate-y-[100%] peer-valid:text-[#7e808c] peer-valid:text-[11.5px] peer-focus:-translate-y-[100%] peer-focus:text-[#7e808c] peer-focus:text-[11.5px] cursor-text pointer-events-none"
                        >
                          Email
                        </label>
                      </div>

                      <div className="mt-5 border border-[#d4d5d9] p-0 block relative transform-gpu">
                        <input
                          type="password"
                          required
                          name="password"
                          id="password"
                          tabIndex={2}
                          autoComplete="off"
                          className="bg-transparent border-0 outline-0 h-[50px] w-full text-[17px] px-5 pt-[22px] box-border font-medium peer"
                        />
                        <label
                          htmlFor="password"
                          className="text-[14px] font-medium text-[#93959f] absolute left-0 bottom-[15px] pl-[20px] w-full transform transition-all duration-300 peer-valid:-translate-y-[100%] peer-valid:text-[#7e808c] peer-valid:text-[11.5px] peer-focus:-translate-y-[100%] peer-focus:text-[#7e808c] peer-focus:text-[11.5px] cursor-text pointer-events-none"
                        >
                          Password
                        </label>
                      </div>

                      <div className="mt-5">
                        <Link
                          href=""
                          className="w-full cursor-pointer inline-flex justify-center items-center text-center text-[13px] text-white font-semibold h-[50px] px-8 bg-[#ff5200] hover:shadow-md uppercase"
                        >
                          <input type="submit" className="hidden" />
                          Login
                        </Link>
                      </div>
                      <div className="font-normal text-sm relative my-2 flex justify-center">
                        <button
                          onClick={() => setShowSignup(true)}
                          className="font-medium text-logoColor"
                        >
                          create an account
                        </button>
                      </div>
                      <div className="text-[11px] text-[#686b78] font-medium">
                        By clicking on Login, I accept the{" "}
                        <Link href="/" className="text-[#282c3f]">
                          Terms & Conditions
                        </Link>{" "}
                        &{" "}
                        <Link href="/" className="text-[#282c3f]">
                          Privacy Policy
                        </Link>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
