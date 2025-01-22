"use client";
import { useOwnerAuth } from "@/contexts/OwnerAuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Owner {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface RestaurantInfo {
  id: string;
  name: string;
  address: string;
  owner_name: Owner;
  location: string;
  outlet: string;
  email: string;
  phone_number: string;
  working_days: [];
  categories: string[];
  opening_time: string;
  closing_time: string;
  delivery_time: string;
  featured_image: string;
}

export default function account() {
  const { user, setUser, logout } = useOwnerAuth();
  const [restaurant, setRestaurant] = useState<RestaurantInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleSignOut = () => {
    setUser(null);
    logout();
  };

  useEffect(() => {
    if (!user || !user.restaurantIds) {
      router.push("/partner-login");
      return;
    }

    const restaurantId = user.restaurantIds;

    const fetchRestaurantData = async () => {
      setLoading(true);
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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [user]);

  // Loading, error, and no restaurant state handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurant) return <p>No details available</p>;

  return (
    <main>
      <div className="p-7 pr-20">
        <div className="mb-7">
          <h4 className="heading1">Account Information</h4>
        </div>
        <div className="flex gap-7">
          <div className="p-4 flex flex-col gap-4  bg-white rounded-2xl w-full">
            <div className="flex gap-10 items-center">
              <div className="w-28 h-28 rounded-2xl overflow-hidden">
                <img
                  src={restaurant.featured_image}
                  alt={restaurant.name}
                  className="block w-full rounded-2xl "
                />
              </div>
              <div className="">
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-xl">{restaurant.name}</h2>
                  <p className="font-normal text-sm text-[#7E8A8C]">
                    {restaurant.email}
                  </p>
                  <h6>{restaurant.address}</h6>
                </div>
              </div>
            </div>
            <div className="max-w-2xl w-full mx-auto flex py-7 flex-col">
              <div className="w-full border-b py-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Owner Name</h5>
                  <p className="text-[#6E6F76] capitalize">
                    {user?.username || "N/A"}
                  </p>
                </div>
              </div>
              <div className="w-full border-b py-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Restaurant Outlet</h5>
                  <p className="text-[#6E6F76]">{restaurant.outlet}</p>
                </div>
              </div>
              <div className="w-full border-b py-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Location</h5>
                  <p className="text-[#6E6F76]">{restaurant.location}</p>
                </div>
              </div>
              <div className="w-full border-b py-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Email</h5>
                  <p className="text-[#6E6F76]">{restaurant.email}</p>
                </div>
              </div>
              <div className="w-full border-b py-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Phone Number</h5>
                  <p className="text-[#6E6F76]">{restaurant.phone_number}</p>
                </div>
              </div>
              <div className="w-full border-b py-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Working Days</h5>
                  <p className="text-[#6E6F76]">{restaurant.working_days}</p>
                </div>
              </div>
              <div className="w-full border-b py-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Categories of Foods</h5>
                  <p className="text-[#6E6F76]">
                    {truncateText(restaurant.categories.join(", "), 35)}
                  </p>
                </div>
              </div>
              <div className="w-full border-b py-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Opening Time</h5>
                  <p className="text-[#6E6F76]">{restaurant.opening_time}</p>
                </div>
              </div>
              <div className="w-full border-b py-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Closing Time</h5>
                  <p className="text-[#6E6F76]">{restaurant.closing_time}</p>
                </div>
              </div>
              <div className="w-full border-b py-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Delivery Time</h5>
                  <p className="text-[#6E6F76] capitalize">
                    {restaurant.delivery_time} min
                  </p>
                </div>
              </div>
              <div className="flex items-center pt-10">
                {user && (
                  <div className="flex gap-8 ml-auto">
                    <button
                      onClick={handleSignOut}
                      className="py-4 px-8 flex items-center justify-center text-white font-extrabold text-sm bg-black rounded-[15px]"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
