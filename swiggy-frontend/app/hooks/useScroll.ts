import { useRef, useState, useEffect } from "react";

export const useScroll = (scrollStep: number = 300) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setIsLeftActive(scrollLeft > 0);
      setIsRightActive(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollStep,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollStep,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Check initial scroll position
    checkScrollPosition();

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
    }

    // Ensure we clean up the event listener on unmount
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  return {
    scrollContainerRef,
    isLeftActive,
    isRightActive,
    scrollRight,
    scrollLeft,
  };
};
