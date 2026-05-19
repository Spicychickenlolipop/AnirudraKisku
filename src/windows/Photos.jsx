// // import { Mail, Search } from 'lucide-react/dist/esm/icons';

// // import WindowWrapper from '#hoc/WindowWrapper';
// // import WindowControls from '#components/WindowControls';
// // import { gallery, photosLinks } from '#constants';
// // import useWindowStore from '#store/window';

// // const Photos = () => {

// //   const { openWindow, focusWindow } = useWindowStore();

// //    const email = 'kisku.anirudra@gmail.com';

// //   return (
// //     <div className="flex flex-col h-full">
// //       <div id='window-header' className='window-drag-handle'>
// //         <WindowControls target="photos" />
// //         <h2 className='flex-1 text-center font-bold'>Gallery</h2>
// //         <div className='flex justify-end items-center gap-3'>
// //           <a
// //             href={`mailto:${email}`}
// //             title={`Email: ${email}`}
// //             className='p-2 hover:bg-gray-200 rounded-md transition-colors'
// //           >
// //             <Mail size={18} />
// //           </a>
// //           <Search className='icon' />
// //         </div>
// //       </div>
// //       <div className='flex w-full flex-1 min-h-0'>
// //         <div className='sidebar'>
// //           <h2>
// //             Photos
// //           </h2>
// //           <ul>
// //             {photosLinks.map(({id, icon, title}) => (
// //               <li 
// //                 key={id}
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   focusWindow('photos');
// //                 }}
// //               >
// //                 <img src={icon} alt={title} />
// //                 <p>{title}</p>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //         <div className='gallery'>
// //           <ul>
// //             {gallery.map(({id, img}) => (
// //               <li 
// //                 key={id}
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   openWindow('imgfile' , {
// //                     id,
// //                     name: "Gallery Image",
// //                     icon: "/images/image.png",
// //                     kind: "file",
// //                     fileType: "img",
// //                     imageUrl: img,
// //                   });
// //                 }}
// //               >
// //                 <img
// //                   src={img}
// //                   alt={`Gallery image ${id}`}
// //                   loading='lazy'
// //                 />
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // const PhotosWindow = WindowWrapper( Photos, "photos")

// // export default PhotosWindow;








// import { Mail, Search } from 'lucide-react/dist/esm/icons';
// import { useState, useEffect } from "react";

// import WindowWrapper from '#hoc/WindowWrapper';
// import WindowControls from '#components/WindowControls';
// import { gallery, photosLinks } from '#constants';
// import useWindowStore from '#store/window';

// const Photos = () => {

//   const { focusWindow } = useWindowStore();
//   const email = 'kisku.anirudra@gmail.com';

//   const [wallpaperPreview, setWallpaperPreview] = useState(null);

//   const setWallpaper = (img) => {
//     document.body.style.backgroundImage = `url(${img})`;
//     document.body.style.backgroundSize = "cover";
//     document.body.style.backgroundPosition = "center";
//     document.body.style.transition = "background-image 0.5s ease-in-out";

//     localStorage.setItem("wallpaper", img);
//   };

//   useEffect(() => {
//     const saved = localStorage.getItem("wallpaper");
//     if (saved) {
//       setWallpaper(saved);
//     }
//   }, []);

//   return (
//     <div className="flex flex-col h-full">
      
//       <div id='window-header' className='window-drag-handle'>
//         <WindowControls target="photos" />
//         <h2 className='flex-1 text-center font-bold'>Gallery</h2>

//         <div className='flex justify-end items-center gap-3'>
//           <a
//             href={`mailto:${email}`}
//             className='p-2 hover:bg-gray-200 rounded-md'
//           >
//             <Mail size={18} />
//           </a>
//           <Search className='icon' />
//         </div>
//       </div>

//       <div className='flex w-full flex-1 min-h-0'>
        
//         <div className='sidebar'>
//           <h2>Photos</h2>
//           <ul>
//             {photosLinks.map(({id, icon, title}) => (
//               <li key={id} onClick={() => focusWindow('photos')}>
//                 <img src={icon} alt={title} />
//                 <p>{title}</p>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className='gallery'>
//           <ul>
//             {gallery.map(({id, img}) => (
//               <li 
//                 key={id}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setWallpaperPreview(img);
//                 }}
//               >
//                 <img src={img} alt={`Gallery ${id}`} />
//               </li>
//             ))}
//           </ul>
//         </div>

//       </div>

//       {/* Wallpaper UI */}
//       {wallpaperPreview && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl">

//           <img
//             src={wallpaperPreview}
//             className="max-h-[85%] max-w-[95%] object-contain rounded-2xl"
//           />

//           <button
//             onClick={() => setWallpaperPreview(null)}
//             className="absolute top-6 left-6 px-4 py-2 bg-white/10 rounded-lg"
//           >
//             ← Back
//           </button>

//           <div className="absolute bottom-8 flex gap-4 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20">

//             <button
//               onClick={() => {
//                 setWallpaper(wallpaperPreview);
//                 setWallpaperPreview(null);
//               }}
//               className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500"
//             >
//               Set Wallpaper
//             </button>

//             <button
//               onClick={() => {
//                 const link = document.createElement("a");
//                 link.href = wallpaperPreview;
//                 link.download = "wallpaper.jpg";
//                 link.click();
//               }}
//               className="px-5 py-2 rounded-xl border border-white/30"
//             >
//               Download
//             </button>

//             <button
//               onClick={() => setWallpaperPreview(null)}
//               className="px-5 py-2 rounded-xl bg-white/20"
//             >
//               Cancel
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// const PhotosWindow = WindowWrapper(Photos, "photos");

// export default PhotosWindow;













//best one till now





// import { Mail, Search } from 'lucide-react/dist/esm/icons';
// import { useState, useEffect } from "react";

// import WindowWrapper from '#hoc/WindowWrapper';
// import WindowControls from '#components/WindowControls';
// import { gallery, photosLinks } from '#constants';
// import useWindowStore from '#store/window';

// const Photos = () => {

//   const { focusWindow } = useWindowStore();
//   const email = 'kisku.anirudra@gmail.com';

//   // Wallpaper preview state
//   const [wallpaperPreview, setWallpaperPreview] = useState(null);

//   // Set wallpaper function
//   const setWallpaper = (img) => {
//     document.body.style.backgroundImage = `url(${img})`;
//     document.body.style.backgroundSize = "cover";
//     document.body.style.backgroundPosition = "center";
//     document.body.style.transition = "background-image 0.5s ease-in-out";

//     localStorage.setItem("wallpaper", img);
//   };

//   // Load saved wallpaper on reload
//   useEffect(() => {
//     const saved = localStorage.getItem("wallpaper");
//     if (saved) {
//       setWallpaper(saved);
//     }
//   }, []);

//   return (
//     <div className="flex flex-col h-full">
      
//       {/* Header */}
//       <div id='window-header' className='window-drag-handle'>
//         <WindowControls target="photos" />
//         <h2 className='flex-1 text-center font-bold'>Gallery</h2>

//         <div className='flex justify-end items-center gap-3'>
//           <a
//             href={`mailto:${email}`}
//             className='p-2 hover:bg-gray-200 rounded-md transition'
//           >
//             <Mail size={18} />
//           </a>
//           <Search className='icon' />
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className='flex w-full flex-1 min-h-0'>
        
//         {/* Sidebar */}
//         <div className='sidebar'>
//           <h2>Photos</h2>
//           <ul>
//             {photosLinks.map(({ id, icon, title }) => (
//               <li key={id} onClick={() => focusWindow('photos')}>
//                 <img src={icon} alt={title} />
//                 <p>{title}</p>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Gallery */}
//         <div className='gallery'>
//           <ul>
//             {gallery.map(({ id, img }) => (
//               <li
//                 key={id}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setWallpaperPreview(img);
//                 }}
//                 className="cursor-pointer"
//               >
//                 <img
//                   src={img}
//                   alt={`Gallery ${id}`}
//                   className="rounded-xl"
//                   loading="lazy"
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>

//       </div>

//       {/* 🔥 Wallpaper Preview (OS Style) */}
//       {wallpaperPreview && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl">

//           {/* Image */}
//           <img
//             src={wallpaperPreview}
//             className="max-h-[85%] max-w-[95%] object-contain rounded-2xl shadow-2xl"
//           />

//           {/* Back Button (Top Left) */}
//           {/* <button
//             onClick={() => setWallpaperPreview(null)}
//             className="
//               absolute top-6 left-6
//               px-4 py-2
//               bg-white/10 backdrop-blur-md
//               rounded-lg
//               hover:bg-white/20
//               transition
//             "
//           >
//             ← Back
//           </button> */}

//           <button
//   onClick={() => setWallpaperPreview(null)}
//   className="
//     absolute top-5 left-5
//     px-3 py-1
//     text-[13px] font-medium
//     text-white
//     bg-white/10 backdrop-blur-lg
//     border border-white/20
//     rounded-md
//     shadow-sm
//     hover:bg-white/20
//     active:bg-white/30 active:scale-95
//     transition-all duration-150
//   "
// >
//   Back
// </button>

//           {/* Set Wallpaper Button (Top Right) */}
//           {/* <button
//             onClick={() => {
//               setWallpaper(wallpaperPreview);
//               setWallpaperPreview(null);
//             }}
//             className="
//               absolute top-6 right-6
//               px-5 py-2
//               rounded-xl
//               bg-gradient-to-r from-purple-500 to-blue-500
//               text-white font-medium
//               shadow-lg
//               hover:scale-105 hover:shadow-xl
//               active:scale-95
//               transition-all duration-200
//             "
//           >
//             Set Wallpaper
//           </button> */}

//           <button
//   onClick={() => {
//     setWallpaper(wallpaperPreview);
//     setWallpaperPreview(null);
//   }}
//   className="
//     absolute top-6 right-6
//     px-4 py-1.5
//     text-sm font-medium
//     text-white
//     bg-white/10
//     backdrop-blur-md
//     border border-white/20
//     rounded-md
//     shadow-sm
//     hover:bg-white/20
//     active:bg-white/30
//     transition-all duration-150
//   "
// >
//   Set Wallpaper
// </button>

//         </div>
//       )}

//     </div>
//   );
// };

// const PhotosWindow = WindowWrapper(Photos, "photos");

// export default PhotosWindow;






import { Mail, Search } from "lucide-react/dist/esm/icons";
import { useState, useEffect } from "react";

import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window";

const Photos = () => {
  const { focusWindow } = useWindowStore();
  const email = "kisku.anirudra@gmail.com";

  // Wallpaper preview state
  const [wallpaperPreview, setWallpaperPreview] = useState(null);

  // Set wallpaper
  const setWallpaper = (img) => {
    document.body.style.backgroundImage = `url(${img})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-image 0.5s ease-in-out";

    localStorage.setItem("wallpaper", img);
  };

  // Load saved wallpaper
  useEffect(() => {
    const saved = localStorage.getItem("wallpaper");
    if (saved) setWallpaper(saved);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div id="window-header" className="window-drag-handle flex items-center">
        <WindowControls target="photos" />

        <h2 className="flex-1 text-center font-bold">Gallery</h2>

        <div className="flex justify-end items-center gap-3 pr-3">
          <a
            href={`mailto:${email}`}
            className="p-2 hover:bg-gray-200 rounded-md transition"
          >
            <Mail size={18} />
          </a>
          <Search className="icon" />
        </div>
      </div>

      {/* MAIN */}
      <div className="flex w-full flex-1 min-h-0">
        {/* SIDEBAR */}
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id} onClick={() => focusWindow("photos")}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* GALLERY (FIXED 🔥) */}
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                onClick={(e) => {
                  e.stopPropagation();
                  setWallpaperPreview(img);
                }}
                className="cursor-pointer group"
              >
                <img
                  src={img}
                  alt={`Gallery ${id}`}
                  loading="lazy"
                  className="
                    w-full h-32 object-cover
                    rounded-xl
                    border border-white/10
                    bg-white/5 backdrop-blur-md
                    transition-all duration-300
                    group-hover:scale-105
                    group-hover:shadow-2xl
                  "
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* WALLPAPER PREVIEW */}
      {wallpaperPreview && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl">
          {/* IMAGE */}
          <img
            src={wallpaperPreview}
            className="max-h-[85%] max-w-[95%] object-contain rounded-2xl shadow-2xl"
          />

          {/* BACK BUTTON */}
          <button
            onClick={() => setWallpaperPreview(null)}
            className="
              absolute top-5 left-5
              px-3 py-1
              text-[13px] font-medium
              text-white
              bg-white/10 backdrop-blur-lg
              border border-white/20
              rounded-md
              shadow-sm
              hover:bg-white/20
              active:bg-white/30 active:scale-95
              transition-all duration-150
            "
          >
            Back
          </button>

          {/* SET WALLPAPER */}
          <button
            onClick={() => {
              setWallpaper(wallpaperPreview);
              setWallpaperPreview(null);
            }}
            className="
              absolute top-6 right-6
              px-4 py-1.5
              text-sm font-medium
              text-white
              bg-white/10
              backdrop-blur-md
              border border-white/20
              rounded-md
              shadow-sm
              hover:bg-white/20
              active:bg-white/30
              transition-all duration-150
            "
          >
            Set Wallpaper
          </button>
        </div>
      )}
    </div>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;