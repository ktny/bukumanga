import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // eslint-disable-next-line correctness/useExhaustiveDependencies: Reset scroll on path change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
