"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

type Order = {
  id: number;
  restaurant: {
    id: number;
    name: string;
  };
  total_price: string;
  status: string;
  created_at: string;
  order_items: {
    id: number;
    menu_item: {
      id: number;
      name: string;
      image: string;
      price: string;
    };
    quantity: number;
  }[];
  user: string;
};

export default function CustomerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("customer_authToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/orders/orders-create/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.results);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleRemove = async (orderId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/orders/orders-list/${orderId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the order");
      }

      // Update state to remove the order
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      alert("Order removed successfully!");
    } catch (error) {
      console.error("Error removing order:", error);
      alert("Failed to delete the order. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      {error && <p className="error-message">{error}</p>}
      <div className="p-7 pr-32">
        <div className="mb-7">
          <h4 className="heading1">Orders</h4>
        </div>
        {orders.length > 0 ? (
          <div className="flex flex-wrap -mx-2">
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <div
                  key={order.id}
                  className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"
                >
                  <div className="p-4 flex flex-col gap-4  bg-white rounded-2xl w-full">
                    <div className="flex gap-4 items-center">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden">
                        <img
                          src={
                            order.order_items[0]?.menu_item.image ||
                            "fallback-image-url.jpg"
                          }
                          alt={order.order_items[0]?.menu_item.name}
                          className="block w-full rounded-2xl "
                        />
                      </div>
                      <div className="flex flex-col items-start justify-between">
                        <div className="w-full">
                          <h6 className="font-bold capitalize text-sm">
                            {order.order_items[0]?.menu_item.name}
                          </h6>
                          <span className="text-sm text-[#6E6F76] font-medium">
                            ₹{order.total_price}
                          </span>
                        </div>
                        <span className="font-bold text-sm w-fit capitalize opacity-50">
                          {order.restaurant.name}
                        </span>
                      </div>
                    </div>
                    <>
                      <div className="flex flex-col gap-3">
                        <span className="font-bold text-sm w-fit underline-span">
                          Status
                        </span>
                        <div className="w-full flex justify-between bg-[#EBEDED] py-3 px-4 mt-3 rounded">
                          <div className="w-44">
                            <h6
                              className={`font-medium text-[13px] mb-1 ${
                                order.status === "CANCELLED"
                                  ? "text-red-500"
                                  : order.status === "COMPLETED"
                                  ? "text-green-500"
                                  : "text-black"
                              }`}
                            >
                              {order.status}
                            </h6>
                          </div>
                        </div>
                        <span>
                          {order.status === "CANCELLED" && (
                            <span>
                              <button
                                onClick={() => handleRemove(order.id)}
                                className="font-bold text-logoColor block ml-auto"
                              >
                                Remove
                              </button>
                            </span>
                          )}
                        </span>
                      </div>
                    </>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="w-56 mx-auto">
              <img src="/images/checkout.png" alt="take away image" />
            </div>
            <p className="text-[#7e808c] mt-3">No orders</p>
            <Link
              href="/restaurants"
              className="mt-7 px-5 py-3 uppercase bg-[#ff5200] cursor-pointer text-center hover:shadow-[0_4px_14px_#d4d5d9]"
            >
              <span className="text-white font-semibold inline-block text-sm w-ful h-full">
                See restaurants near you
              </span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
