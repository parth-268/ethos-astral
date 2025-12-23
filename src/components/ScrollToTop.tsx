import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Disable the browser's default scroll restoration to prevent "jumping"
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 2. Immediately scroll to top (0,0) before the screen paints
    window.scrollTo(0, 0);
  }, [pathname]); // This triggers on every route change (navigation) AND initial load

  return null; // This component renders nothing visually
};

export default ScrollToTop;
