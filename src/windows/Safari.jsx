// import { WindowControls } from "#components"
// import WindowWrapper from "#hoc/WindowWrapper"
// import { ChevronLeft, ChevronRight, Copy, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";

// const Safari = () => {
//   return (
//     <>
//       <div id="window-header">
//         <WindowControls target="safari"/>

//         <PanelLeft className="ml-10 icon"/>

//         <div className="flex items-center gap-1 ml-5">
//             <ChevronLeft className="icon"/>
//             <ChevronRight className="icon"/>
//         </div>

//         <div className="flex-1 flex-center gap-3">
        
//             <ShieldHalf className="icon"/>

//             <div className="search">
//                 <Search className="icon"/>

//                 <input type="text" 
//                 placeholder="Search or enter website name" className="flex-1"/>
//             </div>
//         </div>

//         <div className="flex items-center gap-5">
//             <Share className="icon"/>
//             <Plus className="icon"/>
//             <Copy className="icon"/>
//         </div>

//       </div>
//     </>
//   )
// }

// const SafariWindow = WindowWrapper(Safari, "safari");

// export default SafariWindow;







// import { WindowControls } from "#components"
// import { blogPosts } from "#constants";
// import WindowWrapper from "#hoc/WindowWrapper"
// import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";

// const Safari = () => {
//   return (
//     // 🔥 CHANGE 1: Added parent container for auto-sizing
//     // <section className="flex flex-col w-fit h-fit min-w-[600px]">
//     <section className="flex flex-col w-fit h-fit min-w-[600px]">

//       <div id="window-header" className="flex items-center gap-3 p-2 bg-gray-200">

//         <WindowControls target="safari"/>

//         <PanelLeft className="ml-6 icon cursor-pointer"/>

//         <div className="flex items-center gap-1 ml-3">
//           <ChevronLeft className="icon cursor-pointer"/>
//           <ChevronRight className="icon cursor-pointer"/>
//         </div>

//         <div className="flex-1 flex items-center justify-center gap-3">
//           <ShieldHalf className="icon"/>

//           {/* <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 w-full max-w-md"> */}
//           <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 w-full min-w-[600px]">
//             <Search className="icon"/>

//             <input
//               type="text"
//               placeholder="Search or enter website name"
//               className="flex-1 bg-transparent outline-none text-sm"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-5">
//           <Share className="icon cursor-pointer"/>
//           <Plus className="icon cursor-pointer"/>
//           <Copy className="icon cursor-pointer"/>
//         </div>

//       </div>

//       <div className="blog">
//         <h2>My Developer Blog</h2>
//         <div className="blog">
//             {blogPosts.map(({ id, image, title, date, link })=>(
//                 <div key={id} className="blog-post">
//                     <div className="col-span-2">
//                         <img src={image} alt={title} />
//                     </div>
//                     <div className="content">
//                         <p>{date}</p>
//                         <h3>{title}</h3>
//                         <a href={link} target="_blank" rel="noopener norreferrer">
//                             Check out the full post <MoveRight className="icon-hover"/>
//                         </a>
//                     </div>
//                 </div>
//             ))}
//         </div>
//       </div>

//     </section>
//   )
// }

// const SafariWindow = WindowWrapper(Safari, "safari");

// export default SafariWindow;








// import { WindowControls } from "#components";
// import WindowWrapper from "#hoc/WindowWrapper";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   X,
// } from "lucide-react";
// import { useState, useEffect } from "react";

// const DEFAULT_URL = "https://example.com";

// const Safari = () => {
//   const [tabs, setTabs] = useState([
//     { id: 1, url: DEFAULT_URL, history: [DEFAULT_URL], index: 0 },
//   ]);
//   const [activeTab, setActiveTab] = useState(1);
//   const [input, setInput] = useState(DEFAULT_URL);

//   const currentTab = tabs.find((t) => t.id === activeTab);

//   /* 🔥 SYNC INPUT WITH TAB */
//   useEffect(() => {
//     if (currentTab) {
//       setInput(currentTab.url);
//     }
//   }, [activeTab, currentTab?.url]);

//   /* 🔍 SEARCH / URL */
//   // const handleSearch = (e) => {
//   //   if (e.key !== "Enter") return;

//   //   let url = input.trim();

//   //   // If not URL → Google search
//   //   if (!url.includes(".")) {
//   //     url = `https://duckduckgo.com/?q=${url}`;
//   //   }

