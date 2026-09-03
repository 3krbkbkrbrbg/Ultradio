import React from "react";
import { RadioStation, SongMetadata, PlaybackStatus } from "../types";
import { STATIONS } from "../data/stations";
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Sliders,
  Radio,
  Disc,
  Activity,
  ChevronDown,
} from "lucide-react";

interface BottomPlayerBarProps {
  currentStation: RadioStation;
  currentSong: SongMetadata | null;
  status: PlaybackStatus;
  volume: number;
  isMuted: boolean;
  onTogglePlay: () => void;
  onPrevStation: () => void;
  onNextStation: () => void;
  onSelectStation: (index: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onOpenEqualizer: () => void;
  onOpenAbout: () => void;
  onOpenInstallModal?: () => void;
  getCoverUrl: (genre: string) => string;
}

export const BottomPlayerBar: React.FC<BottomPlayerBarProps> = ({
  currentStation,
  currentSong,
  status,
  volume,
  isMuted,
  onTogglePlay,
  onPrevStation,
  onNextStation,
  onSelectStation,
  onVolumeChange,
  onToggleMute,
  onOpenEqualizer,
  onOpenAbout,
  onOpenInstallModal,
  getCoverUrl,
}) => {
  const isPlaying = status === "playing";
  const isLoading = status === "loading";
  const coverUrl = getCoverUrl(currentStation.genre);

  return (
    <div
      id="bottom-player-bar"
      className="w-full win95-outset bg-[#c0c0c0] p-1.5 shrink-0 z-40 select-none shadow-2xl border-t-2 border-white sticky bottom-0"
    >
      {/* Top micro bar with status LED */}
      <div className="flex items-center justify-between px-1 pb-1 border-b border-[#808080] text-[10px] font-mono">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full inline-block ${
                isPlaying
                  ? "bg-green-500 shadow-[0_0_5px_#00ff00] animate-pulse"
                  : isLoading
                  ? "bg-yellow-400 shadow-[0_0_5px_#ffff00] animate-ping"
                  : "bg-red-500"
              }`}
            ></span>
            <span className="font-bold text-black uppercase">
              {isPlaying
                ? "ONLINE (STREAM CONNECTED)"
                : isLoading
                ? "CONNECTING..."
                : "READY / STOPPED"}
            </span>
          </div>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <span className="text-blue-900 font-bold hidden sm:inline">
            PORT: 7443 TLS
          </span>
        </div>

        {/* Station Quick Dropdown Selector right in the Bottom Bar */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="win95-btn bg-[#008080] text-yellow-200 px-1.5 py-0.5 text-[10px] font-black hover:bg-[#006666] flex items-center gap-0.5"
              title="نصب اپلیکیشن روی گوشی یا کامپیوتر"
            >
              <span>📲</span>
              <span className="hidden xs:inline">نصب برنامه</span>
            </button>
          )}
          <button
            onClick={onOpenAbout}
            className="win95-btn bg-[#ffff00] text-black px-1.5 py-0.5 text-[10px] font-black hover:bg-[#ffe500] flex items-center gap-0.5"
            title="درباره ما"
          >
            <span>ℹ</span>
            <span>درباره ما</span>
          </button>
          <span className="text-black font-bold hidden md:inline">
            انتخاب سریع رادیو:
          </span>
          <div className="win95-inset bg-white px-1 py-0.5 flex items-center">
            <select
              value={currentStation.genre}
              onChange={(e) => {
                const idx = STATIONS.findIndex((s) => s.genre === e.target.value);
                if (idx !== -1) onSelectStation(idx);
              }}
              className="bg-transparent border-none text-xs font-bold text-black outline-none cursor-pointer py-0"
              dir="rtl"
            >
              {STATIONS.map((s, idx) => (
                <option key={s.id} value={s.genre}>
                  📻 {s.nameFa} ({s.nameEn})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main player controls row */}
      <div className="pt-1 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
        {/* Left Section: Active Track & Station info with cover */}
        <div className="flex items-center gap-2 min-w-0 flex-1 sm:max-w-xs md:max-w-sm">
          {/* Station Cover */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 win95-inset bg-black flex items-center justify-center overflow-hidden border border-black shadow-xs">
            <img
              src={coverUrl}
              alt={currentStation.nameFa}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Disc className="w-5 h-5 text-yellow-300 animate-spin" />
              </div>
            )}
          </div>

          {/* Titles */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-blue-900 truncate" dir="rtl">
                {currentStation.nameFa}
              </span>
              <span className="text-[10px] font-mono text-gray-700 hidden sm:inline">
                [{currentStation.genre.toUpperCase()}]
              </span>
            </div>
            <div
              className="text-[11px] font-mono text-black truncate font-bold"
              title={currentSong?.title || "Live stream"}
            >
              {currentSong?.title
                ? `${currentSong.title} - ${currentSong.artist}`
                : "در حال دریافت اطلاعات آهنگ..."}
            </div>
          </div>
        </div>

        {/* Center Section: 90s Beveled Media Control Buttons */}
        <div className="flex items-center justify-center gap-1 shrink-0 mx-auto">
          {/* PREVIOUS STATION */}
          <button
            onClick={onPrevStation}
            title="Previous Station (رادیو قبلی)"
            className="win95-btn px-2 py-1 flex items-center justify-center"
          >
            <SkipBack className="w-4 h-4 fill-black" />
          </button>

          {/* MAIN PLAY / PAUSE BUTTON */}
          <button
            onClick={onTogglePlay}
            title={isPlaying ? "Stop Stream" : "Play Stream"}
            className={`win95-btn px-4 py-1.5 flex items-center gap-1.5 font-black text-sm tracking-wider ${
              isPlaying
                ? "bg-[#000080] text-white [border-color:#808080_#fff_#fff_#808080]"
                : "bg-[#ffff00] text-black"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin"></div>
                <span className="text-xs">BUFFERING</span>
              </>
            ) : isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-white text-white" />
                <span>STOP</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black text-black" />
                <span>PLAY</span>
              </>
            )}
          </button>

          {/* NEXT STATION */}
          <button
            onClick={onNextStation}
            title="Next Station (رادیو بعدی)"
            className="win95-btn px-2 py-1 flex items-center justify-center"
          >
            <SkipForward className="w-4 h-4 fill-black" />
          </button>

          {/* EQUALIZER TOGGLE */}
          <button
            onClick={onOpenEqualizer}
            title="Open 10-Band Equalizer"
            className="win95-btn px-2 py-1 flex items-center gap-1 text-xs font-bold text-blue-900 ml-1"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden md:inline">EQ</span>
          </button>
        </div>

        {/* Right Section: Volume Slider & Sound Mute Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleMute}
            title={isMuted ? "Unmute" : "Mute"}
            className="win95-btn p-1 flex items-center justify-center text-black"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-600" />
            ) : (
              <Volume2 className="w-4 h-4 text-black" />
            )}
          </button>

          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono font-bold text-gray-700 hidden sm:inline">
              VOL:
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                if (isMuted) onToggleMute();
                onVolumeChange(parseFloat(e.target.value));
              }}
              className="w-16 sm:w-24 h-4 cursor-pointer accent-[#000080]"
              title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
            />
            <span className="win95-inset bg-black text-green-400 font-mono text-[10px] font-bold px-1 py-0.5 w-9 text-center">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
