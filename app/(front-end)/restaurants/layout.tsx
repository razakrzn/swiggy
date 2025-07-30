import { ReactNode } from "react";
import ClientAuthProvider from "@/components/frontend/ClientAuthProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurants | Swiggy",
  description: "Discover and order from the best restaurants",
};

interface RestaurantsLayoutProps {
  children: ReactNode;
}

export default function RestaurantsLayout({
  children,
}: RestaurantsLayoutProps) {
  return <ClientAuthProvider>{children}</ClientAuthProvider>;
}
