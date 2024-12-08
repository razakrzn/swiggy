"use client";
import { useState } from "react";

const RestaurantInfo = () => {
  const [ownerName, setOwnerName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const daysOfWeek: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSelectAll = () => {
    setSelectedDays((prev) =>
      prev.length === daysOfWeek.length ? [] : [...daysOfWeek]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: restaurantName,
      outlet: "",
      email,
      address: location,
      phone_number: mobile,
      working_days: selectedDays,
      opening_time: openTime,
      closing_time: closeTime,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/restaurants/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      // Reset the form fields after successful submission
      setOwnerName("");
      setRestaurantName("");
      setEmail("");
      setMobile("");
      setLocation("");
      setOpenTime("");
      setCloseTime("");
      setSelectedDays([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Basic Details */}
          <div className="my-3 px-4 pt-6 pb-5 rounded-3xl bg-white border border-[#d3d3d3]">
            <label className="font-semibold text-[17px] opacity-75 mb-4 inline-block">
              Basic Details
            </label>
            <input
              type="text"
              placeholder="Owner's Full Name *"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
              className="inline-block border-[1.5px] w-full rounded-[16px] p-3 outline-logoColor"
            />
            <input
              type="text"
              placeholder="Restaurant Name *"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
            />
            <div className="">
              <div className="flex justify-between text-[15px]">
                <input
                  type="text"
                  name="location"
                  placeholder="Location *"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
                />
              </div>
            </div>
          </div>

          {/* Owner Contact Details */}
          <div className="my-3 px-4 pt-6 pb-5 rounded-3xl bg-white border border-[#d3d3d3]">
            <label className="font-semibold text-[17px] opacity-75">
              Owner Contact Details
            </label>
            <p className="text-[13px] opacity-45 mb-5">
              To get updates on payments, customer complaints, order acceptance,
              etc.
            </p>
            <input
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
            />
            <input
              type="text"
              placeholder="Mobile Number *"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="inline-block border-[1.5px] w-full rounded-[16px] p-3 mt-2 outline-logoColor"
            />
          </div>

          {/* Working Days */}
          <div className="my-3 px-4 pt-6 pb-5 rounded-3xl bg-white border border-[#d3d3d3]">
            <div className="flex justify-between">
              <span className="font-semibold text-[17px] opacity-75">
                Working Days
              </span>
              <span
                className="cursor-pointer font-semibold text-logoColor"
                onClick={handleSelectAll}
              >
                {selectedDays.length === daysOfWeek.length
                  ? "Deselect All"
                  : "Select All"}
              </span>
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
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDayToggle(day)}
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
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 w-full outline-none"
                />
              </div>
              <div className="mb-2 border px-8 py-4">
                <label className="block text-[14px] font-medium mb-2">
                  Close Time
                </label>
                <input
                  type="time"
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 w-full"
                />
              </div>
            </div>
            <p className="bg-backgroudGray font-normal text-[13px] opacity-60 rounded-[16px] px-4 py-3">
              Longer operational timings ensure you get 1.5X more orders and
              help you avoid cancellations.
            </p>
          </div>

          {/* Save Button */}
          <div className="mt-[15px] flex justify-end">
            <button
              type="submit"
              className="flex justify-center items-center w-full bg-[#E2E2E7] p-4 text-[17px] font-semibold opacity-45"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantInfo;
