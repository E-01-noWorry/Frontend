import { useEffect, useState } from "react";
import _ from "lodash";

const useScrollTop = () => {
  const [isScroll, setIsScroll] = useState(false);

  const scrollEvent = _.debounce((event) => {
    const myHeight = event.srcElement.scrollingElement.scrollTop;
    setIsScroll(myHeight > 200);
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
  }, [scrollEvent]);

  return isScroll;
};

export default useScrollTop;