//   //   // Add https if missing
//   //   if (!url.startsWith("http")) {
//   //     url = `https://${url}`;
//   //   }

//   //   updateTab(url);
//   // };

//   const handleSearch = (e) => {
//   if (e.key !== "Enter") return;

//   const query = input.trim();

//   // Open YOUR custom search page instead
//   updateTab(`/search?q=${query}`);
// };

//   /* 🔄 UPDATE TAB */
//   const updateTab = (url) => {
//     setTabs((prev) =>
//       prev.map((tab) => {
//         if (tab.id !== activeTab) return tab;

//         const newHistory = tab.history.slice(0, tab.index + 1);
//         newHistory.push(url);

//         return {
//           ...tab,
//           url,
//           history: newHistory,
//           index: newHistory.length - 1,
//         };
//       })
//     );
//   };

//   /* ⬅ BACK */
//   const goBack = () => {
//     setTabs((prev) =>
//       prev.map((tab) => {
//         if (tab.id !== activeTab || tab.index === 0) return tab;

//         return {
//           ...tab,
//           index: tab.index - 1,
//           url: tab.history[tab.index - 1],
//         };
//       })
//     );
//   };

//   /* ➡ FORWARD */
//   const goForward = () => {
//     setTabs((prev) =>
//       prev.map((tab) => {
//         if (
//           tab.id !== activeTab ||
//           tab.index === tab.history.length - 1
//         )
//           return tab;

//         return {
//           ...tab,
//           index: tab.index + 1,
//           url: tab.history[tab.index + 1],
//         };
//       })
//     );
//   };

//   /* ➕ NEW TAB */
//   const newTab = () => {
//     const id = Date.now();

//     const newTabs = [
//       ...tabs,
//       { id, url: DEFAULT_URL, history: [DEFAULT_URL], index: 0 },
//     ];

//     setTabs(newTabs);
//     setActiveTab(id);
//   };

//   /* ❌ CLOSE TAB */
//   const closeTab = (id) => {
//     if (tabs.length === 1) return;

//     const filtered = tabs.filter((t) => t.id !== id);

//     setTabs(filtered);

//     if (id === activeTab) {
//       setActiveTab(filtered[0].id);
//     }
//   };

//   return (
//     <section className="flex flex-col w-[1000px] h-[600px] rounded-xl overflow-hidden shadow-2xl">

//       {/* HEADER */}
//       <div className="bg-white/70 backdrop-blur-xl border-b">

//         <div className="flex items-center gap-3 p-2">
//           <WindowControls target="safari" />

//           <ChevronLeft className="cursor-pointer" onClick={goBack} />
//           <ChevronRight className="cursor-pointer" onClick={goForward} />

//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleSearch}
//             placeholder="Search or enter URL"
//             className="flex-1 px-3 py-1 rounded-md bg-white border outline-none text-sm"
//           />

//           <Plus className="cursor-pointer" onClick={newTab} />
//         </div>

//         {/* TABS */}
//         <div className="flex gap-2 px-2 pb-2 overflow-x-auto">
//           {tabs.map((tab) => (
//             <div
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`
//                 flex items-center gap-2 px-3 py-1 text-xs rounded-md cursor-pointer
//                 ${tab.id === activeTab ? "bg-white" : "bg-gray-200 opacity-60"}
//               `}
//             >
//               <span className="truncate max-w-[120px]">
//                 {tab.url.replace("https://", "")}
//               </span>

//               <X
//                 size={12}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   closeTab(tab.id);
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* WEB VIEW */}
//       <div className="flex-1 bg-white">
//         {/* <iframe
//           src={currentTab?.url}
//           className="w-full h-full"
//           title="browser"
//         /> */}
//         <div className="w-full h-full bg-white">
//   {currentTab.url.startsWith("/search") ? (
//     <Search />
//   ) : (
//     <iframe src={currentTab.url} className="w-full h-full" />
//   )}
// </div>
//       </div>
//     </section>
//   );
// };

// const SafariWindow = WindowWrapper(Safari, "safari");

// export default SafariWindow;








// import { WindowControls } from "#components";
// import WindowWrapper from "#hoc/WindowWrapper";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ShieldHalf,
//   Search,
// } from "lucide-react";

