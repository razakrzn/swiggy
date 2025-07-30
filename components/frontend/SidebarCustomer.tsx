"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

function SidebarCustomer() {
  const pathname = usePathname();
  const isActive = (paths: string[]) => paths.includes(pathname);
  return (
    <>
      <div className="w-80  h-full min-h-lvh border-r-2 border-[D9DADB]">
        <div className="flex flex-col">
          <Link
            href="/profile/customerorders"
            className={`text-base font-medium px-20 py-5 flex gap-3 ${
              isActive(["/profile/customerorders"])
                ? "bg-[#EDEDF0] text-[#161823]"
                : "bg-white"
            }`}
          >
            <span className="icon w-5 inline-block">
              <img src="/images/orders.svg" alt="orders" />
            </span>
            <h4>Orders</h4>
          </Link>
          <Link
            href="/profile/customeraccount"
            className={`text-base font-medium px-20 py-5 flex gap-3 ${
              isActive(["/profile/customeraccount"])
                ? "bg-[#EDEDF0] text-[#161823]"
                : "bg-white"
            }`}
          >
            <span className="icon w-5 inline-block">
              <img src="/images/account.svg" alt="account" />
            </span>
            <h4>Account</h4>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SidebarCustomer;
