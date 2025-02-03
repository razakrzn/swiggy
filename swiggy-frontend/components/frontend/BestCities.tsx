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
      <div className="wrapper !w-[100%] py-8">
        <hr className="border-b border-customBorder mb-8 mx-5 inline-block w-full lg:mx-0 md:mx-0 sm:mx-0" />
        <div className="p-4 lg:p-0 md:p-0 sm:p-0">
          <div className="mb-6">
            <h2 className="font-bold text-[22px] pl-4">
              We deliver to popular cities like
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-4">
          {bestCities.map((item) => (
            <div
              key={item.id}
              className="mx-4 mb-4 sm:mx-2 sm:mb-2 md:mx-4 md:mb-4"
            >
              <a href="/" className="">
                <div className="p-4 border-[1.5px] border-[rgba(2,6,12,0.1)] rounded-xl h-full w-full sm:p-2 md:p-3 lg:p-4">
                  <div className="flex justify-center items-center">
                    <div className="font-medium text-[14px] text-[#02060C] text-opacity-75 text-center capitalize">
                      {item.city}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
          <button className="appearance-none leading-normal border-none p-0 bg-transparent mx-4 mb-4 sm:mx-2 sm:mb-2 md:mx-4 md:mb-4">
            <div className="p-4 border-[1.5px] border-[rgba(2,6,12,0.1)] rounded-xl w-full h-auto sm:p-2">
              <div className="flex justify-center items-center">
                <div className="font-bold text-[15px] text-[rgba(2,6,12,0.75)] sm:text-xs md:text-sm">
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
