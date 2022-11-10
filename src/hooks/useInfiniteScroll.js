import { incrementPage } from "app/module/selectSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useInfiniteScroll = () => {
  const dispatch = useDispatch();
  const [lastItemRef, setLastItemRef] = useState(null);

  const onIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        dispatch(incrementPage());
        observer.unobserve(entry.target);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    let observer;
    if (lastItemRef) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(lastItemRef);
    }
    return () => observer?.disconnect();
  }, [lastItemRef, onIntersect]);

  return { setLastItemRef };
};

export default useInfiniteScroll;
