"use client";

import BestCities from "@/components/frontend/BestCities";
import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import OnlineDelivery from "@/components/frontend/OnlineDelivery";
import RestauratChain from "@/components/frontend/RestauratChain";
import RestaurantsLayout from "./layout";
import { useEffect, useState } from "react";
import LocationSelector from "@/components/frontend/Location";
import { Location } from "../../utils/models";

export default function Restaurant() {
  const [locationsList, setLocationsList] = useState<Location[]>([]);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/locations/");
        const data: Location[] = await response.json();
        setLocationsList(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleShowLocationSelector = () => {
    setShowLocationSelector((prev) => !prev);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    localStorage.setItem("customerLocation", JSON.stringify(location));
    setShowLocationSelector(false);
  };

  return (
    <RestaurantsLayout title="Best Restaurants in Your Area">
      <Header onShowLocationSelector={handleShowLocationSelector} />
      {showLocationSelector && (
        <LocationSelector
          locations={locationsList}
          onLocationSelect={handleLocationSelect}
          isVisible={showLocationSelector}
          onClose={() => setShowLocationSelector(false)}
        />
      )}
      <RestauratChain selectedLocation={selectedLocation} />
      <OnlineDelivery selectedLocation={selectedLocation} />
      <BestCities />
      <Footer />
    </RestaurantsLayout>
  );
}
