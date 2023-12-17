
import { useState, useEffect } from "react";

const useInfiniteScroll = callback => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    console.log('"gbgg')
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  useEffect(() => {
    if (!isFetching) {
      callback()
    }
  }, [isFetching]);
  console.log(window.innerHeight + document.documentElement.scrollTop, document.documentElement.offsetHeight, "bbahar")
  function isScrolling() {
    console.log(window.innerHeight, document.documentElement.scrollTop, document.documentElement.offsetHeight)
    console.log(window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight ||
      isFetching)
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }
  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;