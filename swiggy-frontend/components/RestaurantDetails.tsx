"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RestaurantInfo from "./RestaurantInfo";
import FoodMenu from "./FoodMenu";
import HeaderPartnerPage from "./HeaderPartnerPage";

export default function RestaurantDetails() {
  const [activeStep, setActiveStep] = useState(1);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleProceed = () => setActiveStep(2);
  const handleBack = () => setActiveStep(1);
  const handleSubmit = () => {
    setShowSuccessPopup(true); // Show success popup
    setTimeout(() => {
      setShowSuccessPopup(false); // Hide popup after 3 seconds
      setActiveStep(1); // Reset to the first step
    }, 3000);
  };

  return (
    <>
      <HeaderPartnerPage />
      <section className="bg-[#F0F0F5]">
        <div className="wrapper !w-[50%] py-8">
          <div className="flex">
            {/* Sidebar Navigation */}
            <div className="left flex flex-col w-min">
              <div className="top mt-[25px] mb-[56px]">
                {activeStep === 2 && (
                  <button onClick={handleBack} className="opacity-60 underline">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                    <span className="capitalize font-medium text-[14px]">
                      Back
                    </span>
                  </button>
                )}
              </div>
              <div className="flex flex-col max-w-[25%]">
                {/* Step 1 */}
                <div
                  className="flex cursor-pointer"
                  onClick={() => setActiveStep(1)}
                >
                  <div className="left pr-4 flex flex-col items-center">
                    <div
                      className={`relative top-[-7px] w-[28px] h-[28px] rounded-full flex justify-center items-center py-2 px-2 ${
                        activeStep === 1 ? "bg-[#cde8df]" : "bg-transparent"
                      }`}
                    >
                      <div
                        className={`w-[12px] h-[12px] rounded-full ${
                          activeStep === 1
                            ? "bg-[#1BA672]"
                            : "bg-[rgba(2,6,12,0.15)]"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <div className="pb-2">
                    <h6 className="text-xs font-normal uppercase opacity-70 mb-2">
                      Step 1
                    </h6>
                    <p className="text-[17px] font-semibold pt-2 opacity-90">
                      Restaurant Information
                    </p>
                    <span className="opacity-60 text-[14px] font-normal">
                      Location, Owner details, Open & Close hrs.
                    </span>
                  </div>
                </div>
                {/* Step 2 */}
                <div
                  className="flex cursor-pointer"
                  onClick={() => setActiveStep(2)}
                >
                  <div className="left pr-4 flex flex-col items-center">
                    <div
                      className={`relative top-[-7px] w-[28px] h-[28px] rounded-full flex justify-center items-center py-2 px-2 ${
                        activeStep === 2 ? "bg-[#cde8df]" : "bg-transparent"
                      }`}
                    >
                      <div
                        className={`w-[12px] h-[12px] rounded-full ${
                          activeStep === 2
                            ? "bg-[#1BA672]"
                            : "bg-[rgba(2,6,12,0.15)]"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <div className="pb-2">
                    <h6 className="text-xs font-normal uppercase opacity-70 mb-2">
                      Step 2
                    </h6>
                    <p className="text-[17px] font-semibold pt-1 opacity-90">
                      Menu Setup
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              {activeStep === 1 && (
                <>
                  <RestaurantInfo />
                </>
              )}
              {activeStep === 2 && (
                <>
                  <FoodMenu />
                  <div className="flex justify-between px-4 mt-4">
                    <button
                      className="flex justify-center items-center w-full bg-[#E2E2E7] p-4 text-[17px] font-semibold opacity-45"
                      onClick={() => {
                        handleSubmit();
                        handleProceed();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}

              {showSuccessPopup && (
                <div className="popup fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-lg font-semibold text-green-600">
                      Successfully Completed!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
