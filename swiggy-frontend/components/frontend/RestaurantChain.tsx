"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useScroll } from "@/app/hooks/useScroll";
import { useEffect, useState } from "react";
import Image from "next/image";

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

interface RestaurantChainProps {
  selectedLocation: string;
}

const RestaurantChain: React.FC<RestaurantChainProps> = ({
  selectedLocation,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
  }, []);

  const {
    scrollContainerRef,
    isLeftActive,
    isRightActive,
    scrollRight,
    scrollLeft,
  } = useScroll();

  const isWorkingDay = (working_days: string[]): boolean => {
    if (!Array.isArray(working_days) || !currentTime) {
      return false;
    }

    const currentDay = currentTime
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();

    return working_days.map((day) => day.toLowerCase()).includes(currentDay);
  };

  const getStatus = (
    working_days: string[],
    openingTime: string,
    closingTime: string
  ) => {
    if (!currentTime || !isWorkingDay(working_days)) {
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
            location: restaurant.location || "",
            working_days: restaurant.working_days || [],
          })
        );

        setRestaurants(restaurantData);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const storedLocation = localStorage.getItem("customerLocation");
    const locationToUse = storedLocation
      ? JSON.parse(storedLocation)
      : selectedLocation;

    if (locationToUse) {
      const filtered = restaurants.filter(
        (restaurant) => restaurant.location === locationToUse
      );
      setFilteredRestaurants(filtered);
    } else {
      setRestaurants(restaurants);
    }
  }, [selectedLocation, restaurants]);

  return (
    <div className="container-custom py-8 mt-[80px]">
      {filteredRestaurants.length > 0 && (
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              Top restaurant chains in {filteredRestaurants[0].location}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={scrollLeft}
                disabled={!isLeftActive}
                className={`p-2 rounded-full bg-background-light transition-all duration-200 ${
                  !isLeftActive
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-background-light/80 hover:shadow-md active:scale-95"
                }`}
                aria-label="Scroll left"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-text-primary"
                />
              </button>
              <button
                onClick={scrollRight}
                disabled={!isRightActive}
                className={`p-2 rounded-full bg-background-light transition-all duration-200 ${
                  !isRightActive
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-background-light/80 hover:shadow-md active:scale-95"
                }`}
                aria-label="Scroll right"
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-text-primary"
                />
              </button>
            </div>
          </div>

          <div
            className="overflow-x-auto scrollbar-none pb-4 relative"
            ref={scrollContainerRef}
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex gap-6 min-w-max">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="flex-none w-[280px] sm:w-[320px]"
                >
                  <Link href={`/city/${restaurant.id}`}>
                    <div className="card overflow-hidden group">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={restaurant.featured_image}
                          alt={restaurant.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div
                            className={`text-lg font-bold ${
                              getStatus(
                                restaurant.working_days,
                                restaurant.opening_time,
                                restaurant.closing_time
                              ) === "Open"
                                ? "text-white"
                                : "text-red-500"
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
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-text-primary mb-2">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-white text-xs"
                              />
                            </span>
                            <span className="font-medium">
                              {restaurant.rating}
                            </span>
                          </div>
                          <span className="text-text-secondary">•</span>
                          <span className="text-text-secondary">
                            {restaurant.delivery_time} mins
                          </span>
                        </div>
                        <div className="text-sm text-text-secondary truncate">
                          {restaurant.categories.join(", ")}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantChain;
