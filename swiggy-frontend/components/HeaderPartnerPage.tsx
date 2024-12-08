import Link from "next/link";

const HeaderPartnerPage = () => {
  return (
    <>
      <header>
        <div className="flex justify-between items-center py-2 px-4 shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)] bg-white ">
          <div className="left flex items-center">
            <div className="logo w-5 py-[5px]">
              <Link href="/partner" className="">
                <img
                  src="/images/swiggy-logo2.svg"
                  alt="swiggy logo"
                  className="block w-full"
                />
              </Link>
            </div>
            <span className="text-[15px] text-[#02060C] font-semibold capitalize inline-block ml-[6px]">
              swiggy
            </span>
            <span className="text-[14px] text-[#02060C] inline-block ml-1">
              for restaurant
            </span>
          </div>
          <div className="right px-8">
            <span className="opacity-75 text-[15px] font-semibold">FAQs</span>
          </div>
        </div>
      </header>
    </>
  );
};
export default HeaderPartnerPage;
