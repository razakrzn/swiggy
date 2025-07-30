"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

function Sidebar() {
  const pathname = usePathname();
  const isActive = (paths: string[]) => paths.includes(pathname);
  return (
    <>
      <div className="w-80  h-full min-h-lvh border-r-2 border-[D9DADB]">
        <div className="flex flex-col">
          <Link
            href="/dashboard/orders"
            className={`text-base font-medium px-20 py-5 flex gap-3 ${
              isActive(["/dashboard/orders"])
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
            href="/dashboard/foodmenu"
            className={`text-base font-medium px-20 py-5 flex gap-3 ${
              isActive(["/dashboard/foodmenu"])
                ? "bg-[#EDEDF0] text-[#161823]"
                : "bg-white"
            }`}
          >
            <span className="icon w-5 inline-block">
              <img src="/images/food-menu.svg" alt="orders" />
            </span>
            <h4>Food Menu</h4>{" "}
          </Link>
          <Link
            href="/dashboard/account"
            className={`text-base font-medium px-20 py-5 flex gap-3 ${
              isActive(["/dashboard/account"])
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

export default Sidebar;
