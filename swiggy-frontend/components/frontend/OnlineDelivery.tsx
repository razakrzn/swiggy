"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
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

const OnlineDelivery = () => {
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
        <div>
          <div>
            <h2 className="font-bold text-[22px]">
              Restaurants with online food delivery in Kozhikode
            </h2>
            <div className="h-[16px]"></div>
          </div>
        </div>
        <div className="h-[44px] w-full">
          <div className="flex cursor-pointer">
            <div className="mr-[8px]">
              <div className="rounded-[18px] bg-white border border-[rgba(2,6,12,0.15)] p-[9px] px-[12px] inline-flex items-center w-max gap-[8px] shadow-[0px_2px_12px_rgba(2,6,12,0.04)] transition ease-in duration-100">
                <div className="filter-fonts">Filter</div>
                <div className="flex iterms-center">
                  <i className="fas fa-sliders-h text-[14px]"></i>
                </div>
              </div>
            </div>
            <div className="mr-[8px]">
              <div className="rounded-[18px] bg-white border border-[rgba(2,6,12,0.15)] p-[9px] px-[12px] inline-flex items-center w-max gap-[8px] shadow-[0px_2px_12px_rgba(2,6,12,0.04)] transition ease-in duration-100">
                <div className="filter-fonts">Sort By</div>
                <div className="mt-[1px] mr-[2px] ml-auto flex">
                  <i className="fa-solid fa-chevron-down text-[rgba(2,6,12,0.7)] text-[11px]"></i>
                </div>
              </div>
            </div>
            <div className="mr-[8px]">
              <div className="rounded-[18px] bg-white border border-[rgba(2,6,12,0.15)] p-[9px] px-[12px] inline-flex items-center w-max gap-[8px] shadow-[0px_2px_12px_rgba(2,6,12,0.04)] transition ease-in duration-100">
                <div className="filter-fonts">Fast Delivery</div>
              </div>
            </div>
            <div className="mr-[8px]">
              <div className="rounded-[18px] bg-white border border-[rgba(2,6,12,0.15)] p-[9px] px-[12px] inline-flex items-center w-max gap-[8px] shadow-[0px_2px_12px_rgba(2,6,12,0.04)] transition ease-in duration-100">
                <div className="filter-fonts">Rating 4.0+</div>
              </div>
            </div>
            <div className="mr-[8px]">
              <div className="rounded-[18px] bg-white border border-[rgba(2,6,12,0.15)] p-[9px] px-[12px] inline-flex items-center w-max gap-[8px] shadow-[0px_2px_12px_rgba(2,6,12,0.04)] transition ease-in duration-100">
                <div className="filter-fonts">Pure Veg</div>
              </div>
            </div>
            <div className="mr-[8px]">
              <div className="rounded-[18px] bg-white border border-[rgba(2,6,12,0.15)] p-[9px] px-[12px] inline-flex items-center w-max gap-[8px] shadow-[0px_2px_12px_rgba(2,6,12,0.04)] transition ease-in duration-100">
                <div className="filter-fonts">Offers</div>
              </div>
            </div>
            <div className="mr-[8px]">
              <div className="rounded-[18px] bg-white border border-[rgba(2,6,12,0.15)] p-[9px] px-[12px] inline-flex items-center w-max gap-[8px] shadow-[0px_2px_12px_rgba(2,6,12,0.04)] transition ease-in duration-100">
                <div className="filter-fonts">Rs. 300-Rs. 600</div>
              </div>
            </div>
            <div className="mr-[8px]">
              <div className="rounded-[18px] bg-white border border-[rgba(2,6,12,0.15)] p-[9px] px-[12px] inline-flex items-center w-max gap-[8px] shadow-[0px_2px_12px_rgba(2,6,12,0.04)] transition ease-in duration-100">
                <div className="filter-fonts">Less than Rs. 300</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-0 list-none grid items-start grid-cols-4 gap-8 my-8">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="item">
              <div>
                <Link href={`/city/${restaurant.id}`}>
                  <div className="image w-[238px] h-[158px]">
                    <div className="w-full h-full relative rounded-lg overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.1)]">
                      <div className="w-full h-full ">
                        <img
                          className="w-full h-full object-cover"
                          src={restaurant.featured_image}
                          alt={restaurant.name}
                        />
                      </div>
                      <div className="absolute bottom-0 uppercase px-[12px] pb-[8px] h-[81px] bg-gradient-to-b from-[rgba(27,30,36,0)] to-[#1b1e24] grid content-end text-left w-full">
                        <div className="font-bold text-white text-[18px] tracking-tighter">
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
                    {truncateText(restaurant.categories.join(", "), 30)}
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
    </>
  );
};

export default OnlineDelivery;
