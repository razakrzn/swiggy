import { useRef, useState, useEffect } from "react";

export const useScroll = (scrollStep: number = 300) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(true);

  const updateScrollState = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const isAtStart = scrollLeft === 0;
    const isAtEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) < 1;

    setIsLeftActive(!isAtStart);
    setIsRightActive(!isAtEnd);
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (currentScroll < maxScroll) {
      const targetScroll = Math.min(currentScroll + scrollStep, maxScroll);
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const currentScroll = container.scrollLeft;
    if (currentScroll > 0) {
      const targetScroll = Math.max(currentScroll - scrollStep, 0);
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initial check
    updateScrollState();

    // Add scroll event listener with debounce
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScrollState, 100);
    };

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
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
