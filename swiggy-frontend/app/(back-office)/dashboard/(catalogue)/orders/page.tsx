"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type Order = {
  id: number;
  restaurant: {
    id: number;
    name: string;
  };
  total_price: string;
  status: string;
  customer_location: string;
  customer_phone: string;
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
  [key: string]: any;
};

interface OrdersResponse {
  results: Order[];
}

export default function Orders() {
  const token = Cookies.get("owner_authToken");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleDetails, setVisibleDetails] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("pending");

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/orders/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get<OrdersResponse>(
          "restaurant-orders/"
        );
        setOrders(response.data.results);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const updateOrderStatus = async (
    orderId: number,
    newStatus: string
  ): Promise<void> => {
    try {
      const response = await axiosInstance.patch(`orders-list/${orderId}/`, {
        status: newStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error: any) {
      console.error(
        "Error updating order status:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status.toLowerCase() === statusFilter);

  const toggleDetails = (id: number) => {
    setVisibleDetails((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <main>
      <div className="p-7 pr-20">
        <div className="mb-7">
          <h4 className="heading1">Orders</h4>
        </div>
        <div className="flex flex-wrap -mx-2">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"
              >
                <div className="p-4 flex flex-col gap-4 bg-white rounded-2xl mb-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden">
                      <img
                        src={
                          order.order_items[0]?.menu_item.image ||
                          "fallback-image-url.jpg"
                        }
                        alt="food item"
                        className="block w-full rounded-2xl "
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold">
                        {order.order_items[0]?.menu_item.name}
                      </span>
                      <span className="text-sm text-[#6E6F76] font-medium">
                        {order.user}
                      </span>
                      <button
                        onClick={() => toggleDetails(order.id)}
                        className="font-bold text-logoColor mt-3"
                      >
                        {/* Show Details */}
                        {visibleDetails === order.id
                          ? "Hide Details"
                          : "Show Details"}
                      </button>
                    </div>
                  </div>
                  {visibleDetails === order.id && (
                    <>
                      <div className="flex flex-col gap-3">
                        <span className="font-bold text-sm w-fit underline-span">
                          Order Information
                        </span>
                        <div className="">
                          <div className="py-3 flex justify-between border-b-[.5px] border-[#EBEDED]">
                            <span className="text-[#6E6F76] text-sm font-medium">
                              Customer Phone
                            </span>
                            <span className="text-sm text-[#6E6F76]">
                              {order.customer_phone}
                            </span>
                          </div>
                          <div className="py-3 flex justify-between border-b-[.5px] border-[#EBEDED]">
                            <span className="text-[#6E6F76] text-sm font-medium">
                              Customer Location
                            </span>
                            <span className="text-sm text-[#6E6F76]">
                              {truncateText(order.customer_location, 20)}
                            </span>
                          </div>
                          <div className="py-3 flex justify-between border-b-[.5px] border-[#EBEDED]">
                            <span className="text-[#6E6F76] text-sm font-medium">
                              Total Price
                            </span>
                            <span className="text-sm text-[#6E6F76]">
                              ₹{order.total_price}
                            </span>
                          </div>
                          <div className="py-3 flex justify-between border-b-[.5px] border-[#EBEDED]">
                            <span className="text-[#6E6F76] text-sm font-medium">
                              Created At
                            </span>
                            <span className="text-sm text-[#6E6F76]">
                              {new Date(order.created_at).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                          <div className="py-3 flex justify-between border-b-[.5px] border-[#EBEDED]">
                            <span className="text-[#6E6F76] text-sm font-medium">
                              Status
                            </span>
                            <span className="text-sm text-[#6E6F76]">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="font-bold text-sm w-fit underline-span">
                            Update Status
                          </span>
                          <div className="w-full bg-[#EBEDED] py-3 px-4 rounded mt-6">
                            <span className="block text-[#193238] text-sm font-medium mb-2">
                              {order.status}
                            </span>
                            <div className="flex justify-between">
                              <div className="w-full">
                                <small className="text-[13px] text-[#7E8A8C]">
                                  Select the current status of the order
                                </small>
                              </div>
                              <div className="">
                                <select
                                  value={statusFilter}
                                  onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                  }
                                  className="w-full text-[12px] text-[#7E8A8C] leading-5 bg-[#EBEDED] border-none focus:outline-none cursor-pointer"
                                >
                                  <option></option>
                                  <option value="PENDING">Pending</option>
                                  <option value="PROCESSING">Processing</option>
                                  <option value="COMPLETED">Completed</option>
                                  <option value="CANCELLED">Cancelled</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, selectedStatus)
                            }
                            className="w-full h-full font-medium text-sm text-white bg-logoColor px-5 py-3 rounded mt-3"
                          >
                            Update Status
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="w-56 mx-auto">
                <img src="/images/checkout.png" alt="take away image" />
              </div>
              <p className="text-[#7e808c] mt-4">No orders</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
