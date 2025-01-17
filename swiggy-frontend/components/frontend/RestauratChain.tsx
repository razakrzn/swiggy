"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useScroll } from "@/app/hooks/useScroll";
import { useFetchData } from "@/app/hooks/useFetchData";

interface Restaurant {
  id: number;
  featured_image: string;
  name: string;
  offer_text: string;
  rating: number;
  delivery_time: string;
  categories: string[];
  outlet: string;
}

const RestauratChain = () => {
  const {
    scrollContainerRef,
    isLeftActive,
    isRightActive,
    scrollRight,
    scrollLeft,
  } = useScroll();

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const {
    data: restaurants,
    loading,
    error,
  } = useFetchData<Restaurant>(`http://127.0.0.1:8000/api/v1/restaurants/`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="wrapper !w-[75%]">
        <div className="relative">
          <div className="absolute right-[0px] mt-[12px]">
            <button className="mr-[12px]" onClick={scrollLeft}>
              <div className="flex items-center rounded-full h-8 py-2 px-2 bg-[rgba(2,6,12,0.15)]">
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
            </button>
            <button
              className=""
              onClick={scrollRight}
              disabled={!isRightActive}
            >
              <div className="flex items-center rounded-full h-8 py-2 px-2 bg-[rgba(2,6,12,0.15)]">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </button>
          </div>
        </div>
        <div className="p-[16px]">
          <div>
            <h2 className="font-bold text-[22px]">
              Top restaurant chains in Kozhikode
            </h2>
          </div>
        </div>
        <div
          className="overflow-scroll mb-[16px] custom-scroll"
          ref={scrollContainerRef}
        >
          <div className="flex">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="first:pl-[16px] pr-[32px] last:pr-[16px]"
              >
                <div>
                  <Link href={`/city/${restaurant.id}`}>
                    <div className="image w-[273px] h-[180px]">
                      <div className="w-full h-full relative rounded-lg overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.1)]">
                        <div className="w-full h-full ">
                          <img
                            className="w-full h-full object-cover"
                            src={restaurant.featured_image}
                            alt={restaurant.name}
                          />
                        </div>
                        <div className="absolute bottom-0 uppercase px-[12px]  pb-[8px] h-[81px] bg-gradient-to-b from-[rgba(27,30,36,0)] to-[#1b1e24] grid content-end text-left w-full">
                          <div className="font-extrabold tracking-tighter text-white text-xl">
                            {restaurant.offer_text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="mt-[10px] ml-[12px]">
                  <h2 className="font-[700] text-[16px] capitalize">
                    {restaurant.name}
                  </h2>
                  <div className="flex items-center gap-[5px]">
                    <span className="w-[20px] h-[20px] bg-[#1e933c] rounded-full p-[2px] inline-flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-white text-[10px]"
                      />
                    </span>
                    <div className="flex items-center text-[16px] gap-[5px]">
                      <span className="font-regular">{restaurant.rating}</span>
                      <span className="text-[16px] font-extrabold">.</span>
                      <span className="font-medium">
                        {restaurant.delivery_time} mins
                      </span>
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-[400] text-[14px] text-[rgba(2,6,12,0.6)]"
                      title={restaurant.categories.join(", ")}
                    >
                      {truncateText(restaurant.categories.join(", "), 35)}
                    </div>
                    <div className="font-[400] text-[14px] text-[rgba(2,6,12,0.6)]">
                      {restaurant.outlet}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-12 mx-auto h-1 rounded-sm relative bg-[#f0f0f5] progress-bar"></div>
        <hr className="border-b border-customBorder my-8 mx-5" />
      </div>
    </>
  );
};

export default RestauratChain;
