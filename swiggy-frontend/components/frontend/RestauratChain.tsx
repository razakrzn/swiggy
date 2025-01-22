"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useScroll } from "@/app/hooks/useScroll";
import { useEffect, useState } from "react";

interface Restaurant {
  id: number;
  featured_image: string;
  name: string;
  offer_text: string;
  rating: number;
  delivery_time: string;
  categories: string[];
  outlet: string;
  location: string;
  working_days: string[];
  opening_time: string;
  closing_time: string;
}

interface RestauratChainProps {
  selectedLocation: string;
}

const RestauratChain: React.FC<RestauratChainProps> = ({
  selectedLocation,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [locationFiltered, setLocationFiltered] = useState<Restaurant[]>([]);
  const currentTime = new Date();

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

  const isWorkingDay = (working_days: string[]): boolean => {
    if (!Array.isArray(working_days)) {
      return false;
    }

    const currentDay = new Date()
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();

    const result = working_days
      .map((day) => day.toLowerCase())
      .includes(currentDay);
    return result;
  };

  const getStatus = (
    working_days: string[],
    openingTime: string,
    closingTime: string
  ) => {
    if (!isWorkingDay(working_days)) {
      return "Closed";
    }

    const [openingHour, openingMinute, openingSecond] = openingTime
      .split(":")
      .map(Number);
    const [closingHour, closingMinute, closingSecond] = closingTime
      .split(":")
      .map(Number);

    const openTime = new Date(currentTime);
    openTime.setHours(openingHour, openingMinute, openingSecond);

    const closeTime = new Date(currentTime);
    closeTime.setHours(closingHour, closingMinute, closingSecond);

    return currentTime >= openTime && currentTime <= closeTime
      ? "Open"
      : "Closed";
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantResponse = await fetch(
          "http://127.0.0.1:8000/api/v1/restaurants/"
        );
        const data = await restaurantResponse.json();
        const restaurantData: Restaurant[] = data.data.map(
          (restaurant: { location: string; working_days: any }) => ({
            ...restaurant,
            location: restaurant.location || "", // Ensure 'location' exists
            working_days: restaurant.working_days || [], // Ensure 'working_days' exists
          })
        );

        setRestaurants(restaurantData);
        setFilteredRestaurants(restaurantData);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    // Try to get the location from localStorage first
    const storedLocation = localStorage.getItem("customerLocation");
    const locationToUse = storedLocation
      ? JSON.parse(storedLocation)
      : selectedLocation;

    if (locationToUse) {
      // Filter restaurants based on the location (either from state or localStorage)
      const filtered = restaurants.filter(
        (restaurant) => restaurant.location === locationToUse
      );
      setLocationFiltered(filtered); // Assuming you're updating the filtered list here
    } else {
      // If no location is selected, show all restaurants
      setFilteredRestaurants(restaurants);
    }
  }, [selectedLocation, restaurants]);

  return (
    <>
      <div className="wrapper !w-[75%]">
        {locationFiltered.length > 0 ? (
          <div>
            <div className="relative">
              <div className="absolute right-[0px] mt-[12px]">
                <button
                  className="mr-[12px]"
                  onClick={scrollLeft}
                  disabled={!isLeftActive}
                  style={{
                    opacity: isLeftActive ? 1 : 0.5,
                  }}
                >
                  <div className="flex items-center rounded-full h-8 py-2 px-2 bg-[rgba(2,6,12,0.15)]">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div>
                </button>
                <button
                  className=""
                  onClick={scrollRight}
                  disabled={!isRightActive}
                  style={{
                    opacity: isRightActive ? 1 : 0.5,
                  }}
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
                  Top restaurant chains in {selectedLocation}
                </h2>
              </div>
            </div>
            <div
              className="overflow-scroll mb-[16px] custom-scroll"
              ref={scrollContainerRef}
            >
              <div className="flex">
                {locationFiltered.map((restaurant) => (
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
                              <div
                                className={`font-extrabold tracking-tighter text-xl ${
                                  getStatus(
                                    restaurant.working_days,
                                    restaurant.opening_time,
                                    restaurant.closing_time
                                  ) === "Open"
                                    ? "text-white"
                                    : "text-red-500 text-center"
                                }`}
                              >
                                {getStatus(
                                  restaurant.working_days,
                                  restaurant.opening_time,
                                  restaurant.closing_time
                                ) === "Open"
                                  ? restaurant.offer_text
                                  : "Closed"}
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
                          <span className="font-regular">
                            {restaurant.rating}
                          </span>
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
        ) : (
          <div className="flex justify-center items-center flex-col">
            <span className="w-52 inline-block">
              <img src="/images/search-location.svg" alt="location search" />
            </span>
            <p className="text-center font-medium text-lg text-gray-500">
              Please select your location.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RestauratChain;
