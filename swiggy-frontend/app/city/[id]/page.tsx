"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import OrderSection from "@/components/OrderSection";
import RestaurantFooter from "@/components/RestaurantFooter";

export default function DetailsPage() {
  const { id } = useParams();

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <OrderSection id={id as string} />
      <Menu id={id as string} />
      <RestaurantFooter id={id as string} />
    </>
  );
}
