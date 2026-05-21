import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 639px)";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(MOBILE_QUERY).matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setIsMobile(e.matches);

    media.addEventListener("change", onChange);
    setIsMobile(media.matches);

    return () => media.removeEventListener("change", onChange);
  }, []);

  return isMobile;
};

export default useIsMobile;
