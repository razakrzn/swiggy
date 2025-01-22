"use client";

import { useOwnerAuth } from "@/contexts/OwnerAuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Select from "react-select";

interface Category {
  id: number;
  name: string;
}

interface Location {
  id: number;
  name: string;
}

interface RestaurantFormProps {
  owner_name: number;
  name: string;
  featured_image: File | null;
  rating?: number;
  outlet?: string;
  location: number[];
  email: string;
  address: string;
  phone_number: string;
  working_days: string[];
  opening_time: string;
  closing_time: string;
  offer_text?: string;
  delivery_time?: string;
  categories: number[];
}

export default function AddingDetails() {
  const { user } = useOwnerAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState<RestaurantFormProps>({
    owner_name: 0,
    name: "",
    featured_image: null,
    rating: 4.2,
    outlet: "",
    location: [],
    email: "",
    address: "",
    phone_number: "",
    working_days: [],
    opening_time: "",
    closing_time: "",
    offer_text: "",
    delivery_time: "",
    categories: [],
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    if (user?.id) {
      setFormData((prevData) => ({
        ...prevData,
        owner_name: user.id,
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/categories/"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch("http://localhost:8000/api/v1/locations/");
      const data = await response.json();
      console.log(data);
      setLocations(data);
    };

    fetchLocations();
  }, []);

  const locationOptions = locations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  const handleLocationSelect = (selectedOptions: any) => {
    const selectedLocationIds = selectedOptions.map(
      (option: any) => option.value
    );
    setFormData((prevData) => ({
      ...prevData,
      location: selectedLocationIds,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => parseInt(option.value, 10) // Convert to integer explicitly
    );
    setFormData((prevData) => ({
      ...prevData,
      categories: selectedCategories, // Store as integer array
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        featured_image: files[0],
      }));
    }
  };

  const handleWorkingDaysChange = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      working_days: prev.working_days.includes(day)
        ? prev.working_days.filter((d) => d !== day)
        : [...prev.working_days, day],
    }));
  };

  useEffect(() => {
    const token = Cookies.get("owner_authToken");
    if (!token) {
      alert("You need to be logged in for adding details");
      router.push("/partner-login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();

    // Add featured image
    if (formData.featured_image) {
      data.append("featured_image", formData.featured_image as File);
    }

    // Add working_days as a stringified array
    data.append("working_days", JSON.stringify(daysOfWeek));

    // Add categories as individual entries
    formData.categories.forEach((categoryId) => {
      if (typeof categoryId === "number" || typeof categoryId === "string") {
        data.append("categories", categoryId.toString());
      } else {
        console.error("Invalid category ID:", categoryId);
      }
    });

    // console.log("Selected Categories:", formData.categories);

    // Add other form data
    Object.entries(formData).forEach(([key, value]) => {
      if (
        key !== "working_days" &&
        key !== "categories" &&
        key !== "featured_image"
      ) {
        data.append(key, value as string);
      }
    });

    // console.log("Data to be sent:", formData);

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/restaurants/",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        alert("Restaurant created successfully!");
        router.push("/dashboard");
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert("Failed to create restaurant.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <section className="bg-[#F0F0F5]">
        <div className="wrapper !w-[50%] py-8">
          <div className="flex">
            <div className="flex-1">
              <div className="right px-[15px]">
                <div className="py-4 px-7">
                  <div className="px-4 flex justify-between">
                    <span className="font-bold text-[22px] opacity-75">
                      Restaurant Information
                    </span>
                    <img
                      src="/images/RestoPanel.svg"
                      alt="RestoPanel"
                      className="w-[3.4rem]"
                    />
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="my-3 px-4 pt-6 pb-5 rounded-3xl bg-white border border-[#d3d3d3]">
                      <div className="relative border border-dotted py-8 flex flex-col gap-1 items-center rounded-2xl w-full">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          required
                        />
                        <img
                          src="/images/add-food.svg"
                          alt="Upload Icon"
                          className="w-5 h-5"
                        />
                        <label className="font-medium">Add your dishes</label>
                      </div>
                      <div className="">
                        <div className="flex justify-between text-[15px]">
                          <input
                            type="text"
                            name="name"
                            placeholder="restaurant name *"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
                          />
                        </div>
                      </div>
                      <div className="">
                        <div className="flex justify-between text-[15px]">
                          <input
                            type="text"
                            name="outlet"
                            placeholder="outlet *"
                            value={formData.outlet}
                            onChange={handleChange}
                            className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
                          />
                        </div>
                      </div>
                      <div className="">
                        <div className="flex justify-between text-[15px]">
                          <input
                            type="text"
                            name="offer_text"
                            placeholder="offer text *"
                            value={formData.offer_text}
                            onChange={handleChange}
                            className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <label
                          htmlFor="location"
                          className="font-semibold text-[17px] opacity-75"
                        >
                          Select Location:
                        </label>
                        <Select
                          id="location"
                          isMulti
                          options={locationOptions}
                          value={locationOptions.filter((option) =>
                            formData.location.includes(option.value)
                          )}
                          onChange={handleLocationSelect}
                          placeholder="Search and select locations"
                          className="w-full"
                          classNamePrefix="select-container"
                        />
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <label
                          htmlFor="categories"
                          className="font-semibold text-[17px] opacity-75"
                        >
                          Select Categories:
                        </label>
                        <select
                          id="categories"
                          multiple
                          value={formData.categories.map(String)}
                          onChange={handleCategoryChange}
                          className="inline-block border-[1.5px] rounded-tr-none rounded-br-none w-full rounded-[16px] p-3 mt-2 outline-logoColor"
                        >
                          {categories.map((category) => (
                            <option
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Owner Contact Details */}
                    <div className="my-3 px-4 pt-6 pb-5 rounded-3xl bg-white border border-[#d3d3d3]">
                      <span className="font-semibold text-[17px] opacity-75">
                        Owner Contact Details
                      </span>
                      <p className="text-[13px] opacity-45 mb-5">
                        To get updates on payments, customer complaints, order
                        acceptance, etc.
                      </p>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email Address *"
                        className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
                      />
                      <div>
                        <textarea
                          name="address"
                          value={formData.address}
                          placeholder="Address *"
                          onChange={handleChange}
                          required
                          className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
                        />
                      </div>
                      <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                        placeholder="Mobile Number *"
                        className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
                      />
                    </div>

                    {/* Working Days */}
                    <div className="my-3 px-4 pt-6 pb-5 rounded-3xl bg-white border border-[#d3d3d3]">
                      <div className="flex justify-between">
                        <span className="font-semibold text-[17px] opacity-75">
                          Working Days
                        </span>
                        {/* <span
                className="cursor-pointer font-semibold text-logoColor"
                onClick={handleSelectAll}
              >
                {selectedDays.length === daysOfWeek.length
                  ? "Deselect All"
                  : "Select All"}
              </span> */}
                      </div>
                      <div className="mt-[15px] flex flex-wrap">
                        {daysOfWeek.map((day) => (
                          <div
                            key={day}
                            className="flex items-center mb-2 mr-[30px] w-[30%]"
                          >
                            <input
                              type="checkbox"
                              id={day}
                              checked={formData.working_days.includes(day)}
                              onChange={() => handleWorkingDaysChange(day)}
                              className="mr-2 w-[15px] h-[15px] border-2 border-[rgba(2,6,12,0.15)] outline-none"
                            />
                            <label
                              htmlFor={day}
                              className="text-[13px] opacity-60 font-medium"
                            >
                              {day}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Open and Close Time */}
                    <div className="my-3 px-4 pt-6 pb-5 rounded-3xl bg-white border border-[#d3d3d3]">
                      <span className="font-semibold text-[17px] opacity-75 mb-1">
                        Opening & Closing Time
                      </span>
                      <div className="flex justify-between mt-2">
                        <div className="mb-2 border px-8 py-4">
                          <label className="block text-[14px] font-medium mb-2">
                            Open Time
                          </label>
                          <input
                            type="time"
                            name="opening_time"
                            value={formData.opening_time}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-2 py-1 w-full outline-none"
                          />
                        </div>
                        <div className="mb-2 border px-8 py-4">
                          <label className="block text-[14px] font-medium mb-2">
                            Close Time
                          </label>
                          <input
                            type="time"
                            name="closing_time"
                            value={formData.closing_time}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-2 py-1 w-full"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div className="mb-2 py-4">
                          <label className="block text-[14px] font-medium mb-2">
                            Delivery Time
                          </label>
                          <input
                            type="text"
                            name="delivery_time"
                            value={formData.delivery_time}
                            onChange={handleChange}
                            className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
                          />
                        </div>
                      </div>
                      <p className="bg-backgroudGray font-normal text-[13px] opacity-60 rounded-[16px] px-4 py-3">
                        Longer operational timings ensure you get 1.5X more
                        orders and help you avoid cancellations.
                      </p>
                    </div>

                    {/* Save Button */}
                    <div className="mt-[15px] flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex justify-center items-center w-full p-4 text-[17px] font-semibold ${
                          isSubmitting
                            ? "bg-gray-400 opacity-50"
                            : "bg-[#E2E2E7] opacity-100"
                        }`}
                      >
                        {isSubmitting ? "Submitting..." : "Proceed"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
