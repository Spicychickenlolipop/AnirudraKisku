

// import useWindowStore from "#store/window";
// import { useGSAP } from "@gsap/react";
// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { Draggable } from "gsap/Draggable";

// const WindowWrapper = (Component, windowKey) => {
//   const Wrapped = (props) => {
//     const { focusWindow, windows } = useWindowStore();
//     const window = windows[windowKey];

//     const { isOpen, isMinimized, isMaximized, zIndex } = window;

//     const ref = useRef(null);

//     // ✅ STEP 4 → Hide if closed or minimized
//     useLayoutEffect(() => {
//       const el = ref.current;
//       if (!el) return;

//       el.style.display = isOpen && !isMinimized ? "block" : "none";
//     }, [isOpen, isMinimized]);

//     // ✅ Open animation
//     useGSAP(() => {
//       const el = ref.current;
//       if (!el || !isOpen || isMinimized) return;

//       gsap.fromTo(
//         el,
//         { scale: 0.8, opacity: 0, y: 40 },
//         { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out" }
//       );
//     }, [isOpen, isMinimized]);

//     // ✅ Drag (disable when maximized)
//     // useGSAP(() => {
//     //   const el = ref.current;
//     //   if (!el || isMaximized) return;

//     //   const [instance] = Draggable.create(el, {
//     //     onPress: () => focusWindow(windowKey),
//     //   });

//       const draggableRef = useRef(null);

// useGSAP(() => {
//   if (!ref.current || isMaximized) return;

//   // draggableRef.current = Draggable.create(ref.current, {
//   //   onPress: () => focusWindow(windowKey),
//   // })[0];

// // draggableRef.current = Draggable.create(ref.current, {
// //     handle: "#window-header",            // ✅ drag ONLY from header
// //     ignore: "input, textarea, button",   // ✅ allow typing & clicking
// //     onPress: () => focusWindow(windowKey),
// //   })[0];

// const header = ref.current?.querySelector("#window-header");

// if (!header) return;

// draggableRef.current = Draggable.create(ref.current, {
//   trigger: header,                 // 🔥 ONLY header triggers drag
//   handle: header,                  // extra safety
//   onPress: () => focusWindow(windowKey),
// })[0];


//   return () => draggableRef.current?.kill();

//       // return () => instance.kill();
//     }, [isMaximized]);

//     // ✅ STEP 5 → Dynamic styles
//     // const windowClasses = isMaximized
//     //   ? "fixed top-0 left-0 w-screen h-screen"
//     // //   : "absolute w-[600px] h-[400px]";
//     //     : "absolute w-fit h-fit";
//     const windowClasses = isMaximized
//   ? "fixed top-0 left-0 w-screen h-screen"
//   : windowKey === "terminal"
//   ? "absolute w-[600px] h-[400px]" // ✅ terminal fixed size
//   : "absolute w-fit h-fit";        // ✅ others auto size
    

//     return (
//       <section
//         id={windowKey}
//         ref={ref}
//         style={{ zIndex }}
//         className={`${windowClasses} bg-white text-black-400 rounded-xl shadow-xl border border-gray-100`}
//         // className="absolute"
//       >
//         <Component {...props} />
//       </section>
//     );
//   };

//   Wrapped.displayName = `WindowWrapper(${
//     Component.displayName || Component.name || "Component"
//   })`;

//   return Wrapped;
// };

// export default WindowWrapper;




import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const window = windows[windowKey];

    const { isOpen, isMinimized, isMaximized, zIndex } = window;

    const ref = useRef(null);
    const draggableRef = useRef(null);

    /* ================= SHOW / HIDE ================= */
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen && !isMinimized ? "block" : "none";
    }, [isOpen, isMinimized]);

    /* ================= OPEN ANIMATION ================= */
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMinimized) return;

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }
      );
    }, [isOpen, isMinimized]);

    /* ================= DRAG ================= */
    useGSAP(() => {
      if (!ref.current || isMaximized) return;

      const header = ref.current.querySelector("#window-header");
      if (!header) return;

      // 🔥 kill previous instance (VERY IMPORTANT)
      draggableRef.current?.kill();

      draggableRef.current = Draggable.create(ref.current, {
        trigger: header,            // ✅ drag only from header
        handle: header,
        bounds: "#desktop",         // ✅ keep inside screen
        inertia: true,              // ✅ smooth drag
        onPress: () => focusWindow(windowKey),
      })[0];

      return () => draggableRef.current?.kill();
    }, [isMaximized, windowKey]);

    /* ================= WINDOW SIZE ================= */
    const windowClasses = isMaximized
      ? "fixed top-0 left-0 w-screen h-screen"
      : windowKey === "terminal"
      ? "absolute w-[600px] h-[400px]"
      : "absolute w-fit h-fit";

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`${windowClasses} bg-white text-black rounded-xl shadow-xl border border-gray-200`}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;