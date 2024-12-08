"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useScroll } from "@/app/hooks/useScroll";
import useFetchDataDetails from "@/app/hooks/useFetchDataDetails";

interface RestaurantDetails {
  id: number;
  name: string;
  rating: number;
  delivery_time: string;
  categories: string[];
  outlet: string;
}

const OrderSection = ({ id }: { id: string }) => {
  const {
    scrollContainerRef,
    isLeftActive,
    isRightActive,
    scrollRight,
    scrollLeft,
  } = useScroll();

  const {
    data: restaurant,
    loading,
    error,
  } = useFetchDataDetails<RestaurantDetails>(
    `http://127.0.0.1:8000/api/v1/restaurants/${id}/`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurant) return <p>No details available</p>;

  return (
    <>
      <div className="wrapper !max-w-[800px] !w-[90%]">
        <div className="my-[16px]">
          <span>
            <Link
              href="/"
              className="mx-[5px] inline-block text-[10px] text-[#93959f]"
            >
              <span>Home</span>
            </Link>
          </span>
          <span className="after:content-['/'] after:text-[#93959f] after:text-[10px]"></span>
          <span>
            <Link
              href="/city"
              className="mx-[5px] inline-block text-[10px] text-[#93959f]"
            >
              <span>Location</span>
            </Link>
          </span>
          <span className="after:content-['/'] after:text-[#93959f] after:text-[10px]"></span>
          <span className="mx-[5px] inline-block text-[10px] text-[#000000]">
            {restaurant.name}
          </span>
        </div>
        <div className="ml-[16px] mb-[8px] inline-block">
          <h1 className="font-[700] text-[24px] my-[16px] inline-block capitalize">
            {restaurant.name}
          </h1>
        </div>
        <div className="px-[16px] pb-[16px] rounded-bl-[36px] rounded-br-[36px] bg-custom-gradient">
          <div
            className="rounded-[20px] border bg-white"
            style={{
              borderColor: "rgba(2, 6, 12, 0.15)",
              boxShadow: "rgba(0, 0, 0, 0.04) 0px 8px 16px 0px",
            }}
          >
            <div className="mb-[20px]"></div>
            <div className="flex items-center mx-[16px]">
              <div className="mr-1 ">
                <span className="w-[20px] h-[20px] bg-[#1e933c] rounded-full p-[2px] inline-flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-white text-[10px]"
                  />
                </span>
              </div>
              <div className="font-[600] text-[15px]">
                {restaurant.rating} ( ratings)
              </div>
              <div className="h-1 mx-[8px] font-[500] text-[22px] opacity-[0.45] flex items-center pb-2">
                .
              </div>
              <div className="font-[600] text-[15px]">₹399 for two</div>
            </div>
            <div className="flex items-center my-[8px] mx-[20]">
              <Link href="/">
                <div className="underline text-[#ff5200] font-bold text-[14px]">
                  {restaurant.categories.join(", ")}
                </div>
              </Link>
            </div>
            <div className="flex mx-[20px] py-1 items-center">
              <div className="flex flex-col items-center">
                <div className="w-[7px] h-[7px] rounded-full bg-[#c4c4c4]"></div>
                <div className="w-[1px] h-[23px] bg-[#c4c4c4]"></div>
                <div className="w-[7px] h-[7px] rounded-full bg-[#c4c4c4]"></div>
              </div>
              <div className="ml-[12px] flex flex-col pr-4 w-full justify-center">
                <div className="flex">
                  <div className="font-bold text-[13px] opacity-95">outlet</div>
                  <div className="ml-3 font-normal text-sm opacity-60">
                    {restaurant.outlet}
                  </div>
                </div>
                <div className="mt-1 font-bold text-[13px] opacity-95">
                  {restaurant.delivery_time} min
                </div>
              </div>
            </div>
            <div className="mt-4"></div>
          </div>
        </div>
        <div>
          <div className="m-4 cursor-pointer relative">
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
            <div className="my-4 inline-block">
              <div>
                <h2 className="font-bold text-[20px]">Deals for you</h2>
              </div>
            </div>
          </div>
          <div
            className="overflow-scroll overflow-hidden custom-scroll"
            ref={scrollContainerRef}
          >
            <div className="row flex">
              <div className="pr-4">
                <div className="">
                  <div className="p-3 flex w-[328px] rounded-[20px] border">
                    <div>
                      <div className="flex">
                        <div className="h-12 w-12">
                          <img src="/images/generic.png" alt="" />
                        </div>
                        <div className="flex flex-col ml-3 gap-[2px] justify-center">
                          <div className="font-extrabold overflow-hidden">
                            Free Mayonnaise
                          </div>
                          <div className="font-bold text-xs opacity-40">
                            NO CODE REQUIRED
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pr-4">
                <div className="">
                  <div className="p-3 flex w-[328px] rounded-[20px] border">
                    <div>
                      <div className="flex">
                        <div className="h-12 w-12">
                          <img src="/images/generic.png" alt="" />
                        </div>
                        <div className="flex flex-col ml-3 gap-[2px] justify-center">
                          <div className="font-extrabold overflow-hidden">
                            Free Mayonnaise
                          </div>
                          <div className="font-bold text-xs opacity-40">
                            NO CODE REQUIRED
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pr-4">
                <div className="">
                  <div className="p-3 flex w-[328px] rounded-[20px] border">
                    <div>
                      <div className="flex">
                        <div className="h-12 w-12">
                          <img src="/images/generic.png" alt="" />
                        </div>
                        <div className="flex flex-col ml-3 gap-[2px] justify-center">
                          <div className="font-extrabold overflow-hidden">
                            Free Mayonnaise
                          </div>
                          <div className="font-bold text-xs opacity-40">
                            NO CODE REQUIRED
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderSection;
