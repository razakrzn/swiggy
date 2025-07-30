import { ReactNode } from "react";
import ClientAuthProvider from "@/components/frontend/ClientAuthProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Swiggy",
  description: "Complete your order checkout",
};

interface CheckoutLayoutProps {
  children: ReactNode;
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return <ClientAuthProvider>{children}</ClientAuthProvider>;
}
