export default function BottomSection() {
  return (
    <>
      <div className="flex justify-center py-[24px] gap-6">
        <div className="left max-w-[508px] flex flex-col gap-[12px]">
          <div className="">
            <div className="text-[14px] opacity-45 font-semibold">
              In just 3 easy steps
            </div>
            <div className="text-[18px] opacity-75 font-bold ">
              Get your restaurant delivery-ready in 24hrs!
            </div>
          </div>
          <div className="line w-[38px] h-1 rounded-[16px] bg-[rgb(255,82,0)]"></div>
          <div className="py-6 pr-[100px] pl-4 bg-[rgb(240,240,245)] rounded-[16px]">
            <div className="">
              <div className="pl-5 flex flex-col gap-6 relative before:content-[''] before:absolute before:w-[1px] before:border before:border-dashed before:border-[rgba(2,6,12,0.15)] before:top-0 before:bottom-0 before:left-0">
                <div className="flex flex-col gap-1 relative before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:left-[-24px] before:top-[2px] before:bg-[rgb(101,65,228)] before:border  before:border-[rgb(101,65,228)] before:rounded-full">
                  <div className="uppercase font-normal text-[11px] text-[rgba(2,6,12,0.6)]">
                    step 1
                  </div>
                  <div className="font-semibold text-[17px] opacity-75 ">
                    Install the Swiggy Owner App
                  </div>
                </div>
                <div className="flex flex-col gap-1 relative before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:left-[-24px] before:top-[2px] before:bg-[rgb(101,65,228)] before:border  before:border-[rgb(101,65,228)] before:rounded-full">
                  <div className="uppercase font-normal text-[11px] text-[rgba(2,6,12,0.6)]">
                    step 2
                  </div>
                  <div className="font-semibold text-[17px] opacity-75 ">
                    Login/Register using your phone number
                  </div>
                </div>
                <div className="flex flex-col gap-1 relative before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:left-[-24px] before:top-[2px] before:bg-[rgb(101,65,228)] before:border  before:border-[rgb(101,65,228)] before:rounded-full">
                  <div className="uppercase font-normal text-[11px] text-[rgba(2,6,12,0.6)]">
                    step 3
                  </div>
                  <div className="font-semibold text-[17px] opacity-75 ">
                    Enter restaurant details
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right flex flex-col gap-4 p-8 bg-[#FDFBFF] w-[612px] rounded-[16px] border-[#D8D0ED] border-2">
          <div className="top">
            <div className="text-[12px] font-semibold opacity-75">
              For an easy form filling process,
            </div>
            <div className="text-[13px] font-normal opacity-60">
              you can keep these documents handy.
            </div>
          </div>
          <div className="h-[1px] border border-dotted border-black opacity-20"></div>
          <div className="flex gap-[12px] items-center">
            <div className="w-[5px] h-[5px] rounded bg-[rgb(255,82,0)]"></div>
            <div className="text-[15px] font-semibold opacity-75">
              FSSAI License copy
            </div>
            <a href="/" className="underline text-[rgb(255,82,0)]">
              <div className="">Apply Here</div>
            </a>
          </div>
          <div className="flex gap-[12px] items-center">
            <div className="w-[5px] h-[5px] rounded bg-[rgb(255,82,0)]"></div>
            <div className="text-[15px] font-semibold opacity-75">
              Your Restaurant menu
            </div>
          </div>
          <div className="flex gap-[12px] items-center">
            <div className="w-[5px] h-[5px] rounded bg-[rgb(255,82,0)]"></div>
            <div className="text-[15px] font-semibold opacity-75">
              Bank details
            </div>
          </div>
          <div className="flex gap-[12px] items-center">
            <div className="w-[5px] h-[5px] rounded bg-[rgb(255,82,0)]"></div>
            <div className="text-[15px] font-semibold opacity-75">GSTIN</div>
            <a href="/" className="underline text-[rgb(255,82,0)]">
              <div className="">Apply Here</div>
            </a>
          </div>
          <div className="flex gap-[12px] items-center">
            <div className="w-[5px] h-[5px] rounded bg-[rgb(255,82,0)]"></div>
            <div className="text-[15px] font-semibold opacity-75">
              PAN card copy
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
