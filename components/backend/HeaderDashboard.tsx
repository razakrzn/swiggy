"use client";

import { useOwnerAuth } from "@/contexts/OwnerAuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RestaurantInfo {
  name: string;
}

const HeaderDashboard = () => {
  const { user } = useOwnerAuth();
  const [restaurant, setRestaurant] = useState<RestaurantInfo | null>(null);

  useEffect(() => {
    if (!user || !user.restaurantIds) {
      return;
    }

    const restaurantId = user.restaurantIds;

    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/restaurants/${restaurantId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant details");
        }
        const data = await response.json();

        if (data && typeof data.data === "number") {
          const detailedResponse = await fetch(
            `http://127.0.0.1:8000/api/v1/restaurants/details/${data.data}/`
          );
          if (!detailedResponse.ok) {
            throw new Error("Failed to fetch detailed restaurant information");
          }
          const detailedData = await detailedResponse.json();
          setRestaurant(detailedData.data);
        } else {
          setRestaurant(data.data);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        console.error("Error fetching restaurant data:", errorMessage);
      }
    };

    fetchRestaurantData();
  }, [user]);

  return (
    <>
      <header>
        <div className="flex justify-between items-center py-4 px-20 shadow-custom bg-white">
          <div className="left flex items-center">
            <div className="logo w-5 py-[5px]">
              <Link href="/dashboard" className="">
                <img
                  src="/images/swiggy-logo2.svg"
                  alt="swiggy logo"
                  className="block w-full"
                />
              </Link>
            </div>
            <span className="text-[15px] text-[#02060C] font-semibold capitalize inline-block ml-[6px]">
              swiggy
            </span>
            <span className="text-[14px] text-[#02060C] inline-block ml-1">
              for {restaurant?.name}
            </span>
          </div>
          <div className="flex items-center">
            <div className="right px-8">
              <span className="opacity-75 text-[15px] font-semibold">FAQs</span>
            </div>
            {user ? (
              <div className="flex gap-8">
                <Link
                  href="/dashboard/account"
                  className="text-[14px] font-semibold hover:text-logoColor flex items-center"
                >
                  <span className="inline-block w-[19px] mr-[10px]">
                    <img
                      className="block w-full"
                      src="/images/signIn.svg"
                      alt="user icon"
                    />
                  </span>
                  <span className="text-[14px] font-semibold capitalize">
                    {user.username}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                href="/partner-login"
                className="hover:text-logoColor flex items-center"
              >
                <span className="inline-block w-[19px] mr-[10px]">
                  <img
                    className="block w-full"
                    src="/images/signIn.svg"
                    alt="sign-in icon"
                  />
                </span>
                <span className="text-[14px] font-semibold">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
export default HeaderDashboard;
