"use client";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import Link from "next/link";

export default function CustomerAccount() {
  const { user, setUser, logout } = useCustomerAuth();

  const handleSignOut = () => {
    setUser(null);
    logout();
  };
  return (
    <main>
      <div className="p-7 pr-20">
        <div className="mb-7">
          <h4 className="heading1">Account Information</h4>
        </div>
        <div className="flex gap-7">
          <div className="p-4 flex flex-col gap-4  bg-white rounded-2xl w-full">
            <div className="max-w-2xl w-full mx-auto flex py-7 flex-col">
              <div className="flex flex-col gap-10">
                <div className="">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-xl capitalize">
                      {user && user.username}
                    </h2>
                    <p className="font-normal text-sm text-[#7E8A8C]">
                      {user && user.email}
                    </p>
                  </div>
                </div>
                {user ? (
                  // Show Sign Out button if the user is logged in
                  <button
                    onClick={handleSignOut}
                    className="py-3 px-4 flex items-center justify-center h-[54px] text-white font-extrabold text-sm bg-black rounded-[15px] w-[135px]"
                  >
                    Sign out
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="mt-7 px-5 py-3 uppercase bg-[#ff5200] cursor-pointer text-center hover:shadow-[0_4px_14px_#d4d5d9] w-[135px]"
                  >
                    <span className="text-white font-semibold text-sm">
                      login
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
