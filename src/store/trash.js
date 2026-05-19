// import { create } from "zustand";

// const useTrashStore = create((set) => ({
//   trash: [],

//   moveToTrash: (item) =>
//     set((state) => ({
//       trash: [...state.trash, item],
//     })),

//   restoreFromTrash: (name) =>
//     set((state) => ({
//       trash: state.trash.filter((item) => item.name !== name),
//     })),

//   emptyTrash: () => set({ trash: [] }),
// }));

// export default useTrashStore;


// import { create } from "zustand";

// // const useTrashStore = create((set) => ({
// //   trash: [],
// const useTrashStore = create((set) => ({
//   trash: [
//     {
//       id: "love-letter",
//       name: "love-letter.txt",
//       kind: "file",
//       fileType: "txt",
//       icon: "/images/txt.png",
//       content: `Dear Recruiter ❤️,

// If you're reading this, you’ve already found one of the hidden gems in my portfolio.

// I build things with attention to detail, curiosity, and a bit of personality.

// Let’s build something amazing together.

// — Anirudra 🚀`,
//     },
//   ],

//   moveToTrash: (item, from) =>
//     set((state) => ({
//       trash: [...state.trash, { ...item, from }],
//     })),

//   restoreFromTrash: (name) =>
//     set((state) => {
//       const item = state.trash.find((i) => i.name === name);

//       if (item?.from) {
//         item.from.children.push(item);
//       }

//       return {
//         trash: state.trash.filter((i) => i.name !== name),
//       };
//     }),

//   emptyTrash: () => set({ trash: [] }),
// }));

// export default useTrashStore;




import { create } from "zustand";

const useTrashStore = create((set) => ({
  // 🔥 DEFAULT TRASH CONTENT
  trash: [
    {
      id: "love-letter",
      name: "love-letter.txt",
      kind: "file",
      fileType: "txt",
      icon: "/images/txt.png",
      content: `Dear Recruiter ❤️,

If you're reading this, you’ve discovered a hidden part of my portfolio.

I enjoy building systems that feel real, interactive, and thoughtful — not just static UI.

This portfolio itself is an example of how I think:
clean design, strong logic, and attention to detail.

Looking forward to building something impactful with you.

— Anirudra`,
    },
  ],

  /* ================= MOVE TO TRASH ================= */
  moveToTrash: (item, from) =>
    set((state) => ({
      trash: [...state.trash, { ...item, from }],
    })),

  /* ================= RESTORE ================= */
  restoreFromTrash: (name) =>
    set((state) => {
      const item = state.trash.find((i) => i.name === name);

      if (item?.from) {
        item.from.children.push(item);
      }

      return {
        trash: state.trash.filter((i) => i.name !== name),
      };
    }),

  /* ================= EMPTY TRASH ================= */
  emptyTrash: () =>
    set((state) => ({
      // ❗ keep love-letter even after empty
      trash: state.trash.filter(
        (item) => item.id === "love-letter"
      ),
    })),
}));

export default useTrashStore;