import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    if (pathname !== prevPath.current) {
      window.scrollTo({ top: 0, behavior: "auto" });
      prevPath.current = pathname;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
