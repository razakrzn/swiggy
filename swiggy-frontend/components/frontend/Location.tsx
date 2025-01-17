import { useState, useEffect, useRef } from "react";

const Location = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
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
                        <div className="text-[12px] text-[#93959f] pt-[5px]">
                          Using GPS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=""></div>
                <div className="mb-5 border border-[#d4d5d9]">
                  <div className="text-[11px] text-[#7e808c] ml-[56px] mt-[25px]">
                    RECENT SEARCHES
                  </div>
                  <div className="recent-location relative cursor-pointer overflow-hidden ">
                    <div className="table table-fixed py-[22px] px-[24px]">
                      <div className="table-cell text-left text-[18px] w-[32px] pt-0 pl-[1px] text-[#535665]">
                        <span className="w-[18px] h-[18px] inline-block">
                          <img src="/images/recent.svg" alt="recent icon" />
                        </span>
                      </div>
                      <div className="table-cell align-middle">
                        <div className="text-[15px] font-medium text-[#282c3f]">
                          Calicut
                        </div>
                        <div className="text-[12px] text-[#93959f] pt-[5px]">
                          Kerala, India
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

export default Location;
