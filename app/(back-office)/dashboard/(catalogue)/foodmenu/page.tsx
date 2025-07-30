"use client";

import AddingFoodMenu from "@/components/backend/AddingFoodMenu";
import { useOwnerAuth } from "@/contexts/OwnerAuthContext";
import {
  faChevronDown,
  faChevronUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface FoodMenu {
  id: number;
  categories: string[];
  image: string;
  name: string;
  restaurant: string;
  restaurantName?: string;
  description: string;
  price: number;
  food_type: string;
  rating: string;
}

export default function FoodMenu() {
  const { user } = useOwnerAuth();
  const [menu, setMenu] = useState<FoodMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState<number | null>(null);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  useEffect(() => {
    if (!user || !user.restaurantIds) {
      return;
    }

    const restaurantId = user.restaurantIds;

    // Fetch the restaurant data
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
        const restaurantData = data.data;

        if (restaurantData?.food_menu) {
          setMenu(restaurantData.food_menu);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [user]); // Re-run the effect when `user` changes

  // Loading, error, and no restaurant state handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!menu) return <p>No details available</p>;

  const toggleDetails = (id: number) => {
    setVisibleDetails((prev) => (prev === id ? null : id));
  };
  return (
    <main>
      <div className="p-7 pr-20">
        <div className="mb-7 flex justify-between items-center">
          <h4 className="heading1">Food Menu</h4>
          <div className="p-2 rounded bg-[#EDEDF0]">
            <button onClick={() => setLocationModalVisible(true)}>
              <span className="font-medium mr-2">Add</span>
              <span className="icon">
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
          </div>
        </div>
        <div className="flex gap-7 flex-wrap">
          {menu.map((item) => (
            <div
              key={item.id}
              className="w-full"
              style={{ width: "calc((100% - 5rem) / 3)" }}
            >
              <div className="p-4 flex flex-col gap-4  bg-white rounded-2xl">
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full rounded-2xl h-full"
                    />
                  </div>
                  <div className="flex flex-col items-start w-[170px]">
                    <span className="font-bold">{item.name}</span>
                    <span className="text-sm text-[#6E6F76] font-medium">
                      ₹{item.price}
                    </span>
                    <div className="w-full flex justify-between mt-3">
                      <button className="font-bold text-logoColor ">
                        Remove
                      </button>
                      <button onClick={() => toggleDetails(item.id)}>
                        {visibleDetails === item.id ? (
                          <FontAwesomeIcon
                            icon={faChevronUp}
                            size="2xs"
                            className="w-[13px] text-[#7E8A8C]"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            size="2xs"
                            className="w-[13px] text-[#7E8A8C]"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {visibleDetails === item.id && (
                  <div className="flex flex-col">
                    <div className="">
                      <div className="py-2">
                        <span className="title">Category</span>
                      </div>
                      <div className="bg-[#EDEDF0] rounded px-4 py-3">
                        <span className="content">
                          {truncateText(item.categories.join(", "), 30)}
                        </span>
                      </div>
                    </div>
                    <div className="">
                      <div className="py-2">
                        <span className="title">Food Type</span>
                      </div>
                      <div className="bg-[#EDEDF0] rounded px-4 py-3">
                        <span className="content capitalize">
                          {item.food_type}
                        </span>
                      </div>
                    </div>
                    <div className="">
                      <div className="py-2">
                        <span className="title">Rating</span>
                      </div>
                      <div className="bg-[#EDEDF0] rounded px-4 py-3">
                        <span className="content">{item.rating}</span>
                      </div>
                    </div>
                    <div className="">
                      <div className="py-2">
                        <span className="title">Description</span>
                      </div>
                      <div className="bg-[#EDEDF0] rounded px-4 py-3">
                        <span className="content text-sm text-[#6E6F76]">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddingFoodMenu
        isVisible={isLocationModalVisible}
        onClose={() => setLocationModalVisible(false)}
      />
    </main>
  );
}
