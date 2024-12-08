"use client";

import React from "react";

const NearMe = () => {
  return (
    <>
      <div className="wrapper !w-[87%]">
        <div className="p-[16px]">
          <div>
            <h2 className="font-bold text-[22px]">
              Explore Every Restaurants Near Me
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <a
            href="/"
            className="text-none text-inherit outline-none w-[calc(25%-32px)] mx-4 mb-4"
          >
            <div className="p-4 border-[1.5px] border-[rgba(2,6,12,0.1)] rounded-xl w-full h-auto">
              <div className="flex justify-center items-center">
                <div className="font-medium text-[14px] text-[#02060C] text-opacity-75 text-center">
                  Explore Restaurants Near Me
                </div>
              </div>
            </div>
          </a>
          <a
            href="/"
            className="text-none text-inherit outline-none w-[calc(25%-32px)] mx-4 mb-4"
          >
            <div className="p-4 border-[1.5px] border-[rgba(2,6,12,0.1)] rounded-xl w-full h-auto">
              <div className="flex justify-center items-center">
                <div className="font-medium text-[14px] text-[#02060C] text-opacity-75 text-center">
                  Explore Top Rated Restaurants Near Me
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="h-16"></div>
      </div>
    </>
  );
};

export default NearMe;
