"use client";

import { useCustomerAuth } from "@/contexts/CustomerAuthContext";

import Link from "next/link";

export default function profile() {
  const { user } = useCustomerAuth();

  return (
    <>
      <div className="mx-auto w-90 text-center">
        <h1>Profile</h1>
        <h2>welcome to swiggy {user && user.username}</h2>
        <Link href="/profile/CustomerOrders">your orders</Link>
      </div>
    </>
  );
}