// const favorites = [
//   { name: "Website", icon: "/icons/web.png", url: "https://yourportfolio.com" },
//   { name: "GitHub", icon: "/icons/github.png", url: "https://github.com" },
//   { name: "LinkedIn", icon: "/icons/linkedin.png", url: "https://linkedin.com" },
//   { name: "Twitter", icon: "/icons/twitter.png", url: "https://twitter.com" },
//   { name: "Email", icon: "/icons/mail.png", url: "mailto:you@email.com" },
// ];

// const frequent = [
//   { name: "YouTube", icon: "/icons/youtube.png", url: "https://youtube.com" },
//   { name: "Google", icon: "/icons/google.png", url: "https://google.com" },
//   { name: "Reddit", icon: "/icons/reddit.png", url: "https://reddit.com" },
//   { name: "Dribbble", icon: "/icons/dribbble.png", url: "https://dribbble.com" },
//   { name: "Pinterest", icon: "/icons/pinterest.png", url: "https://pinterest.com" },
//   { name: "Figma", icon: "/icons/figma.png", url: "https://figma.com" },
// ];

// const Safari = () => {
//   const openSite = (url) => {
//     window.open(url, "_blank");
//   };

// const handleSearch = (query) => {
//   if (!query) return;

//   const trimmed = query.trim();

//   // 🔥 If user enters URL → open directly
//   if (
//     trimmed.startsWith("http://") ||
//     trimmed.startsWith("https://") ||
//     trimmed.includes(".com") ||
//     trimmed.includes(".in") ||
//     trimmed.includes(".org")
//   ) {
//     const url = trimmed.startsWith("http")
//       ? trimmed
//       : `https://${trimmed}`;

//     window.open(url, "_blank");
//   } else {
//     // 🔍 Otherwise → Google search
//     window.open(
//       `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`,
//       "_blank"
//     );
//   }
// };

//   return (
//     <section className="flex flex-col w-[900px] h-[600px] bg-[#f6f6f7] rounded-xl overflow-hidden">

//       {/* HEADER */}
//       <div id="window-header" className="flex items-center gap-3 px-4 py-2 bg-gray-100">
//         <WindowControls target="safari" />

//         <ChevronLeft className="icon cursor-pointer" />
//         <ChevronRight className="icon cursor-pointer" />

//         <div className="flex-1 flex justify-center">
//           <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border w-[400px]">
//             <ShieldHalf size={14} />
//             <Search size={14} />
//             {/* <input
//               placeholder="Search or enter website name"
//               className="flex-1 outline-none text-sm bg-transparent"
//             /> */}
//             <input
//   type="text"
//   placeholder="Search or enter website name"
//   className="flex-1 outline-none text-sm bg-transparent pointer-events-auto"
//   onClick={(e) => e.stopPropagation()}   // ✅ IMPORTANT
//   onKeyDown={(e) => {
//     if (e.key === "Enter") {
//       const value = e.target.value.trim();
//       if (!value) return;

//       if (
//         value.startsWith("http") ||
//         value.includes(".com") ||
//         value.includes(".in") ||
//         value.includes(".org")
//       ) {
//         window.open(
//           value.startsWith("http") ? value : `https://${value}`,
//           "_blank"
//         );
//       } else {
//         window.open(
//           `https://www.google.com/search?q=${encodeURIComponent(value)}`,
//           "_blank"
//         );
//       }

//       e.target.value = "";
//     }
//   }}
// />
//           </div>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="flex-1 overflow-y-auto p-10 space-y-10">

//         {/* FAVORITES */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Favorites</h2>

//           <div className="flex gap-6 flex-wrap">
//             {favorites.map((item, i) => (
//               <div
//                 key={i}
//                 onClick={() => openSite(item.url)}
//                 className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition"
//               >
//                 <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow">
//                   <img src={item.icon} className="w-8" />
//                 </div>
//                 <p className="text-xs">{item.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* FREQUENTLY VISITED */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Frequently Visited</h2>

//           <div className="grid grid-cols-6 gap-6">
//             {frequent.map((item, i) => (
//               <div
//                 key={i}
//                 onClick={() => openSite(item.url)}
//                 className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition"
//               >
//                 <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow">
//                   <img src={item.icon} className="w-8" />
//                 </div>
//                 <p className="text-xs text-center">{item.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* PRIVACY CARD */}
//         <div className="bg-white rounded-xl p-5 shadow flex items-center gap-3">
//           <ShieldHalf />
//           <p className="text-sm">
//             Safari blocked trackers from profiling you.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// const SafariWindow = WindowWrapper(Safari, "safari");

