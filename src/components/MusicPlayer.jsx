// // // import { useRef, useState } from "react";
// // // import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

// // // const songs = [
// // // //   {
// // // //     title: "Chill Beat",
// // // //     src: "/music/song1.mp3",
// // // //   },
// // // //   {
// // // //     title: "Focus Flow",
// // // //     src: "/music/song2.mp3",
// // // //   },
// // //   {
// // //     title: "My Track",
// // //     src: "/music/song1.mp3",
// // //   },

// // // ];

// // // const MusicPlayer = ({ volume }) => {
// // //   const audioRef = useRef(null);
// // //   const [index, setIndex] = useState(0);
// // //   const [playing, setPlaying] = useState(false);

// // //   const playPause = () => {
// // //     if (!audioRef.current) return;

// // //     if (playing) {
// // //       audioRef.current.pause();
// // //     } else {
// // //       audioRef.current.play();
// // //     }

// // //     setPlaying(!playing);
// // //   };

// // //   const next = () => {
// // //     setIndex((prev) => (prev + 1) % songs.length);
// // //     setPlaying(false);
// // //   };

// // //   const prev = () => {
// // //     setIndex((prev) =>
// // //       prev === 0 ? songs.length - 1 : prev - 1
// // //     );
// // //     setPlaying(false);
// // //   };

// // //   return (
// // //     <div className="bg-white/10 p-3 rounded-xl">
// // //       <p className="text-sm">{songs[index].title}</p>

// // //       <div className="flex justify-center gap-4 mt-2">
// // //         <button onClick={prev}><SkipBack size={18} /></button>
// // //         <button onClick={playPause}>
// // //           {playing ? <Pause size={18} /> : <Play size={18} />}
// // //         </button>
// // //         <button onClick={next}><SkipForward size={18} /></button>
// // //       </div>

// // //       <audio
// // //         ref={audioRef}
// // //         src={songs[index].src}
// // //         volume={volume / 100}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default MusicPlayer;








// // import { useRef, useState, useEffect } from "react";
// // import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

// // const songs = [
// //   {
// //     title: "My Track",
// //     src: "/music/song1.mp3",
// //   },
// // ];

// // const MusicPlayer = ({ volume }) => {
// //   const audioRef = useRef(null);
// //   const [index, setIndex] = useState(0);
// //   const [playing, setPlaying] = useState(false);

// //   /* 🔊 FIX: REAL VOLUME CONTROL */
// //   useEffect(() => {
// //     if (audioRef.current) {
// //       audioRef.current.volume = volume / 100;
// //     }
// //   }, [volume]);

// //   const playPause = () => {
// //     if (!audioRef.current) return;

// //     if (playing) {
// //       audioRef.current.pause();
// //     } else {
// //       audioRef.current.play();
// //     }

// //     setPlaying(!playing);
// //   };

// //   const next = () => {
// //     setIndex((prev) => (prev + 1) % songs.length);
// //     setPlaying(false);
// //   };

// //   const prev = () => {
// //     setIndex((prev) =>
// //       prev === 0 ? songs.length - 1 : prev - 1
// //     );
// //     setPlaying(false);
// //   };

// //   return (
// //     <div className="bg-white/10 p-3 rounded-xl">
// //       <p className="text-sm">{songs[index].title}</p>

// //       <div className="flex justify-center gap-4 mt-2">
// //         <button onClick={prev} className="cursor-pointer">
// //           <SkipBack size={18} />
// //         </button>

// //         <button onClick={playPause} className="cursor-pointer">
// //           {playing ? <Pause size={18} /> : <Play size={18} />}
// //         </button>

// //         <button onClick={next} className="cursor-pointer">
// //           <SkipForward size={18} />
// //         </button>
// //       </div>

// //       {/* 🎧 AUDIO */}
// //       <audio
// //         ref={audioRef}
// //         src={songs[index].src}
// //         onEnded={next} // auto next
// //       />
// //     </div>
// //   );
// // };

// // export default MusicPlayer;





// import { useRef, useState, useEffect } from "react";
// import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

// const songs = [
//   {
//     title: "My Track",
//     src: "/music/song1.mp3",
//   },
// ];

// const formatTime = (time) => {
//   if (!time) return "0:00";
//   const mins = Math.floor(time / 60);
//   const secs = Math.floor(time % 60)
//     .toString()
//     .padStart(2, "0");
//   return `${mins}:${secs}`;
// };

