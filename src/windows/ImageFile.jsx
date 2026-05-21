import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const ImageWindowContent = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  const [index, setIndex] = useState(data?.index ?? 0);
  const touchStartX = useRef(null);

  useEffect(() => {
    setIndex(data?.index ?? 0);
  }, [data?.index, data?.imageUrl]);

  if (!data) return null;

  const { name, imageUrl, gallery: galleryItems } = data;
  const hasGallery = Array.isArray(galleryItems) && galleryItems.length > 0;

  const currentSrc = hasGallery
    ? (galleryItems[index]?.img ?? galleryItems[index]?.imageUrl)
    : imageUrl;

  const currentName = hasGallery
    ? galleryItems[index]?.name ?? `Photo ${index + 1}.png`
    : name;

  const goPrev = () => {
    if (!hasGallery) return;
    setIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
  };

  const goNext = () => {
    if (!hasGallery) return;
    setIndex((i) => (i + 1) % galleryItems.length);
  };

  return (
    <section className="imgfile-window w-xl flex flex-col max-sm:w-full max-sm:h-full max-sm:min-h-0">
      <div
        id="window-header"
        className="flex items-center gap-2 p-2 bg-gray-200 shrink-0"
      >
        <WindowControls target="imgfile" />

        {hasGallery && galleryItems.length > 1 && (
          <button
            type="button"
            className="imgfile-nav-btn max-sm:hidden"
            onClick={goPrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        <h2 className="imgfile-title flex-1 text-center font-medium text-[#5f6266] truncate pointer-events-none">
          {currentName}
        </h2>

        {hasGallery && galleryItems.length > 1 && (
          <button
            type="button"
            className="imgfile-nav-btn max-sm:hidden"
            onClick={goNext}
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      <div
        className="preview flex-1 min-h-0 overflow-y-auto overscroll-contain"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (!hasGallery || touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (delta > 60) goPrev();
          else if (delta < -60) goNext();
          touchStartX.current = null;
        }}
      >
        {hasGallery && galleryItems.length > 1 && (
          <>
            <button
              type="button"
              className="imgfile-float-nav imgfile-float-nav-prev"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="imgfile-float-nav imgfile-float-nav-next"
              onClick={goNext}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {currentSrc ? (
          <img
            src={currentSrc}
            alt={currentName}
            className="imgfile-image"
          />
        ) : null}
      </div>
    </section>
  );
};

const ImageWindow = WindowWrapper(ImageWindowContent, "imgfile");

export default ImageWindow;
