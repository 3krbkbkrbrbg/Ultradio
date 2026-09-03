import React from "react";
import { RadioStation, SongMetadata } from "../types";

interface MarqueeBannerProps {
  currentStation: RadioStation;
  currentSong: SongMetadata | null;
  isPlaying: boolean;
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  currentStation,
  currentSong,
  isPlaying,
}) => {
  const songTitle = currentSong?.title || "Connecting to radio network...";
  const songArtist = currentSong?.artist || "Live Stream 90s";

  return (
    <div className="w-full bg-[#000080] text-white border-y-2 border-black overflow-hidden py-1 px-2 flex items-center shrink-0">
      <div className="win95-outset bg-[#ffff00] text-black font-extrabold text-[10px] px-2 py-0.5 mr-2 shrink-0 animate-pulse-glow flex items-center gap-1">
        <span>★</span>
        <span>BROADCAST</span>
      </div>

      <div className="overflow-hidden whitespace-nowrap w-full relative flex-1 text-xs font-bold">
        <div className="marquee-content inline-flex items-center gap-8 font-mono">
          <span className="text-[#ffff00]">
            ⚡ NOW PLAYING: <span className="text-[#00ff00] underline">{songTitle}</span> - <span className="text-[#ffffff]">{songArtist}</span>
          </span>
          <span className="text-[#00ffff] bg-red-950 px-2 py-0.5 border border-yellow-400">
            📻 رادیو نوستالژیک الترادیو — ساخته دست Hellboy Coder ⚡
          </span>
          <span className="text-[#ff00ff]">
            ✦ STATION: <span className="text-[#00ffff]">{currentStation.nameFa} ({currentStation.nameEn})</span>
          </span>
          <span className="text-[#00ff00]">
            🔊 BITRATE: {currentStation.bitrate} | 44.1 kHz STEREO
          </span>
          <span className="text-[#ff9900]">
            📼 WELCOME TO 90S RETRO RADIO WEB APP • NO SCROLL EDITION • ENJOY THE MUSIC!
          </span>
          <span className="text-[#ffff00]">
            ★ 13 LIVE GENRES ONLINE: POP, LO-FI, PERSIAN CLASSIC, RAP, PHONK, ROCK & MORE!
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-1.5 ml-2 shrink-0 text-[10px] font-mono text-yellow-300">
        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
        <span>LIVE 7443</span>
      </div>
    </div>
  );
};