// const MusicPlayer = ({ volume }) => {
//   const audioRef = useRef(null);

//   const [index, setIndex] = useState(0);
//   const [playing, setPlaying] = useState(false);

//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   /* 🔊 VOLUME CONTROL */
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume / 100;
//     }
//   }, [volume]);

//   /* ⏱ UPDATE TIME */
//   useEffect(() => {
//     const audio = audioRef.current;

//     const updateTime = () => {
//       setCurrentTime(audio.currentTime);
//     };

//     const setMeta = () => {
//       setDuration(audio.duration);
//     };

//     if (audio) {
//       audio.addEventListener("timeupdate", updateTime);
//       audio.addEventListener("loadedmetadata", setMeta);
//     }

//     return () => {
//       if (audio) {
//         audio.removeEventListener("timeupdate", updateTime);
//         audio.removeEventListener("loadedmetadata", setMeta);
//       }
//     };
//   }, []);

//   const playPause = () => {
//     if (!audioRef.current) return;

//     if (playing) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }

//     setPlaying(!playing);
//   };

//   const next = () => {
//     setIndex((prev) => (prev + 1) % songs.length);
//     setPlaying(false);
//   };

//   const prev = () => {
//     setIndex((prev) =>
//       prev === 0 ? songs.length - 1 : prev - 1
//     );
//     setPlaying(false);
//   };

//   /* 🎚 SEEK */
//   const handleSeek = (e) => {
//     const time = e.target.value;
//     audioRef.current.currentTime = time;
//     setCurrentTime(time);
//   };

//   return (
//     <div className="bg-white/10 p-3 rounded-xl space-y-2">
//       <p className="text-sm">{songs[index].title}</p>

//       {/* 🎚 PROGRESS BAR */}
//       <div className="flex items-center gap-2 text-xs">
//         <span>{formatTime(currentTime)}</span>

//         <input
//           type="range"
//           min="0"
//           max={duration || 0}
//           value={currentTime}
//           onChange={handleSeek}
//           className="flex-1 cursor-pointer"
//         />

//         <span>{formatTime(duration)}</span>
//       </div>

//       {/* CONTROLS */}
//       <div className="flex justify-center gap-4 mt-2">
//         <button onClick={prev} className="cursor-pointer">
//           <SkipBack size={18} />
//         </button>

//         <button onClick={playPause} className="cursor-pointer">
//           {playing ? <Pause size={18} /> : <Play size={18} />}
//         </button>

//         <button onClick={next} className="cursor-pointer">
//           <SkipForward size={18} />
//         </button>
//       </div>

//       {/* AUDIO */}
//       <audio
//         ref={audioRef}
//         src={songs[index].src}
//         onEnded={next}
//       />
//     </div>
//   );
// };

// export default MusicPlayer;






// import { useRef, useState, useEffect } from "react";
// import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

// const songs = [
//   {
//     title: "My Track",
//     src: "/music/song1.mp3",
//     cover: "/music/cover1.jpg", // 👈 ADD YOUR IMAGE
//   },
// ];

// const formatTime = (time) => {
//   if (!time) return "0:00";
//   const mins = Math.floor(time / 60);
//   const secs = Math.floor(time % 60)
//     .toString()
//     .padStart(2, "0");
//   return `${mins}:${secs}`;
// };

// const MusicPlayer = ({ volume }) => {
//   const audioRef = useRef(null);

//   const [index, setIndex] = useState(0);
//   const [playing, setPlaying] = useState(false);

//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   /* 🔊 VOLUME */
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume / 100;
//     }
//   }, [volume]);

//   /* ⏱ TIME TRACKING */
//   useEffect(() => {
//     const audio = audioRef.current;

//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const setMeta = () => setDuration(audio.duration);

//     if (audio) {
//       audio.addEventListener("timeupdate", updateTime);
//       audio.addEventListener("loadedmetadata", setMeta);
//     }

//     return () => {
//       if (audio) {
//         audio.removeEventListener("timeupdate", updateTime);
//         audio.removeEventListener("loadedmetadata", setMeta);
//       }
//     };
//   }, []);

//   const playPause = () => {
//     if (!audioRef.current) return;

