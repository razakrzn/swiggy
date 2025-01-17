import { useOwnerAuth } from "@/contexts/OwnerAuthContext";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface FoodItemFormProps {
  restaurant: string;
  name: string;
  description: string;
  price: number;
  food_type: string;
  rating?: number;
  categories: number[];
  image: File | null;
  is_available: boolean;
}

const AddingFoodMenu = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const { user } = useOwnerAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FoodItemFormProps>({
    restaurant: "",
    name: "",
    description: "",
    price: 0,
    food_type: "",
    rating: 4.2,
    categories: [],
    image: null,
    is_available: false,
  });

  useEffect(() => {
    if (user?.restaurantIds) {
      setFormData((prevData) => ({
        ...prevData,
        restaurant: user.restaurantIds.toString(), // Convert the number to a string if the backend expects it as a string
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
        const data: Category[] = await response.json(); // Ensure data matches `Category[]`
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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

  const handleFoodType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      food_type: type,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    data.append("restaurant", formData.restaurant.toString());

    if (formData.image) {
      data.append("image", formData.image as File);
    }

    formData.categories.forEach((categoryId) => {
      if (typeof categoryId === "number" || typeof categoryId === "string") {
        data.append("categories", categoryId.toString());
      } else {
        console.error("Invalid category ID:", categoryId);
      }
    });

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "categories" && key !== "image" && key !== "restaurant") {
        data.append(key, value as string);
      }
    });

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/restaurants/create-food-items/",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        alert("Food Item created successfully!");
        window.location.reload();
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert("Failed to create food item.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <>
      {isVisible && (
        <div
          className="z-[10000] fixed inset-0 bg-[#282c3f] opacity-70 overflow-hidden"
          onClick={handleOverlayClick}
        ></div>
      )}
      <div
        className={`left-auto right-0 transform fixed top-0 h-full overflow-y-scroll bg-white transition-transform ease-out duration-300 z-[10001] ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full left-0 right-auto transform translate-x-0 translate-y-0">
          <div className="h-full">
            <div className="px-10 py-8 w-96">
              <div className="mb-[30px]">
                <button
                  onClick={onClose}
                  className="cursor-pointer w-[13px] inline-block"
                >
                  <img
                    src="/images/close.svg"
                    alt="close icon"
                    className="w-full block"
                  />
                </button>
              </div>
              <div className="flex flex-col gap-4 items-center w-full">
                <div className="">
                  <h2 className="font-bold text-xl text-center">
                    Daily Menu Items
                  </h2>
                </div>
                <form
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="w-full"
                >
                  <div className="flex flex-col gap-4">
                    <div className="relative border border-dotted py-8 flex flex-col gap-1 items-center rounded-2xl w-full">
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        accept="image/*"
                        required
                      />
                      <img
                        src="/images/add-food.svg"
                        alt="Upload Icon"
                        className="w-5 h-5"
                      />
                      <label className="font-medium">Add your dishes</label>
                    </div>
                    <div className="py-2">
                      <label className="font-medium">Food Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter food name"
                        className="w-full rounded p-2 py-3 px-4 bg-[#EDEDF0] mt-2 outline-logoColor"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <label htmlFor="categories" className="font-medium">
                        Select Categories
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
                    <div className="py-2">
                      <label className="font-bold">Food Type</label>
                      <div className="mt-2 bg-[#F8F8FB] px-4 py-2">
                        <div className="bg-[#EDEDF0] w-full flex rounded-2xl">
                          <button
                            type="button"
                            onClick={() => handleFoodType("veg")}
                            className={`w-full rounded-full px-3 py-1 text-center ${
                              formData.food_type === "veg"
                                ? "bg-white text-black font-medium text-sm border-2 border-[#EDEDF0]"
                                : "bg-[#EDEDF0] text-black text-sm"
                            }`}
                          >
                            Veg
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFoodType("non-veg")}
                            className={`w-full px-3 py-1 text-center rounded-full ${
                              formData.food_type === "non-veg"
                                ? "bg-white text-black font-medium text-sm border-2 border-[#EDEDF0]"
                                : "bg-[#EDEDF0] text-black text-sm"
                            }`}
                          >
                            Non-Veg
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <label className="font-medium">Price</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full rounded p-2 py-3 px-4 bg-[#EDEDF0] mt-2 outline-logoColor"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="py-2">
                      <label className="font-medium">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="description"
                        className="w-full rounded p-2 py-3 px-4 bg-[#EDEDF0] mt-2 outline-logoColor"
                        rows={4}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex w-full justify-between gap-3">
                    <button className="py-2 px-4 bg-[#EDEDF0] rounded w-full">
                      delete
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-logoColor rounded w-full text-white"
                    >
                      save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddingFoodMenu;
