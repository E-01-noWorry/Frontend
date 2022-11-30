import { useEffect, useRef, useState } from "react";
import _ from "lodash";

const useScrollHeight = (chat) => {
  const scrollRef = useRef();
  const [scrollState, setScrollState] = useState(true);

  const scrollEvent = _.debounce((event) => {
    const totalHeight = document.documentElement.scrollHeight;
    const scrollHeight = window.innerHeight;
    const myHeight = event.srcElement.scrollingElement.scrollTop;

    setScrollState(totalHeight <= scrollHeight + myHeight + 200);
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
  }, [scrollEvent]);

  useEffect(() => {
    if (!scrollState) return;
    scrollRef.current.scrollIntoView();
  }, [chat, scrollState]);

  return { scrollRef, scrollState };
};

export default useScrollHeight;