//     if (playing) audioRef.current.pause();
//     else audioRef.current.play();

//     setPlaying(!playing);
//   };

//   const next = () => {
//     setIndex((prev) => (prev + 1) % songs.length);
//     setPlaying(false);
//   };

//   const prev = () => {
//     setIndex((prev) =>
//       prev === 0 ? songs.length - 1 : prev - 1
//     );
//     setPlaying(false);
//   };

//   /* 🎚 SEEK */
//   const handleSeek = (e) => {
//     const time = e.target.value;
//     audioRef.current.currentTime = time;
//     setCurrentTime(time);
//   };

//   return (
//     <div className="bg-white/10 p-3 rounded-xl space-y-3">
      
//       {/* 🎵 COVER IMAGE */}
//       <div className="w-full h-[120px] rounded-lg overflow-hidden">
//         <img
//           src={songs[index].cover}
//           alt="cover"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* 🎶 TITLE */}
//       <p className="text-sm text-center font-medium">
//         {songs[index].title}
//       </p>

//       {/* 🎚 PROGRESS */}
//       <div className="flex items-center gap-2 text-xs">
//         <span>{formatTime(currentTime)}</span>

//         <input
//           type="range"
//           min="0"
//           max={duration || 0}
//           value={currentTime}
//           onChange={handleSeek}
//           className="flex-1 cursor-pointer"
//         />

//         <span>{formatTime(duration)}</span>
//       </div>

//       {/* 🎮 CONTROLS */}
//       <div className="flex justify-center gap-4">
//         <button onClick={prev} className="cursor-pointer">
//           <SkipBack size={18} />
//         </button>

//         <button
//           onClick={playPause}
//           className="cursor-pointer bg-white text-black p-2 rounded-full"
//         >
//           {playing ? <Pause size={18} /> : <Play size={18} />}
//         </button>

//         <button onClick={next} className="cursor-pointer">
//           <SkipForward size={18} />
//         </button>
//       </div>

//       {/* AUDIO */}
//       <audio
//         ref={audioRef}
//         src={songs[index].src}
//         onEnded={next}
//       />
//     </div>
//   );
// };

// export default MusicPlayer;











import { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

const songs = [
  {
    title: "Sunflower (Spider-Man: Into the Spider-Verse)",
    artist: "Post Malone and Swae Lee",
    src: "/music/song1.mp3",
    cover: "/music/cover1.jpg",
  },
];

const formatTime = (time) => {
  if (!time) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const MusicPlayer = ({ volume }) => {
  const audioRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = songs[index];

  /* 🔊 VOLUME */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  /* ⏱ TIME */
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", setMeta);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", setMeta);
      }
    };
  }, []);

  const playPause = () => {
    if (!audioRef.current) return;

    if (playing) audioRef.current.pause();
    else audioRef.current.play();

    setPlaying(!playing);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % songs.length);
    setPlaying(false);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
    setPlaying(false);
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden">

      {/* 🌈 BACKGROUND BLUR */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-40"
        style={{ backgroundImage: `url(${song.cover})` }}
      />

      {/* 🧊 GLASS CARD */}
      <div className="relative bg-black/50 backdrop-blur-xl p-4 rounded-2xl space-y-4">

        {/* 🎵 COVER */}
        <div className="flex justify-center">
          <img
            src={song.cover}
            alt="cover"
            className="w-32 h-32 rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* 🎶 TITLE */}
        <div className="text-center">
          <p className="text-sm font-semibold">{song.title}</p>
          <p className="text-xs opacity-70">{song.artist}</p>
        </div>

        {/* 🎚 PROGRESS BAR */}
        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full cursor-pointer accent-white"
          />

          <div className="flex justify-between text-[10px] opacity-70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* 🎮 CONTROLS */}
        <div className="flex justify-center items-center gap-6">
          <button onClick={prev} className="cursor-pointer opacity-80 hover:opacity-100">
            <SkipBack size={20} />
          </button>

          <button
            onClick={playPause}
            className="bg-white text-black p-3 rounded-full shadow-md hover:scale-105 transition"
          >
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button onClick={next} className="cursor-pointer opacity-80 hover:opacity-100">
            <SkipForward size={20} />
          </button>
        </div>

        {/* AUDIO */}
        <audio
          ref={audioRef}
          src={song.src}
          onEnded={next}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;