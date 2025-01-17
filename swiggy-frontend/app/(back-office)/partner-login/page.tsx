"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/backend/SignupForm";
import { useOwnerAuth } from "@/contexts/OwnerAuthContext";

export default function LoginPage() {
  const { login } = useOwnerAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [localError, setLocalError] = useState<string | null>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  const handleBackToLogin = () => setShowSignup(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setLocalError(data.error || "Login failed");
        return;
      }

      if (data.role === "restaurant_owner") {
        setShowPopup(true);
        await login(data.access, data.refresh);
        setFormData({ username: "", password: "" });
      } else {
        setLocalError("You are not a partner. Please login as a customer.");
        return;
      }
    } catch (err) {
      console.error(err);
      setLocalError("Something went wrong. Please try again later.");
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
    router.push("/dashboard");
  };
  return (
    <>
      <section>
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
                        <form onSubmit={handleSubmit}>
                          <div className="border border-[#d4d5d9] p-0 block relative transform-gpu">
                            <input
                              type="text"
                              required
                              name="username"
                              id="username"
                              tabIndex={1}
                              autoComplete="off"
                              value={formData.username}
                              onChange={handleChange}
                              className="bg-transparent border-0 outline-0 h-[50px] w-full text-[17px] px-5 pt-[22px] box-border font-medium peer"
                            />
                            <label
                              htmlFor="email"
                              className="text-[14px] font-medium text-[#93959f] absolute left-0 bottom-[15px] pl-[20px] w-full transform transition-all duration-300 peer-valid:-translate-y-[100%] peer-valid:text-[#7e808c] peer-valid:text-[11.5px] peer-focus:-translate-y-[100%] peer-focus:text-[#7e808c] peer-focus:text-[11.5px] cursor-text pointer-events-none"
                            >
                              User Name
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
                              value={formData.password}
                              onChange={handleChange}
                              className="bg-transparent border-0 outline-0 h-[50px] w-full text-[17px] px-5 pt-[22px] box-border font-medium peer"
                            />
                            <label
                              htmlFor="password"
                              className="text-[14px] font-medium text-[#93959f] absolute left-0 bottom-[15px] pl-[20px] w-full transform transition-all duration-300 peer-valid:-translate-y-[100%] peer-valid:text-[#7e808c] peer-valid:text-[11.5px] peer-focus:-translate-y-[100%] peer-focus:text-[#7e808c] peer-focus:text-[11.5px] cursor-text pointer-events-none"
                            >
                              Password
                            </label>
                          </div>
                          <p className="text-xs text-logoColor text-center mt-3">
                            <Link
                              href="/restaurants"
                              target="blank"
                              className="underline"
                            >
                              {localError}
                            </Link>
                          </p>
                          <div className="mt-5">
                            <button
                              type="submit"
                              className="w-full cursor-pointer inline-flex justify-center items-center text-center text-[13px] text-white font-semibold h-[50px] px-8 bg-[#ff5200] hover:shadow-md uppercase"
                            >
                              Login
                            </button>
                          </div>
                        </form>
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
                        {showPopup && (
                          <div className="popup">
                            <div className="popup-content">
                              <span className="w-16 h-16 inline-block">
                                <img src="/images/popup.svg" alt="tik" />
                              </span>
                              <h2 className="font-medium my-4">
                                LogIn Successful!
                              </h2>
                              <button
                                onClick={closePopup}
                                tabIndex={0}
                                className="popup-button"
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex justify-center py-[24px] gap-6">
          <div className="left max-w-[508px] flex flex-col gap-[12px]">
            <div className="">
              <div className="text-[14px] opacity-45 font-semibold">
                In just 3 easy steps
              </div>
              <div className="text-[18px] opacity-75 font-bold ">
                Get your restaurant delivery-ready in 24hrs!
              </div>
            </div>
            <div className="line w-[38px] h-1 rounded-[16px] bg-[rgb(255,82,0)]"></div>
            <div className="py-6 pr-[100px] pl-4 bg-[rgb(240,240,245)] rounded-[16px]">
              <div className="">
                <div className="pl-5 flex flex-col gap-6 relative before:content-[''] before:absolute before:w-[1px] before:border before:border-dashed before:border-[rgba(2,6,12,0.15)] before:top-0 before:bottom-0 before:left-0">
                  <div className="flex flex-col gap-1 relative before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:left-[-24px] before:top-[2px] before:bg-[rgb(101,65,228)] before:border  before:border-[rgb(101,65,228)] before:rounded-full">
                    <div className="uppercase font-normal text-[11px] text-[rgba(2,6,12,0.6)]">
                      step 1
                    </div>
                    <div className="font-semibold text-[17px] opacity-75">
                      Install the Swiggy Owner App
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 relative before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:left-[-24px] before:top-[2px] before:bg-[rgb(101,65,228)] before:border  before:border-[rgb(101,65,228)] before:rounded-full">
                    <div className="uppercase font-normal text-[11px] text-[rgba(2,6,12,0.6)]">
                      step 2
                    </div>
                    <div className="font-semibold text-[17px] opacity-75 ">
                      Login/Register using your phone number
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 relative before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:left-[-24px] before:top-[2px] before:bg-[rgb(101,65,228)] before:border  before:border-[rgb(101,65,228)] before:rounded-full">
                    <div className="uppercase font-normal text-[11px] text-[rgba(2,6,12,0.6)]">
                      step 3
                    </div>
                    <div className="font-semibold text-[17px] opacity-75 ">
                      Enter restaurant details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right flex flex-col gap-4 p-8 bg-[#FDFBFF] w-[612px] rounded-[16px] border-[#D8D0ED] border-2">
            <div className="top">
              <div className="text-[12px] font-semibold opacity-75">
                For an easy form filling process,
              </div>
              <div className="text-[13px] font-normal opacity-60">
                you can keep these documents handy.
              </div>
            </div>
            <div className="h-[1px] border border-dotted border-black opacity-20"></div>
            <div className="flex gap-[12px] items-center">
              <div className="w-[5px] h-[5px] rounded bg-[rgb(255,82,0)]"></div>
              <div className="text-[15px] font-semibold opacity-75">
                FSSAI License copy
              </div>
              <a href="/" className="underline text-[rgb(255,82,0)]">
                <div className="">Apply Here</div>
              </a>
            </div>
            <div className="flex gap-[12px] items-center">
              <div className="w-[5px] h-[5px] rounded bg-[rgb(255,82,0)]"></div>
              <div className="text-[15px] font-semibold opacity-75">
                Your Restaurant menu
              </div>
            </div>
            <div className="flex gap-[12px] items-center">
              <div className="w-[5px] h-[5px] rounded bg-[rgb(255,82,0)]"></div>
              <div className="text-[15px] font-semibold opacity-75">
                Bank details
              </div>
            </div>
            <div className="flex gap-[12px] items-center">
              <div className="w-[5px] h-[5px] rounded bg-[rgb(255,82,0)]"></div>
              <div className="text-[15px] font-semibold opacity-75">GSTIN</div>
              <a href="/" className="underline text-[rgb(255,82,0)]">
                <div className="">Apply Here</div>
              </a>
            </div>
            <div className="flex gap-[12px] items-center">
              <div className="w-[5px] h-[5px] rounded bg-[rgb(255,82,0)]"></div>
              <div className="text-[15px] font-semibold opacity-75">
                PAN card copy
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
