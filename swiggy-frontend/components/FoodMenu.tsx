import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";

export default function FoodMenuFoodMenu() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [foodType, setFoodType] = useState<string>("Veg");
  const [prepTime, setPrepTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("Main Course");
  const [image, setImage] = useState<File | null>(null);

  // Implement the handleImageUpload function
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <>
      <div className="right px-[15px]">
        <div className="py-4 px-7 ">
          <div className="px-4 flex justify-between items-center">
            <span className="font-bold text-[22px] opacity-75">
              Add your dish
            </span>
            <img
              src="/images/image-login.png"
              alt="RestoPanel"
              className="w-[5rem]"
            />
          </div>
          <div className="px-4">
            <div className="my-3 px-4 pt-6 pb-5 rounded-3xl bg-white border border-[#d3d3d3]">
              <div className="mr-[-15px] ml-[-15px]">
                <div className="px-4 mb-3">
                  <span className="font-semibold text-[17px] opacity-75 ">
                    Food Menu Setup
                  </span>
                </div>

                <div className="px-4 pb-5">
                  <label className="block text-[14px] font-medium mb-2">
                    Food Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />

                    {/* Custom styled button */}
                    <button
                      type="button"
                      className="bg-backgroudGray text-black opacity-75 rounded-md px-4 py-2 w-full text-center"
                    >
                      <span className="mr-2 text-black opacity-75">
                        <FontAwesomeIcon icon={faUpload} />
                      </span>
                      {image ? `Uploaded: ${image.name}` : "Add your Dish"}
                    </button>
                  </div>

                  {image && (
                    <div className="mt-2 text-[13px] opacity-60">
                      Uploaded: {image.name}
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="px-4 pb-5">
                  <label className="block text-[14px] font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(e.target.value)
                    }
                    placeholder="Enter food title"
                    className="border border-gray-300 rounded-md px-2 py-1 w-full outline-logoColor"
                  />
                </div>

                {/* Price */}
                <div className="px-4 pb-5">
                  <label className="block text-[14px] font-medium mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPrice(e.target.value)
                    }
                    placeholder="Enter food price"
                    className="border border-gray-300 rounded-md px-2 py-1 w-full outline-logoColor"
                  />
                </div>

                {/* Veg or Non-Veg */}
                <div className="px-4 pb-5">
                  <label className="block text-[14px] font-medium mb-2">
                    Food Type
                  </label>
                  <div className="flex items-center space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="foodType"
                        value="Veg"
                        checked={foodType === "Veg"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFoodType(e.target.value)
                        }
                        className="peer hidden"
                      />
                      <span className="w-3 h-3 rounded-full border border-gray-400 mr-2 inline-block relative peer-checked:ring-2 peer-checked:ring-[#ff5200] peer-checked:border-[#ff5200]"></span>
                      Veg
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="foodType"
                        value="Non-Veg"
                        checked={foodType === "Non-Veg"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFoodType(e.target.value)
                        }
                        className="peer hidden"
                      />
                      <span className="w-3 h-3 rounded-full border border-gray-400 mr-2 inline-block relative peer-checked:ring-2 peer-checked:ring-[#ff5200] peer-checked:border-[#ff5200]"></span>
                      Non-Veg
                    </label>
                  </div>
                </div>

                {/* Preparation Time */}
                <div className="px-4 pb-5">
                  <label className="block text-[14px] font-medium mb-2">
                    Preparation Time (in minutes)
                  </label>
                  <input
                    type="number"
                    value={prepTime}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPrepTime(e.target.value)
                    }
                    placeholder="e.g., 30"
                    className="border border-gray-300 rounded-md px-2 py-1 w-full outline-logoColor"
                  />
                </div>

                {/* Description */}
                <div className="px-4 pb-5">
                  <label className="block text-[14px] font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setDescription(e.target.value)
                    }
                    placeholder="Optional description"
                    rows={3}
                    className="border border-gray-300 rounded-md px-2 py-1 w-full outline-logoColor"
                  ></textarea>
                </div>

                {/* Category */}
                <div className="px-4 pb-5">
                  <label className="block text-[14px] font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCategory(e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 w-full outline-logoColor"
                  >
                    <option value="Main Course">Main Course</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
