import { ChevronLeft } from "lucide-react";
import { mobileAppTitles } from "#constants";
import useWindowStore from "#store/window";
import { useIsMobile } from "../hooks/useIsMobile";

const MobileNavBar = () => {
  const isMobile = useIsMobile();
  const { windows, closeAllWindows } = useWindowStore();

  if (!isMobile) return null;

  const openEntries = Object.entries(windows).filter(
    ([, w]) => w.isOpen && !w.isMinimized
  );

  if (openEntries.length === 0) return null;

  const topEntry = openEntries.reduce((best, curr) =>
    !best || curr[1].zIndex > best[1].zIndex ? curr : best
  );

  const topKey = topEntry[0];
  const title = mobileAppTitles[topKey] ?? topKey;

  const goHome = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeAllWindows();
  };

  return (
    <div
      className="ios-nav-bar ios-nav-bar-global"
      role="navigation"
      aria-label="App navigation"
    >
      <button
        type="button"
        className="ios-back-btn"
        onPointerDown={goHome}
        onClick={goHome}
        aria-label="Back to Home"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
        <span>Home</span>
      </button>
      <h2 className="ios-nav-title">{title}</h2>
      <div className="ios-nav-spacer" aria-hidden="true" />
    </div>
  );
};

export default MobileNavBar;