// export default SafariWindow;











// import { WindowControls } from "#components";
// import WindowWrapper from "#hoc/WindowWrapper";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ShieldHalf,
//   Search,
// } from "lucide-react";

// /* 🔥 FAVORITES */
// const favorites = [
//   { name: "Website", icon: "/icons/web.png", url: "https://yourportfolio.com" },
//   { name: "GitHub", icon: "/icons/github.png", url: "https://github.com" },
//   { name: "LinkedIn", icon: "/icons/linkedin.png", url: "https://linkedin.com" },
//   { name: "Twitter", icon: "/icons/twitter.png", url: "https://twitter.com" },
//   { name: "Email", icon: "/icons/mail.png", url: "mailto:you@email.com" },
// ];

// /* 🔥 FREQUENT */
// const frequent = [
//   { name: "YouTube", icon: "/icons/youtube.png", url: "https://youtube.com" },
//   { name: "Google", icon: "/icons/google.png", url: "https://google.com" },
//   { name: "Reddit", icon: "/icons/reddit.png", url: "https://reddit.com" },
//   { name: "Dribbble", icon: "/icons/dribbble.png", url: "https://dribbble.com" },
//   { name: "Pinterest", icon: "/icons/pinterest.png", url: "https://pinterest.com" },
//   { name: "Figma", icon: "/icons/figma.png", url: "https://figma.com" },
// ];

// const Safari = () => {
//   /* 🔥 OPEN SITE */
//   const openSite = (url) => {
//     window.open(url, "_blank");
//   };

//   /* 🔥 SEARCH FUNCTION */
//   const handleSearch = (value) => {
//     if (!value) return;

//     const query = value.trim();

//     if (
//       query.startsWith("http") ||
//       query.includes(".com") ||
//       query.includes(".in") ||
//       query.includes(".org")
//     ) {
//       window.open(
//         query.startsWith("http") ? query : `https://${query}`,
//         "_blank"
//       );
//     } else {
//       window.open(
//         `https://www.google.com/search?q=${encodeURIComponent(query)}`,
//         "_blank"
//       );
//     }
//   };

//   return (
//     <section className="flex flex-col w-[900px] h-[600px] bg-[#f6f6f7] rounded-xl overflow-hidden">

//       {/* 🔥 HEADER */}
//       <div
//         id="window-header"
//         className="flex items-center gap-3 px-4 py-2 bg-gray-100"
//       >
//         <WindowControls target="safari" />

//         <ChevronLeft className="icon cursor-pointer" />
//         <ChevronRight className="icon cursor-pointer" />

//         {/* 🔍 SEARCH BAR */}
//         <div className="flex-1 flex justify-center">
//           <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border w-[400px]">
//             <ShieldHalf size={14} />
//             <Search size={14} />

//             <input
//   type="text"
//   placeholder="Search or enter website name"
//   className="flex-1 outline-none text-sm bg-transparent"
//   onClick={(e) => e.stopPropagation()}
//   onMouseDown={(e) => e.stopPropagation()}
//   onKeyDown={(e) => {
//     if (e.key === "Enter") {
//       handleSearch(e.target.value);
//     }
//   }}
// />
//           </div>
//         </div>
//       </div>

//       {/* 🔥 CONTENT */}
//       <div className="flex-1 overflow-y-auto p-10 space-y-10">

//         {/* ⭐ FAVORITES */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Favorites</h2>

//           <div className="flex gap-6 flex-wrap">
//             {favorites.map((item, i) => (
//               <div
//                 key={i}
//                 onClick={() => openSite(item.url)}
//                 className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition"
//               >
//                 <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow">
//                   <img
//                     src={item.icon}
//                     className="w-8"
//                     onError={(e) =>
//                       (e.target.src =
//                         "https://cdn-icons-png.flaticon.com/512/565/565547.png")
//                     }
//                   />
//                 </div>
//                 <p className="text-xs">{item.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 🔁 FREQUENT */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">
//             Frequently Visited
//           </h2>

