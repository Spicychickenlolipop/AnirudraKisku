import { ChevronLeft } from "lucide-react";
import { mobileAppTitles } from "#constants";
import useWindowStore from "#store/window";

const AppBackButton = ({ currentWindow, className = "" }) => {
  const { windows, closeWindow, focusWindow } = useWindowStore();
  const data = windows[currentWindow]?.data;
  const parentApp = data?.parentApp;

  if (!parentApp || !windows[parentApp]?.isOpen) return null;

  const label = mobileAppTitles[parentApp] ?? parentApp;

  const handleBack = (e) => {
    e.stopPropagation();
    closeWindow(currentWindow);
    focusWindow(parentApp);
  };

  return (
    <button
      type="button"
      className={`app-back-btn ${className}`.trim()}
      onClick={handleBack}
      aria-label={`Back to ${label}`}
    >
      <ChevronLeft size={18} strokeWidth={2.5} />
      <span>{label}</span>
    </button>
  );
};

export default AppBackButton;
