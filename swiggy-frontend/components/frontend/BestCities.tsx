import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type BestCity = {
  id: number;
  city: string;
};

const BestCities = () => {
  const bestCities: BestCity[] = [
    { id: 1, city: "Bangalore" },
    { id: 2, city: "Mumbai" },
    { id: 3, city: "kochi" },
    { id: 4, city: "delhi" },
    { id: 5, city: "pune" },
    { id: 7, city: "kolkata" },
    { id: 8, city: "goa" },
  ];

  return (
    <>
      <div className="wrapper !w-[87%] py-8">
        <hr className="border-b border-customBorder mb-8 mx-5 inline-block w-full" />
        <div className="p-[16px]">
          <div>
            <h2 className="font-bold text-[22px]">
              Best Places to Eat Across Cities
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          {bestCities.map((item) => (
            <div
              key={item.id}
              className="w-[calc(25%-32px)] text-none text-inherit outline-none mx-4 mb-4 inline-block"
            >
              <a href="/" className="">
                <div className="p-4 border-[1.5px] border-[rgba(2,6,12,0.1)] rounded-xl h-full w-full">
                  <div className="flex justify-center items-center">
                    <div className="font-medium text-[14px] text-[#02060C] text-opacity-75 text-center capitalize">
                      Best Restaurants in {item.city}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
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

export default BestCities;
