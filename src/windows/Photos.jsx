import { Mail, Palette } from "lucide-react";
import { useEffect } from "react";

import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { gallery } from "#constants";
import useWindowStore from "#store/window";

const Photos = () => {
  const email = "kisku.anirudra@gmail.com";
  const { openWindow } = useWindowStore();

  const setWallpaper = (img) => {
    document.body.style.backgroundImage = `url(${img})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-image 0.5s ease-in-out";
    localStorage.setItem("wallpaper", img);
  };

  useEffect(() => {
    const saved = localStorage.getItem("wallpaper");
    if (saved) setWallpaper(saved);
  }, []);

  const openImage = (item, idx) => {
    openWindow("imgfile", {
      name: `Photo ${item.id}.png`,
      imageUrl: item.img,
      gallery,
      index: idx,
      parentApp: "photos",
    });
  };

  const setRandomWallpaper = () => {
    const randomItem = gallery[Math.floor(Math.random() * gallery.length)];
    setWallpaper(randomItem.img);
  };

  return (
    <div className="photos-window flex flex-col h-full min-h-0 w-full bg-white">
      {/* Desktop macOS title bar */}
      <div
        id="window-header"
        className="photos-desktop-header window-drag-handle flex items-center shrink-0 border-b border-gray-200 max-sm:hidden"
      >
        <WindowControls target="photos" />
        <h2 className="flex-1 text-center font-bold text-gray-800">Gallery</h2>
        <button
          type="button"
          onClick={setRandomWallpaper}
          className="p-2 mr-2 hover:bg-gray-100 rounded-md transition cursor-pointer"
          title="Set random image as wallpaper"
          aria-label="Set wallpaper"
        >
          <Palette size={18} />
        </button>
        <a
          href={`mailto:${email}`}
          className="p-2 mr-2 hover:bg-gray-100 rounded-md transition"
          title="Email me"
        >
          <Mail size={18} />
        </a>
      </div>

      <div className="photos-gallery-area flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <ul className="photos-grid">
          {gallery.map((item, idx) => (
            <li key={item.id}>
              <button
                type="button"
                className="photos-grid-item"
                onClick={(e) => {
                  e.stopPropagation();
                  openImage(item, idx);
                }}
                aria-label={`View photo ${item.id}`}
              >
                <img
                  src={item.img}
                  alt={`Gallery ${item.id}`}
                  className="photos-grid-img"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
