import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Video, Sparkles } from "lucide-react";
import type { Rental } from "@/lib/rental-data";

interface VideoWalkthroughProps {
  property: Rental;
}

export function VideoWalkthrough({ property }: VideoWalkthroughProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#142B40] text-white border border-[#1D3A55] shadow-lg group">
      {/* Video Canvas Simulation */}
      <div className="relative aspect-16/9 w-full overflow-hidden bg-black flex items-center justify-center">
        <img
          src={property.photos[1] || property.photos[0]}
          alt={`${property.title} Video Walkthrough Preview`}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isPlaying ? "scale-105 filter brightness-95" : "brightness-75"
          }`}
        />

        {/* Ambient video scanline & watermark overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Big Center Play Button when paused */}
        {!isPlaying && (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C6A56B] hover:bg-[#B59356] text-[#142B40] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Play video walkthrough"
          >
            <Play className="w-8 h-8 ml-1 fill-[#142B40]" />
          </button>
        )}

        {/* Top Video Header */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 bg-[#142B40]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Video className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span className="font-semibold text-white">4K Cinematic Walkthrough</span>
            <span className="text-[#C6A56B]">· {property.videoDuration}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-[#F7F6F2]/80">
            <Sparkles className="w-3 h-3 text-[#C6A56B]" />
            <span>Virtual Tour by {property.agent.name}</span>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-linear-to-t from-black/95 to-transparent flex flex-col gap-2">
          {/* Progress bar */}
          <div
            className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress(Math.round((clickX / rect.width) * 100));
            }}
          >
            <div
              className="bg-[#C6A56B] h-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-white/90 pt-1">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-[#C6A56B] transition-colors p-1"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setProgress(0);
                  setIsPlaying(true);
                }}
                className="hover:text-[#C6A56B] transition-colors p-1"
                title="Replay from start"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-[#C6A56B] transition-colors p-1"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-[11px] text-[#F7F6F2]/70 font-mono">
                {Math.floor((progress / 100) * 165)}s / {property.videoDuration}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#C6A56B] hidden sm:inline">
                Narration & Architectural Notes Included
              </span>
              <button
                type="button"
                onClick={() => setFullscreen(!fullscreen)}
                className="hover:text-[#C6A56B] transition-colors p-1"
                title="Full screen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

