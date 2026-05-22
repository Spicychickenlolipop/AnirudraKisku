import { locations, mobileAppTitles } from "#constants";

const CHILD_WINDOWS = ["imgfile", "txtfile", "resume"];

export const canGoBackInFinder = (activeLocation) => {
  if (!activeLocation) return false;
  if (activeLocation.isTrash) return true;
  if (locations.work.children.some((p) => p.id === activeLocation.id)) {
    return true;
  }
  if (activeLocation.id !== locations.work.id) return true;
  return false;
};

export const getMobileBackAction = ({
  topKey,
  windows,
  activeLocation,
  closeWindow,
  focusWindow,
  closeAllWindows,
  setActiveLocation,
  resetActiveLocation,
}) => {
  if (CHILD_WINDOWS.includes(topKey)) {
    const parentApp = windows[topKey]?.data?.parentApp;
    if (parentApp && windows[parentApp]?.isOpen) {
      return {
        label: mobileAppTitles[parentApp] ?? parentApp,
        action: () => {
          closeWindow(topKey);
          focusWindow(parentApp);
        },
      };
    }
  }

  if (topKey === "finder" && canGoBackInFinder(activeLocation)) {
    return {
      label: "Portfolio",
      action: () => setActiveLocation(locations.work),
    };
  }

  return {
    label: "Home",
    action: () => {
      closeAllWindows();
      resetActiveLocation();
    },
  };
};
