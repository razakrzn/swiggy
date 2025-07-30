import Link from "next/link";

export default function dashboard() {
  return (
    <>
      <div className="p-7 pr-20">
        <div className="mb-7">
          <h4 className="heading1">Dashboard</h4>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-56 mx-auto">
            <img src="/images/take-away.svg" alt="take away image" />
          </div>
          <h2 className="mt-2 text-[#7e808c] font-normal">
            welcome to swiggy dashboard
          </h2>

          <Link
            className="mt-7 px-5 py-3 uppercase bg-[#ff5200] cursor-pointer text-center hover:shadow-[0_4px_14px_#d4d5d9]"
            href="/dashboard/orders"
          >
            <span className="text-white font-semibold inline-block text-sm w-ful h-full">
              your orders
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
