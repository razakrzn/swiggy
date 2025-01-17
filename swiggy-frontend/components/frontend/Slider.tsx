"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useScroll } from "@/app/hooks/useScroll";
import { useEffect, useState } from "react";
import { useFetchData } from "@/app/hooks/useFetchData";

interface Collection {
  id: string;
  name: string;
  collection_image: string;
}

const Slider = () => {
  const {
    scrollContainerRef,
    isLeftActive,
    isRightActive,
    scrollRight,
    scrollLeft,
  } = useScroll();

  const {
    data: collections,
    loading,
    error,
  } = useFetchData<Collection>(
    `http://localhost:8000/api/v1/restaurants/collections/`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="wrapper !w-[75%]">
        <div className="relative">
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
        </div>
        <div className="p-[16px]">
          <div>
            <h2 className="font-bold text-[22px]">What's on your mind?</h2>
          </div>
        </div>
        <div
          className="items flex overflow-scroll scrollbar-none"
          ref={scrollContainerRef}
        >
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="first:pl-[16px] pr-[24px] last:pr-[16px]"
            >
              <a href="/">
                <div className="image w-[144px] h-[180px]">
                  <img
                    src={collection.collection_image}
                    alt={collection.name}
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
        <hr className="border-b border-customBorder my-8 mx-5" />
      </div>
    </>
  );
};

export default Slider;
