import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const BestCuisines = () => {
  return (
    <>
      <div className="wrapper !w-[87%]">
        <div className="p-[16px]">
          <div>
            <h2 className="font-bold text-[22px]">Best Cuisines Near Me</h2>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <Link
            href="/"
            className="text-none text-inherit outline-none w-[calc(25%-32px)] mx-4 mb-4"
          >
            <div className="p-4 border-[1.5px] border-[rgba(2,6,12,0.1)] rounded-xl w-full h-auto">
              <div className="flex justify-center items-center">
                <div className="font-medium text-[14px] text-[#02060C] text-opacity-75 text-center">
                  Chinese Restaurant Near Me
                </div>
              </div>
            </div>
          </Link>
          <button className="appearance-none w-[calc(25%-32px)] leading-normal border-none p-0 bg-transparent mx-4 mb-4">
            <div className="p-4 border-[1.5px] border-[rgba(2,6,12,0.1)] rounded-xl w-full h-auto">
              <div className="flex justify-center items-center">
                <div className="font-bold text-[15px] text-[rgba(2,6,12,0.75)]">
                  Show more
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="xs"
                    className="text-[rgba(2,6,12,0.75)] ml-[2px]"
                  />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default BestCuisines;
