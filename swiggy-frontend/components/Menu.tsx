"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useFetchDataDetails from "@/app/hooks/useFetchDataDetails";

interface Params {
  params: {
    id: string;
  };
}

interface FoodMenu {
  id: number;
  categories: string[];
  images: string;
  name: string;
  description: string;
  price: string;
  food_type: string;
  rating: string;
}

interface RestaurantDetails {
  id: number;
  food_menu: FoodMenu[];
}

const Menu = ({ id }: { id: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data: restaurant,
    loading,
    error,
  } = useFetchDataDetails<RestaurantDetails>(
    `http://127.0.0.1:8000/api/v1/restaurants/${id}/`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurant) return <p>No details available</p>;

  return (
    <>
      <div className="wrapper !max-w-[800px] !w-[90%]">
        <div className="flex justify-center items-center pt-8 pb-4 w-full">
          <div className="w-6">
            <img src="/images/menu-01.svg" alt="menu" />
          </div>
          <div className="text-[13px] font-medium uppercase opacity-60 mx-1">
            menu
          </div>
          <div className="w-6">
            <img src="/images/menu-03.svg" alt="menu" />
          </div>
        </div>
        <div className="px-4 relative">
          <div className="absolute right-[28px] mt-3">
            <FontAwesomeIcon
              className=""
              icon={faMagnifyingGlass}
              style={{ color: "rgba(2, 6, 12, 0.6)" }}
            />
          </div>
          <button className="flex justify-center items-center w-full h-12 bg-[rgba(2,6,12,0.05)] rounded-xl placeholder:italic ">
            <div
              className="capitalize font-medium text-sm"
              style={{ color: "rgba(2, 6, 12, 0.6)" }}
            >
              search for dishes
            </div>
          </button>
        </div>
        <div className="flex m-5 items-center">
          <div className="mr-2 cursor-pointer">
            <div className="flex items-center rounded-[1000px] border h-8 max-w-[72px] px-4">
              <label
                htmlFor=""
                className="relative inline-block w-[38px] h-[10px]"
              >
                <input type="text" className="opacity-0 w-0 h-0" />
                <span className="absolute cursor-pointer inset-0 bg-[rgba(2,6,12,0.15)] transition-all duration-200 rounded-[16px]">
                  <div className="absolute h-[20px] w-[20px] bottom-[-5px] transition-all duration-200 transform-none">
                    <img
                      src="/images/veg-icon.svg"
                      alt="veg"
                      className="block w-full"
                    />
                  </div>
                </span>
              </label>
            </div>
          </div>
          <div className="mr-2 cursor-pointer">
            <div className="flex items-center rounded-[1000px] border h-8 max-w-[72px] px-4">
              <label
                htmlFor=""
                className="relative inline-block w-[38px] h-[10px]"
              >
                <input type="text" className="opacity-0 w-0 h-0" />
                <span className="absolute cursor-pointer inset-0 bg-[rgba(2,6,12,0.15)] transition-all duration-200 rounded-[16px]">
                  <div className="absolute h-[20px] w-[20px] bottom-[-5px] transition-all duration-200 transform-none">
                    <img
                      src="/images/non_veg-icon.svg"
                      alt="non veg"
                      className="block w-full"
                    />
                  </div>
                </span>
              </label>
            </div>
          </div>
          <div className="mr-2 cursor-pointer">
            <div className="flex items-center justify-center border py-2 px-4 rounded-[18px] font-medium text-sm">
              Bestseller
            </div>
          </div>
        </div>
        <div className="h-[0.5px] bg-[rgba(2,6,12,0.15)] w-[calc(100%-32px)] my-[24px] mx-auto"></div>
        <div className="relative">
          <div className="main-container mt-6 mx-4 mb-4 relative">
            <button className="w-full flex justify-between items-center mb-6 pr-4">
              <h3 className="font-bold text-base opacity-90">Recommended</h3>
              <div className="rotate-180">
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </button>
            {restaurant?.food_menu?.map((item) => (
              <div key={item.id}>
                <div>
                  <div className="py-1">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex mb-1 items-center w-4 h-4">
                          <img
                            src={
                              item.food_type === "veg"
                                ? "/images/veg-icon.svg"
                                : "/images/non_veg-icon.svg"
                            }
                            alt={item.name}
                          />
                        </div>
                        <div className="font-semibold text-[16px] leading-[20px] tracking-[-0.3px] text-[rgba(2,6,12,0.75)] capitalize">
                          {item.name}
                        </div>
                        <div className="flex mt-1 items-center">
                          <div className="flex mr-1 items-center">
                            <span>
                              <div className="before:content-['₹'] before:mr-1 before:text-[15px] font-medium text-[15px] leading-[19px] tracking-[-0.3px] text-[rgba(2,6,12,0.92)]">
                                {item.price}
                              </div>
                            </span>
                          </div>
                        </div>
                        <div className="flex mt-3 items-center">
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-[#116649] text-[10px]"
                            />
                          </div>
                          <div className="text-[rgb(17,102,73)] ml-[2px] font-bold text-[12px]">
                            {item.rating}
                          </div>
                          <div className="font-medium text-[12px] ml-[2px]">
                            (60)
                          </div>
                        </div>
                        <div>
                          <div className="relative mt-3 font-medium text-[14px] leading-[19px] tracking-[-0.3px] text-[rgba(2,6,12,0.6)]">
                            <div
                              className={isExpanded ? "" : "truncate-2-lines"}
                            >
                              {item.description}
                            </div>
                            <button
                              onClick={() => setIsExpanded(true)}
                              className="absolute right-[-40] bottom-0 opacity-60 font-bold text-[#02060C]"
                            >
                              {!isExpanded && "more"}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="ml-[60px] max-h-[164px] min-w-[156px]">
                        <button className="bg-[rgb(246,230,233)] w-[156px] h-[144px] rounded-[12px]">
                          <img
                            src={item.images}
                            alt={item.name}
                            className="object-cover block h-full w-full rounded-[12px]"
                          />
                        </button>
                        <div className="relative left-1/2 bottom-[28px] transform -translate-x-1/2 z-10">
                          <div className="relative">
                            <div className="flex flex-col justify-between items-center">
                              <div className="bg-white border-[1px] border-[rgba(2,6,12,0.15)] h-[40px] rounded-[8px] w-[120px] relative overflow-hidden inline-flex items-center justify-between shadow-[rgba(40,44,63,0.08)_0px_3px_8px]">
                                <button className="w-[120px] absolute inset-0 transition-all duration-[100ms] ease-in-out transform translate-y-0 text-center">
                                  <div className="font-bold text-[16px] leading-[24px] uppercase text-[rgb(27,166,114)] ">
                                    add
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[0.5px] bg-[rgba(2,6,12,0.15)] w-full my-[24px] mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
        {/* items */}
        <div className="h-[16px] border-b-[16px] border-b-[rgba(2,6,12,0.0509803922)]"></div>
      </div>
    </>
  );
};
export default Menu;
