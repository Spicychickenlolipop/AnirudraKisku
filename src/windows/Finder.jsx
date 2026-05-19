// import { WindowControls } from '#components';
// import { locations } from '#constants';
// import WindowWrapper from '#hoc/WindowWrapper';
// import useLocationStore from '#store/location';
// import useWindowStore from '#store/window';
// import clsx from 'clsx';
// import { Search } from 'lucide-react';
// import useTrashStore from "#store/trash";

// const Finder = () => {
//     const { openWindow }= useWindowStore();
//     const { activeLocation, setActiveLocation } = useLocationStore();

//     const openItem = (item)=>{
//         if(item.fileType === "pdf") return openWindow("resume");
//         if(item.kind === "folder") return setActiveLocation(item);
//         if(["fig", "url"].includes(item.fileType) && item.href)
//             return window.open(item.href, "blank");
//         openWindow(`${item.fileType}${item.kind}`, item);
//     };

//     const renderList = (name,items)=> (
//         <div>
//             <h3>{name}</h3>
//         <ul>
//         {items.map((item)=>(
//         <li key={item.id} onClick={() => {
//   if (item.kind === "folder") {
//     setActiveLocation(item);
//   }
// }}
//         className={clsx(item.id === activeLocation?.id ? "active" : "not-active"
//         )}
//         >  
//         <img src={item.icon} className="w-4" alt={item.name} />
//             <p className='text-sm font-medium truncate'>{item.name}</p>
//         </li>   
//         ))}
//         </ul>
//     </div>
//     );

    
//   return (
//     <section className="w-[750px] h-[400px] flex flex-col">
//         {/* <div id="window-header"> */}
//         <div id="window-header" className="flex items-center gap-3 p-2 bg-gray-200">
//             <WindowControls target="finder"/>
//             <Search className='icon'/>
//         </div>

//         <div className='bg-white flex h-full'>
//             <div className='sidebar'>        
//                 {renderList('Favorites',Object.values(locations))}
//                 {renderList('My Projects',locations.work.children)}
//             </div>
        

//         <ul className="content">
//             {activeLocation ?.children.map((item)=>(
//                 <li key={item.id} className={item.position} onClick={()=> openItem(item)}>
//                     <img src={item.icon} alt={item.name} />
//                     <p>{item.name}</p>
//                 </li>
//             ))}
//         </ul>
//         </div>
//     </section>
//   );
// };

// const FinderWindow = WindowWrapper(Finder, "finder");

// export default FinderWindow;













import { WindowControls } from "#components";
import { locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import useTrashStore from "#store/trash";
import clsx from "clsx";
import { Search } from "lucide-react";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const {
    trash,
    moveToTrash,
    restoreFromTrash,
    emptyTrash,
  } = useTrashStore();

  /* ================= OPEN ITEM ================= */
  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");

    if (item.kind === "folder") return setActiveLocation(item);

    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  /* ================= DELETE ================= */
//   const handleDelete = (item) => {
//     moveToTrash(item, activeLocation);

//     activeLocation.children = activeLocation.children.filter(
//       (i) => i.id !== item.id
//     );

//     setActiveLocation({ ...activeLocation });
//   };
const handleDelete = (item) => {
  moveToTrash(item, activeLocation);

  const updatedChildren = activeLocation.children.filter(
    (i) => i.id !== item.id
  );

  setActiveLocation({
    ...activeLocation,
    children: updatedChildren,
  });
};




  /* ================= RESTORE ================= */
  const handleRestore = (item) => {
    restoreFromTrash(item.name);
  };

  /* ================= ITEMS ================= */
  const items = activeLocation?.isTrash
    ? trash
    : activeLocation?.children || [];

  /* ================= SIDEBAR ================= */
  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              if (item.kind === "folder") {
                setActiveLocation(item);
              }
            }}
            className={clsx(
              item.id === activeLocation?.id
                ? "active"
                : "not-active"
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="w-[750px] h-[400px] flex flex-col">
      {/* HEADER */}
      <div
        id="window-header"
        className="flex items-center gap-3 p-2 bg-gray-200"
      >
        <WindowControls target="finder" />
        <Search className="icon" />

        {/* 🧹 EMPTY TRASH BUTTON */}
        {activeLocation?.isTrash && (
          <button
            onClick={emptyTrash}
            className="ml-auto text-xs bg-red-500 text-white px-2 py-1 rounded"
          >
            Empty Trash
          </button>
        )}
      </div>

      {/* BODY */}
      <div className="bg-white flex h-full">
        {/* SIDEBAR */}
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>

        {/* CONTENT */}
        <ul className="content">
          {items.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>

              {/* 🗑 DELETE (NOT IN TRASH) */}
              {!activeLocation?.isTrash && (
                // <button
                //   onClick={(e) => {
                //     e.stopPropagation();
                //     handleDelete(item);
                //   }}
                //   className="text-xs text-red-500"
                // >
                //   Delete
                // </button>
                <button
  onClick={(e) => {
    e.stopPropagation();
    handleDelete(item);
  }}
  className="text-xs text-red-500 cursor-pointer hover:text-red-600 transition"
>
  Delete
</button>
              )}

              {/* 🔄 RESTORE (IN TRASH) */}
              {activeLocation?.isTrash && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRestore(item);
                  }}
                  className="text-xs text-green-500"
                >
                  Restore
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;