import { useState, useEffect, useRef } from "react";
import { Location } from "../../app/utils/models";

interface LocationSelectorProps {
  locations: Location[];
  onLocationSelect: (location: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  locations,
  onLocationSelect,
  isVisible,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setSearchQuery("");
    }
  }, [isVisible]);

  const handleCancelClick = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const filteredLocations = locations
    ? locations.filter((location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {isVisible && (
        <div
          className="z-[10000] fixed inset-0 bg-[#282c3f] opacity-70 overflow-hidden"
          onClick={handleOverlayClick}
        ></div>
      )}
      <div
        className={`left-0 transform fixed top-0 h-full overflow-y-scroll bg-white transition-transform ease-out duration-300 z-[10001] ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full left-0 right-auto transform translate-x-0 translate-y-0">
          <div className="h-full">
            <div className="pl-[120px] pr-[40px] w-[522px]">
              <div className="pt-8 mb-[30px]">
                <button
                  onClick={onClose}
                  className="cursor-pointer w-[13px] inline-block"
                >
                  <img
                    src="/images/close.svg"
                    alt="close icon"
                    className="w-full block"
                  />
                </button>
              </div>
              <div className="relative pb-5">
                <div className="border boreder[#d4d5d9] block relative translate-z-0 text-sm font-medium">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for area, street name.."
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-[50px] pr-[72px] pl-5 w-full text-inherit outline-none"
                  />
                </div>
                {searchQuery && (
                  <div
                    onClick={handleCancelClick}
                    className="absolute top-0 right-0 mt-[16px] mr-[18px] font-medium text-[#ff5200] cursor-pointer text-[13px]"
                  >
                    Cancel
                  </div>
                )}
                <div className="">
                  {searchQuery &&
                    (filteredLocations.length > 0 ? (
                      <ul className="">
                        {filteredLocations.map((location) => (
                          <li
                            key={location.id}
                            className="border p-5 boreder[#d4d5d9] block relative translate-z-0 text-sm font-medium"
                          >
                            <button
                              onClick={() => onLocationSelect(location.name)}
                            >
                              {location.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-4">
                        <p>No locations found</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="pl-[120px] pr-[40px] w-[522px]">
              <div>
                <div className="border border-[#d4d5d9] mb-5">
                  <div
                    role="button"
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => alert("Fetching current location...")}
                  >
                    <div className="table table-fixed px-6 py-5">
                      <div className="table-cell text-left w-[32px] pl-[1px] text-[#535665]">
                        <span className="w-[18px] h-[18px] inline-block pt-[4px]">
                          <img src="/images/gps.svg" alt="gps icon" />
                        </span>
                      </div>
                      <div>
                        <div className="text-[15px] font-medium text-[#282c3f]">
                          Get current location
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationSelector;
