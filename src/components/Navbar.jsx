import dayjs, { Dayjs } from "dayjs";
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";
import useControlStore from "#store/control";


const Navbar = () => {
    const { openWindow } = useWindowStore();
//     const { openWindow, closeWindow, windows } = useWindowStore();
// const { setActiveLocation } = useLocationStore();
const { togglePanel } = useControlStore();
  return (
    <nav>
        <div>
            <img src='/images/logo.svg' alt='logo'/>
            <p className='font-bold'>Anirudra's Portfolio</p>

            <ul>
                {navLinks.map(({ id, name, type })=>(
                    <li key={id} onClick={()=> openWindow(type)}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <ul>
                {/* {navIcons.map(({ id, img })=>(
                    <li key={id}>
                        <img src={img} className="icon-hover"
                         alt={`icon-${id}`}
                        />
                    </li>
                ))} */}
                  {navIcons.map((icon) => (
                    //   <img
                    //       key={icon.id}
                    //       src={icon.img}
                    //       className="cursor-pointer"
                    //       onClick={() => {
                    //           if (icon.id === 4) {
                    //               togglePanel(); // ✅ OPEN CONTROL CENTER
                    //           }
                    //       }}
                    //   />
                      <img
                          key={icon.id}
                          src={icon.img}
                          id={icon.id === 4 ? "control-toggle" : undefined} // 👈 IMPORTANT
                          className="cursor-pointer"
                          onClick={() => {
                              if (icon.id === 4) {
                                  togglePanel();
                              }
                          }}
                      />
                  ))}
            </ul>

            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
  );
};

export default Navbar



// import { useState, useRef, useEffect } from "react"; // ✅ ADDED
// import { navLinks, navIcons } from "#constants";
// import useWindowStore from "#store/window";
// import ControlCenter from "#components/ControlCenter"; // ✅ ADDED

// const Navbar = () => {
//   const { openWindow } = useWindowStore();

//   // ✅ CONTROL CENTER STATE
//   const [openControl, setOpenControl] = useState(false); // ✅ ADDED
//   const ref = useRef(null); // ✅ ADDED

//   // ✅ CLOSE ON OUTSIDE CLICK
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setOpenControl(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className="flex items-center justify-between px-5 py-2 bg-white/20 backdrop-blur-md border-b border-white/10">

//       {/* LEFT SIDE */}
//       <ul className="flex items-center gap-6">
//         {navLinks.map(({ id, name, type }) => (
//           <li
//             key={id}
//             className="cursor-pointer text-sm font-medium"
//             onClick={() => openWindow(type)}
//           >
//             {name}
//           </li>
//         ))}
//       </ul>

//       {/* RIGHT SIDE */}
//       <ul ref={ref} className="flex items-center gap-4 relative"> {/* ✅ ADDED ref */}

//         {navIcons.map(({ id, img }, index) => (
//           <li key={id}>
//             <img
//               src={img}
//               className="icon-hover cursor-pointer"
              
//               // ✅ ONLY LAST ICON OPENS CONTROL CENTER
//               onClick={() => {
//                 if (index === navIcons.length - 1) {
//                   setOpenControl((prev) => !prev);
//                 }
//               }}
//             />
//           </li>
//         ))}

//         {/* ✅ CONTROL CENTER DROPDOWN */}
//         {openControl && <ControlCenter />} {/* ✅ ADDED */}

//       </ul>
//     </nav>
//   );
// };

// export default Navbar;