"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
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

const OnlineDelivery: React.FC<RestauratChainProps> = ({
  selectedLocation,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const isWorkingDay = (working_days: string[]): boolean => {
    if (!Array.isArray(working_days) || !currentTime) {
      return false;
    }

    const currentDay = currentTime
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
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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

      setFilteredRestaurants(filtered); // Assuming you're updating the filtered list here
    } else {
      // If no location is selected, show all restaurants
      setRestaurants(restaurants);
    }
  }, [selectedLocation, restaurants]);

  const filterButtons = [
    { id: "fast-delivery", label: "Fast Delivery" },
    { id: "rating", label: "Rating 4.0+" },
    { id: "veg", label: "Pure Veg" },
    { id: "offers", label: "Offers" },
    { id: "price-300-600", label: "Rs. 300-Rs. 600" },
    { id: "price-less-300", label: "Less than Rs. 300" },
  ];

  return (
    <div className="wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[80px]">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredRestaurants.length > 0 ? (
        <div className="space-y-6">
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Top fastest delivery restaurants in{" "}
              {filteredRestaurants[0].location}
            </h2>
          </div>

          {/* Filters Section */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-3 min-w-max">
              <div className="flex items-center rounded-full bg-white border border-border-color px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <span className="text-sm font-medium text-text-secondary">
                  Filter
                </span>
                <i className="fas fa-sliders-h text-sm ml-2 text-text-secondary"></i>
              </div>
              <div className="flex items-center rounded-full bg-white border border-border-color px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <span className="text-sm font-medium text-text-secondary">
                  Sort By
                </span>
                <i className="fas fa-chevron-down text-xs ml-2 text-text-secondary"></i>
              </div>
              {filterButtons.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() =>
                    setActiveFilter(
                      activeFilter === filter.id ? null : filter.id
                    )
                  }
                  className={`flex items-center rounded-full px-4 py-2 transition-all duration-200 ${
                    activeFilter === filter.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-white border border-border-color text-text-secondary hover:shadow-md"
                  }`}
                >
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Restaurants Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link href={`/city/${restaurant.id}`}>
                  <div className="relative aspect-[3/2]">
                    <img
                      className="w-full h-full object-cover"
                      src={restaurant.featured_image}
                      alt={restaurant.name}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
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
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center bg-accent text-white rounded-full px-2 py-1">
                      <FontAwesomeIcon icon={faStar} className="text-xs mr-1" />
                      <span className="text-sm font-medium">
                        {restaurant.rating}
                      </span>
                    </div>
                    <span className="text-text-secondary">•</span>
                    <span className="text-sm text-text-secondary">
                      {restaurant.delivery_time} mins
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p
                      className="text-sm text-text-secondary truncate"
                      title={restaurant.categories.join(", ")}
                    >
                      {restaurant.categories.join(", ")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {restaurant.outlet}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-text-primary">
            No restaurants found in this location
          </h3>
          <p className="text-text-secondary mt-2">
            Try changing your location or check back later
          </p>
        </div>
      )}
    </div>
  );
};

export default OnlineDelivery;
