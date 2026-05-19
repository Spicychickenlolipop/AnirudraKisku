// import gsap from "gsap";
// import { Draggable } from "gsap/Draggable";

// import { Navbar, Welcome, Dock, Home } from "#components";
// import { Contact, Finder, ImageFile, Photos, Resume, Safari, Terminal, TextFile } from "#windows";
// // import ControlCenter from "#components/ControlCenter";
// import ControlCenter from "#components/ControlCenter";

// gsap.registerPlugin(Draggable);


// const App = () => {
//   return (
//     <main>
//       <Navbar/>
//       <Welcome/>
//       <Dock/>
      

//       <Terminal/>
//       <Safari/>
//       <Resume/>
//       <Finder/>
//       <TextFile />
//       <ImageFile/>
//       <Contact/>
//       <Photos/>
//       {/* <Trash/> */}
//       <ControlCenter />
    

//       <Home/>
//     </main>
//   )
// }

// export default App




// // import { useState } from "react";
// // import gsap from "gsap";
// // import { Draggable } from "gsap/Draggable";

// // import { Navbar, Welcome, Dock, Home } from "#components";
// // import * as Windows from "#windows";

// // gsap.registerPlugin(Draggable);

// // const App = () => {
// //   const [openWindows, setOpenWindows] = useState([]);
// //   const [activeWindow, setActiveWindow] = useState(null);

// //   const openWindow = (name) => {
// //     if (!openWindows.includes(name)) {
// //       setOpenWindows([...openWindows, name]);
// //     }
// //     setActiveWindow(name);
// //   };

// //   const closeWindow = (name) => {
// //     setOpenWindows(openWindows.filter((w) => w !== name));
// //   };

// //   return (
// //     <main className="w-full h-screen overflow-hidden relative bg-black">
      
// //       {/* Top UI */}
// //       <Navbar />
// //       <Welcome />

// //       {/* Windows Layer */}
// //       <div className="absolute inset-0">
// //         {openWindows.map((win, index) => {
// //           const Component = Windows[win];
// //           if (!Component) return null;

// //           return (
// //             <Component
// //               key={win}
// //               isActive={activeWindow === win}
// //               onClick={() => setActiveWindow(win)}
// //               onClose={() => closeWindow(win)}
// //               style={{ zIndex: activeWindow === win ? 100 : index }}
// //             />
// //           );
// //         })}
// //       </div>

// //       {/* Bottom UI */}
// //       <Dock openWindow={openWindow} />
// //       <Home />
// //     </main>
// //   );
// // };

// // export default App;










import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Navbar, Welcome, Dock, Home } from "#components";
import {
  Contact,
  Finder,
  ImageFile,
  Photos,
  Resume,
  Safari,
  Terminal,
  TextFile,
} from "#windows";

import ControlCenter from "#components/ControlCenter";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>

      {/* 💻 DESKTOP LAYER (brightness applied here) */}
      <div id="desktop" className="relative w-full h-screen">

        {/* 🌄 BACKGROUND */}
        <Home />

        {/* 🧭 NAVBAR */}
        <Navbar />

        {/* 🪟 WINDOWS */}
        <Finder />
        <Terminal />
        <Safari />
        <Resume />
        <TextFile />
        <ImageFile />
        <Contact />
        <Photos />

        {/* ⚓ DOCK */}
        <Dock />

      </div>

      {/* 🎛 CONTROL CENTER (OUTSIDE desktop) */}
      <ControlCenter />

      {/* 🎉 WELCOME (optional overlay) */}
      <Welcome />

    </main>
  );
};

export default App;