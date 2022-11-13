import { useCallback, useEffect, useState } from "react";

const useInfiniteScroll = () => {
  const [lastItemRef, setLastItemRef] = useState(null);
  const [page, setPage] = useState(1);

  const onIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      setPage((prev) => ++prev);
      observer.unobserve(entry.target);
    }
  }, []);

  const refreshPage = () => {
    setPage(1);
  };

  useEffect(() => {
    let observer;
    if (lastItemRef) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(lastItemRef);
    }
    return () => observer?.disconnect();
  }, [lastItemRef, onIntersect]);

  return { page, setLastItemRef, refreshPage };
};

export default useInfiniteScroll;
