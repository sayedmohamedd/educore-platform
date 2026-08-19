// import React, { useState, useRef } from 'react';
// import { X, Play, Pause, Volume2, VolumeX, Maximize, CheckCircle2, RotateCcw, FastForward } from 'lucide-react';
// // import { Lesson } from '../types';

// interface VideoPlayerModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   lesson?: null;
//   videoUrl?: string;
//   onCompleteLesson?: (lessonId: string) => void;
//   isCompleted?: boolean;
// }

// export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
//   isOpen,
//   onClose,
//   title,
//   lesson,
//   videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//   onCompleteLesson,
//   isCompleted = false
// }) => {
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isMuted, setIsMuted] = useState(false);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [progress, setProgress] = useState(0);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   if (!isOpen) return null;

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleSpeedChange = (speed: number) => {
//     if (videoRef.current) {
//       videoRef.current.playbackRate = speed;
//       setPlaybackSpeed(speed);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       const current = videoRef.current.currentTime;
//       const duration = videoRef.current.duration;
//       if (duration) {
//         setProgress((current / duration) * 100);
//       }
//     }
//   };

//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(e.target.value);
//     if (videoRef.current && videoRef.current.duration) {
//       videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
//       setProgress(value);
//     }
//   };

//   const handleFullscreen = () => {
//     if (videoRef.current) {
//       if (videoRef.current.requestFullscreen) {
//         videoRef.current.requestFullscreen();
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
//       <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 text-white">
//           <div className="flex items-center gap-3">
//             <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full primary-gradient text-white">
//               Course Stream
//             </span>
//             <h3 className="font-bold text-lg text-white truncate max-w-lg">
//               {lesson ? lesson : title}
//             </h3>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Video Area */}
//         <div className="relative aspect-video bg-black flex items-center justify-center group">
//           <video
//             ref={videoRef}
//             src={lesson?.videoUrl || videoUrl}
//             autoPlay
//             playsInline
//             onTimeUpdate={handleTimeUpdate}
//             onEnded={() => {
//               setIsPlaying(false);
//               if (lesson && onCompleteLesson) {
//                 onCompleteLesson(lesson.id);
//               }
//             }}
//             className="w-full h-full object-contain"
//           />

//           {/* Big Center Play Overlay */}
//           {!isPlaying && (
//             <button
//               onClick={togglePlay}
//               className="absolute inset-0 m-auto w-20 h-20 bg-[#4648d4]/90 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
//             >
//               <Play className="w-10 h-10 fill-current ml-1" />
//             </button>
//           )}

//           {/* Video Control Bar */}
//           <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 opacity-100 transition-opacity space-y-3">
//             {/* Progress Bar */}
//             <div className="relative w-full flex items-center">
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={progress}
//                 onChange={handleSeek}
//                 className="w-full h-1.5 bg-slate-700 accent-[#6063ee] rounded-lg cursor-pointer hover:h-2 transition-all"
//               />
//             </div>

//             <div className="flex items-center justify-between text-white text-sm">
//               <div className="flex items-center gap-4">
//                 <button onClick={togglePlay} className="hover:text-[#6063ee] transition-colors cursor-pointer">
//                   {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
//                 </button>

//                 <button onClick={toggleMute} className="hover:text-[#6063ee] transition-colors cursor-pointer">
//                   {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
//                 </button>

//                 <span className="text-xs text-slate-300 font-medium">
//                   {lesson?.duration || '18:45'}
//                 </span>
//               </div>

//               <div className="flex items-center gap-4">
//                 {/* Speed selector */}
//                 <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg text-xs font-semibold">
//                   <FastForward className="w-3.5 h-3.5 text-indigo-400" />
//                   {[1, 1.25, 1.5, 2].map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => handleSpeedChange(s)}
//                       className={`px-1.5 py-0.5 rounded transition-colors ${
//                         playbackSpeed === s ? 'bg-[#4648d4] text-white' : 'text-slate-400 hover:text-white'
//                       }`}
//                     >
//                       {s}x
//                     </button>
//                   ))}
//                 </div>

//                 {lesson && onCompleteLesson && (
//                   <button
//                     onClick={() => onCompleteLesson(lesson.id)}
//                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
//                       isCompleted
//                         ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
//                         : 'bg-[#4648d4] hover:bg-[#6063ee] text-white'
//                     }`}
//                   >
//                     <CheckCircle2 className="w-4 h-4" />
//                     <span>{isCompleted ? 'Completed' : 'Mark Completed'}</span>
//                   </button>
//                 )}

//                 <button onClick={handleFullscreen} className="hover:text-[#6063ee] transition-colors cursor-pointer">
//                   <Maximize className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Lesson Context */}
//         <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
//           <p className="truncate">
//             Lumina Learning Stream Player • Advanced UI Design Systems Course
//           </p>
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//             <span className="text-emerald-400 font-medium">1080p Full HD</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };