"use client";

import { Maximize, Pause, Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      await videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = async () => {
    if (!videoRef.current) return;

    await videoRef.current.requestFullscreen();
  };

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-sm">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster="/images/course-video-poster.jpg"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Center Play */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={togglePlay}
          className="flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-xl transition hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="size-7" />
          ) : (
            <Play className="ml-1 size-7" />
          )}
        </button>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-linear-to-t from-black/80 to-transparent px-4 pb-4 pt-10 text-white">
        <button type="button" onClick={togglePlay}>
          {isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </button>

        <div className="h-1 flex-1 rounded-full bg-white/30">
          <div className="h-full w-[35%] rounded-full bg-primary" />
        </div>

        <span className="hidden text-xs sm:block">07:24 / 20:00</span>

        <Volume2 className="size-4" />

        <button type="button" onClick={handleFullscreen}>
          <Maximize className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
// "use client";

// import { Maximize, Pause, Play, Volume2 } from "lucide-react";
// import { useState } from "react";

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   return (
//     <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-md">
//       <video
//         className="h-full w-full object-cover"
//         poster="/images/course-video-poster.jpg"
//       />

//       <div className="absolute inset-0 flex items-center justify-center">
//         <button
//           onClick={() => setIsPlaying(!isPlaying)}
//           className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105"
//         >
//           {isPlaying ? (
//             <Pause className="h-6 w-6" />
//           ) : (
//             <Play className="ml-1 h-6 w-6" />
//           )}
//         </button>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-black/60 px-4 py-3 text-white">
//         <button>
//           {isPlaying ? (
//             <Pause className="h-4 w-4" />
//           ) : (
//             <Play className="h-4 w-4" />
//           )}
//         </button>

//         <div className="h-1 flex-1 rounded-full bg-white/30">
//           <div className="h-full w-[35%] rounded-full bg-primary" />
//         </div>

//         <span className="text-xs">07:24 / 20:00</span>

//         <Volume2 className="h-4 w-4" />

//         <Maximize className="h-4 w-4 cursor-pointer" />
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
