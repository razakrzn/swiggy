import { ReactNode } from "react";
import { CustomerAuthProvider } from "@/contexts/CustomerAuthContext";

interface RestaurantsLayoutProps {
  children: ReactNode;
}

export default function CityLayout({ children }: RestaurantsLayoutProps) {
  return <CustomerAuthProvider>{children}</CustomerAuthProvider>;
}
