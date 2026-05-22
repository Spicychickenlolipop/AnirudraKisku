import { ChevronLeft } from "lucide-react";
import { mobileAppTitles } from "#constants";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import { useIsMobile } from "../hooks/useIsMobile";
import { getMobileBackAction } from "../utils/appNavigation";

const MobileNavBar = () => {
  const isMobile = useIsMobile();
  const { windows, closeWindow, focusWindow, closeAllWindows } =
    useWindowStore();
  const { activeLocation, setActiveLocation, resetActiveLocation } =
    useLocationStore();

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

  const { label: backLabel, action: goBack } = getMobileBackAction({
    topKey,
    windows,
    activeLocation,
    closeWindow,
    focusWindow,
    closeAllWindows,
    setActiveLocation,
    resetActiveLocation,
  });

  const handleBack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    goBack();
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
        onPointerDown={handleBack}
        onClick={handleBack}
        aria-label={`Back to ${backLabel}`}
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
        <span>{backLabel}</span>
      </button>
      <h2 className="ios-nav-title">{title}</h2>
      <div className="ios-nav-spacer" aria-hidden="true" />
    </div>
  );
};

export default MobileNavBar;
