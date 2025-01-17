import { ReactNode } from "react";
import { CustomerAuthProvider } from "@/contexts/CustomerAuthContext";
import Head from "next/head";

interface RestaurantsLayoutProps {
  children: ReactNode;
  title: string; // Added title prop
}

export default function CheckoutLayout({
  children,
  title,
}: RestaurantsLayoutProps) {
  return (
    <>
      <Head>
        <title>check out</title>
      </Head>
      <CustomerAuthProvider>{children}</CustomerAuthProvider>
    </>
  );
}
