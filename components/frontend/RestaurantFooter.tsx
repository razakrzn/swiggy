"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useFetchDataDetails from "@/app/hooks/useFetchDataDetails";

interface RestaurantDetails {
  id: number;
  name: string;
  rating: number;
  address: string;
  outlet: string;
}
const RestaurantFooter = ({ id }: { id: string }) => {
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
      <div className="wrapper !max-w-[800px] !w-[90%] bg-[#f1f1f6]">
        <div className="px-4 pb-[120px]">
          <div className="top pb-4">
            <div className="flex items-center">
              <img
                src="/images/fssai.png"
                alt="fssai"
                className="h-[30px] w-[60px] mr-4"
              />
              <p className="pt-[6px] text-[#93959f] text-[12px]">
                License No. 11321012000029
              </p>
            </div>
          </div>
          <div className="middle">
            <p className="font-semibold border-t border-[#a9abb2] pt-4 capitalize text-[12.5px] text-[#93959f]">
              {restaurant.name}
            </p>
            <p className="text-[12.5px] text-[#93959f] font-normal">
              {restaurant.outlet}
            </p>
            <div className="flex mt-3 items-center">
              <div className="mr-2">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="xs"
                  style={{ color: "#a9abb2" }}
                />
              </div>
              <p className="text-[#a9abb2] text-[11px]">{restaurant.address}</p>
            </div>
          </div>
          <div className="bottom flex mt-6 border-t border-[#a9abb2] w-full flex-col justify-center items-center">
            <div className="mx-3 mb-3 mt-6">
              <div className="font-bold text-[12.5px]">
                For better experience, download the Swiggy app now
              </div>
            </div>
            <div className="flex">
              <a
                href="https://play.google.com/store/apps/details?id=in.swiggy.android&pcampaignid=web_share"
                target="blank"
                className="w-auto h-16 inline-block my-auto mx-3"
              >
                <img
                  src="/images/play_store.png"
                  alt="play store"
                  className="block w-full h-12 max-w-[208px] object-cover"
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/swiggy-food-instamart-dineout/id989540920"
                target="blank"
                className="w-auto h-16 inline-block my-auto mx-3"
              >
                <img
                  src="/images/app_store.png"
                  alt="app store"
                  className="block w-full h-12 max-w-[208px] object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RestaurantFooter;