//           <div className="grid grid-cols-6 gap-6">
//             {frequent.map((item, i) => (
//               <div
//                 key={i}
//                 onClick={() => openSite(item.url)}
//                 className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition"
//               >
//                 <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow">
//                   <img
//                     src={item.icon}
//                     className="w-8"
//                     onError={(e) =>
//                       (e.target.src =
//                         "https://cdn-icons-png.flaticon.com/512/565/565547.png")
//                     }
//                   />
//                 </div>
//                 <p className="text-xs text-center">
//                   {item.name}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 🔒 PRIVACY CARD */}
//         <div className="bg-white rounded-xl p-5 shadow flex items-center gap-3">
//           <ShieldHalf />
//           <p className="text-sm">
//             Safari blocked trackers from profiling you.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// const SafariWindow = WindowWrapper(Safari, "safari");

// export default SafariWindow;







import { useState } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import {
  ChevronLeft,
  ChevronRight,
  ShieldHalf,
  Search,
} from "lucide-react";

/* ⭐ FAVORITES */
const favorites = [
  { name: "Website", icon: "/icons/web.png", url: "https://yourportfolio.com" },
  { name: "GitHub", icon: "/icons/github.png", url: "https://github.com" },
  { name: "LinkedIn", icon: "/icons/linkedin.png", url: "https://linkedin.com" },
  { name: "Twitter", icon: "/icons/twitter.png", url: "https://twitter.com" },
  { name: "Email", icon: "/icons/mail.png", url: "mailto:you@email.com" },
];

/* 🔁 FREQUENT */
const frequent = [
  { name: "YouTube", icon: "/icons/youtube.png", url: "https://youtube.com" },
  { name: "Google", icon: "/icons/google.png", url: "https://google.com" },
  { name: "Reddit", icon: "/icons/reddit.png", url: "https://reddit.com" },
  { name: "Dribbble", icon: "/icons/dribbble.png", url: "https://dribbble.com" },
  { name: "Pinterest", icon: "/icons/pinterest.png", url: "https://pinterest.com" },
  { name: "Figma", icon: "/icons/figma.png", url: "https://figma.com" },
];

const Safari = () => {
  const [query, setQuery] = useState("");

  /* 🔥 OPEN SITE */
  const openSite = (url) => {
    window.open(url, "_blank");
  };

  /* 🔍 SEARCH */
  const handleSearch = () => {
    if (!query) return;

    const value = query.trim();

    if (
      value.startsWith("http") ||
      value.includes(".com") ||
      value.includes(".in") ||
      value.includes(".org")
    ) {
      window.open(
        value.startsWith("http") ? value : `https://${value}`,
        "_blank"
      );
    } else {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(value)}`,
        "_blank"
      );
    }

    setQuery(""); // clear after search (optional)
  };

  return (
    <section className="flex flex-col w-[900px] h-[600px] bg-[#f6f6f7] rounded-xl overflow-hidden">

      {/* HEADER */}
      <div
        id="window-header"
        className="flex items-center gap-3 px-4 py-2 bg-gray-100"
      >
        <WindowControls target="safari" />

        <ChevronLeft className="icon cursor-pointer" />
        <ChevronRight className="icon cursor-pointer" />

        {/* SEARCH BAR */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white border w-[400px]">
            <ShieldHalf size={14} />
            <Search size={14} />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search or enter website name"
              className="flex-1 outline-none text-sm bg-transparent"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-10 space-y-10">

        {/* FAVORITES */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Favorites</h2>

          <div className="flex gap-6 flex-wrap">
            {favorites.map((item, i) => (
              <div
                key={i}
                onClick={() => openSite(item.url)}
                className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow">
                  <img
                    src={item.icon}
                    className="w-8"
                    onError={(e) =>
                      (e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/565/565547.png")
                    }
                  />
                </div>
                <p className="text-xs">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FREQUENT */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Frequently Visited
          </h2>

          <div className="grid grid-cols-6 gap-6">
            {frequent.map((item, i) => (
              <div
                key={i}
                onClick={() => openSite(item.url)}
                className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow">
                  <img
                    src={item.icon}
                    className="w-8"
                    onError={(e) =>
                      (e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/565/565547.png")
                    }
                  />
                </div>
                <p className="text-xs text-center">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PRIVACY */}
        <div className="bg-white rounded-xl p-5 shadow flex items-center gap-3">
          <ShieldHalf />
          <p className="text-sm">
            Safari blocked trackers from profiling you.
          </p>
        </div>
      </div>
    </section>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;