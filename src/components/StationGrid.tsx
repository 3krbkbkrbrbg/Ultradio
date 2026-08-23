import React, { useState } from "react";
import { RadioStation, SongMetadata, PlaybackStatus } from "../types";
import { STATIONS } from "../data/stations";
import { Play, Square, Radio, Disc, Search, Volume2, Sparkles } from "lucide-react";

interface StationGridProps {
  currentStation: RadioStation;
  status: PlaybackStatus;
  allSongs: Record<string, SongMetadata>;
  onSelectStation: (index: number) => void;
  getCoverUrl: (genre: string) => string;
}

export const StationGrid: React.FC<StationGridProps> = ({
  currentStation,
  status,
  allSongs,
  onSelectStation,
  getCoverUrl,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredStations = STATIONS.map((station, originalIndex) => ({
    station,
    originalIndex,
  })).filter(({ station }) => {
    const matchesSearch =
      station.nameFa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.genre.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === "persian") {
      return station.genre === "persian" || station.genre === "prap";
    }
    if (selectedFilter === "electronic") {
      return station.genre.includes("phonk") || station.genre === "lofi" || station.genre.includes("pop");
    }
    if (selectedFilter === "chill") {
      return station.genre === "lofi" || station.genre === "relax" || station.genre === "soul";
    }
    return true;
  });

  return (
    <div className="win95-outset bg-[#c0c0c0] flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Title bar of station explorer */}
      <div className="win95-titlebar px-2 py-0.5 text-xs flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1 font-bold">
          <Radio className="w-3.5 h-3.5 text-yellow-300" />
          <span>STATION SELECTOR & LIVE GENRE DATABASE (13 CHANNELS)</span>
        </div>
        <span className="text-[10px] text-yellow-300 font-mono">
          {filteredStations.length} / {STATIONS.length} ACTIVE
        </span>
      </div>

      {/* Filter / Search Tool Bar */}
      <div className="p-1.5 bg-[#dcdcdc] border-b border-[#808080] flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
        {/* Search input (90s inset) */}
        <div className="flex items-center gap-1.5 flex-1 min-w-[180px]">
          <span className="font-bold text-[11px]">جستجو / Search:</span>
          <div className="win95-inset bg-white px-1.5 py-0.5 flex items-center gap-1 flex-1">
            <Search className="w-3 h-3 text-gray-500 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="نام سبک یا آهنگ..."
              className="w-full bg-transparent border-none outline-none text-xs text-black placeholder:text-gray-400 font-sans"
              dir="auto"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-[10px] text-gray-500 font-bold hover:text-black"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto text-[10px]">
          {[
            { id: "all", label: "همه / All (13)" },
            { id: "persian", label: "فارسی / Persian" },
            { id: "electronic", label: "الکترونیک / Pop & Phonk" },
            { id: "chill", label: "آرامش / Lo-Fi & Relax" },
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => setSelectedFilter(flt.id)}
              className={`win95-btn px-2 py-0.5 font-bold ${
                selectedFilter === flt.id
                  ? "bg-[#000080] text-white [border-color:#808080_#fff_#fff_#808080]"
                  : "bg-[#c0c0c0] text-black"
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable station items container (strictly contained within available height) */}
      <div className="flex-1 overflow-y-auto p-1.5 space-y-1 bg-[#ffffff] win95-inset">
        {filteredStations.map(({ station, originalIndex }) => {
          const isCurrent = station.id === currentStation.id;
          const isPlaying = isCurrent && status === "playing";
          const isLoading = isCurrent && status === "loading";
          const metadata = allSongs[station.genre.toLowerCase()];
          const coverUrl = getCoverUrl(station.genre);

          return (
            <div
              key={station.id}
              onClick={() => onSelectStation(originalIndex)}
              className={`win95-outset p-1.5 cursor-pointer transition-colors flex items-center justify-between gap-2 select-none ${
                isCurrent
                  ? "bg-[#000080] text-white"
                  : originalIndex % 2 === 0
                  ? "bg-[#f5f5f5] hover:bg-[#e6f2ff] text-black"
                  : "bg-[#ffffff] hover:bg-[#e6f2ff] text-black"
              }`}
            >
              {/* Left: Thumbnail Cover & Play Status */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {/* Station Cover Thumbnail */}
                <div className="relative w-11 h-11 shrink-0 win95-inset bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={coverUrl}
                    alt={station.nameFa}
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
                  <span className="absolute bottom-0 inset-x-0 text-[8px] font-mono text-center bg-black/80 text-yellow-300 uppercase">
                    {station.genre}
                  </span>
                </div>

                {/* Station & Song Info */}
                <div className="min-w-0 flex-1">
                  {/* Station Name Header */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold text-xs sm:text-sm truncate ${
                        isCurrent ? "text-yellow-300" : "text-blue-900"
                      }`}
                      dir="rtl"
                    >
                      {station.nameFa}
                    </span>
                    <span
                      className={`text-[11px] font-mono truncate hidden sm:inline ${
                        isCurrent ? "text-gray-200" : "text-gray-600"
                      }`}
                    >
                      ({station.nameEn})
                    </span>
                    {isCurrent && (
                      <span className="bg-red-600 text-white text-[9px] font-bold px-1 py-0.2 animate-pulse">
                        {isPlaying ? "TUNED ●" : isLoading ? "LOADING..." : "READY"}
                      </span>
                    )}
                  </div>

                  {/* Real-time Song Title & Artist ticker */}
                  <div className="text-[11px] truncate flex items-center gap-1 mt-0.5">
                    <span
                      className={`font-bold ${
                        isCurrent ? "text-[#00ff00]" : "text-[#006600]"
                      }`}
                    >
                      ♫
                    </span>
                    <span
                      className={`truncate font-mono ${
                        isCurrent ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {metadata?.title
                        ? `${metadata.title} - ${metadata.artist}`
                        : "Live Stream..."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Bitrate and Play Action Button */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`win95-inset px-1.5 py-0.5 text-[9px] font-mono font-bold hidden md:inline-block ${
                    isCurrent
                      ? "bg-black text-green-400"
                      : "bg-[#e0e0e0] text-black"
                  }`}
                >
                  {station.bitrate}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStation(originalIndex);
                  }}
                  className={`win95-btn px-2.5 py-1 text-xs font-bold flex items-center gap-1 ${
                    isCurrent && isPlaying
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-[#c0c0c0] text-black hover:bg-[#d8d8d8]"
                  }`}
                >
                  {isCurrent && isPlaying ? (
                    <>
                      <Volume2 className="w-3 h-3 text-yellow-300 animate-bounce" />
                      <span>پخش</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-blue-800 fill-blue-800" />
                      <span>انتخاب</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {filteredStations.length === 0 && (
          <div className="p-8 text-center text-gray-500 font-mono text-xs">
            رادیویی با این مشخصات یافت نشد!
          </div>
        )}
      </div>

      {/* Footer Info Bar */}
      <div className="bg-[#c0c0c0] px-2 py-0.5 text-[10px] font-mono border-t border-[#808080] flex items-center justify-between text-gray-800 shrink-0">
        <span className="font-bold text-blue-950">رادیو رایگان الترادیو • طراح: سلمان حسین پور</span>
        <span className="hidden sm:inline text-gray-600">PORT 7443 • AUTO-REFRESH: 5s</span>
      </div>
    </div>
  );
};
