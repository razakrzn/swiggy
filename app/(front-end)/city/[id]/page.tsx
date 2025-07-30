"use client";

import { useParams } from "next/navigation";
import Menu from "@/components/frontend/Menu";
import OrderSection from "@/components/frontend/OrderSection";
import RestaurantFooter from "@/components/frontend/RestaurantFooter";
import Header from "@/components/frontend/Header";

export default function DetailsPage() {
  const { id } = useParams();

  if (!id) {
    return <div>Loading...</div>;
  }

  const handleShowLocationSelector = () => {
    // This page doesn't need location selector functionality
    console.log("Location selector not available on this page");
  };

  return (
    <>
      <Header onShowLocationSelector={handleShowLocationSelector} />
      <OrderSection id={id as string} />
      <Menu id={id as string} />
      <RestaurantFooter id={id as string} />
    </>
  );
}
