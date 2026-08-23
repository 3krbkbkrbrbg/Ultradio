import React, { useState, useMemo } from "react";
import { RadioStation, SongMetadata, PlaybackStatus, EqTheme, VisualizerMode } from "../types";
import { STATIONS } from "../data/stations";
import { EQ_THEMES } from "../data/eqThemes";
import { Disc, Activity, RefreshCw, Palette, Radio, Gauge, Waves, Sparkles, Music2, Maximize2 } from "lucide-react";

interface VisualizerScreenProps {
  currentStation: RadioStation;
  currentSong: SongMetadata | null;
  status: PlaybackStatus;
  visualizerData: number[];
  currentTheme: EqTheme;
  visualizerMode: VisualizerMode;
  onSelectTheme: (themeId: string) => void;
  onSelectVisualizerMode: (mode: VisualizerMode) => void;
  onSelectStation: (index: number) => void;
  onRefreshMetadata: () => void;
  getCoverUrl: (genre: string) => string;
}

export const VisualizerScreen: React.FC<VisualizerScreenProps> = ({
  currentStation,
  currentSong,
  status,
  visualizerData,
  currentTheme,
  visualizerMode,
  onSelectTheme,
  onSelectVisualizerMode,
  onSelectStation,
  onRefreshMetadata,
  getCoverUrl,
}) => {
  const [imageError, setImageError] = useState(false);
  const isPlaying = status === "playing";
  const isLoading = status === "loading";

  // Reset image error on genre change
  React.useEffect(() => {
    setImageError(false);
  }, [currentStation.genre]);

  const coverUrl = getCoverUrl(currentStation.genre);

  // Calculate Left & Right VU values
  const vuLeft = useMemo(() => {
    if (!isPlaying) return 0;
    const avg = (visualizerData[0] + visualizerData[1] + visualizerData[2] + visualizerData[3]) / 4;
    return Math.min(1, Math.max(0.05, avg * 1.2));
  }, [visualizerData, isPlaying]);

  const vuRight = useMemo(() => {
    if (!isPlaying) return 0;
    const avg = (visualizerData[12] + visualizerData[13] + visualizerData[14] + visualizerData[15]) / 4;
    return Math.min(1, Math.max(0.05, avg * 1.2));
  }, [visualizerData, isPlaying]);

  return (
    <div className="win95-outset bg-[#c0c0c0] p-1.5 sm:p-2 flex flex-col gap-1.5 shrink-0">
      {/* Title bar of deck */}
      <div className="win95-titlebar px-2 py-0.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-yellow-300" />
          <span className="font-bold">الترادیو DSP DECK & SPECTRUM</span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          {/* Quick Theme Selector Dropdown */}
          <div className="flex items-center gap-1 bg-[#000050] px-1 py-0.2 border border-blue-400">
            <Palette className="w-3 h-3 text-yellow-300" />
            <select
              value={currentTheme.id}
              onChange={(e) => onSelectTheme(e.target.value)}
              className="bg-transparent text-[10px] text-yellow-200 border-none outline-none cursor-pointer font-bold"
            >
              {EQ_THEMES.map((th) => (
                <option key={th.id} value={th.id} className="bg-[#000080] text-white">
                  {th.nameFa} ({th.nameEn})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onRefreshMetadata}
            title="بروزرسانی عنوان آهنگ"
            className="text-white hover:text-yellow-300 flex items-center gap-0.5"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-1.5 sm:gap-2 items-stretch">
        {/* Left/Main Column: ENLARGED 90s Album Cover & Vinyl Turntable (5 cols on md/lg) */}
        <div className="md:col-span-5 win95-inset bg-[#000000] p-2.5 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
          {/* Vinyl Groove Background Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80 pointer-events-none"></div>

          {/* LARGE ALBUM ART FRAME */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-40 md:h-40 lg:w-48 lg:h-48 shrink-0 win95-outset bg-[#111111] p-1 flex items-center justify-center overflow-hidden shadow-2xl group">
            {/* Spinning Vinyl Record behind / peeking or inside */}
            <div
              className={`absolute inset-1 rounded-full border-4 border-black/80 shadow-inner overflow-hidden transition-all duration-300 ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "5s" }}
            >
              {/* Vinyl grooves simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,#222_20%,#111_40%,#1a1a1a_60%,#000_80%)] opacity-30"></div>
            </div>

            {/* Album Cover Picture */}
            <div className="relative w-full h-full win95-inset bg-black flex items-center justify-center overflow-hidden">
              {!imageError ? (
                <img
                  src={coverUrl}
                  alt={currentStation.nameFa}
                  className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-105"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-2 text-center"
                  style={{ backgroundColor: currentStation.color }}
                >
                  <Disc
                    className={`w-14 h-14 text-white ${
                      isPlaying ? "animate-spin" : ""
                    }`}
                    style={{ animationDuration: "3s" }}
                  />
                  <span className="text-[10px] font-bold text-white mt-1 uppercase">
                    {currentStation.genre}
                  </span>
                </div>
              )}

              {/* Vinyl Center Spindle & Holographic label */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-yellow-300/80 bg-black/60 backdrop-blur-xs flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                </div>
              </div>

              {/* Genre Live Tag Badge on Cover */}
              <div className="absolute bottom-0 inset-x-0 bg-black/85 text-yellow-300 text-[10px] text-center font-mono font-bold py-0.5 border-t-2 border-yellow-400 flex items-center justify-center gap-1">
                <Music2 className="w-3 h-3 text-yellow-400" />
                <span>{currentStation.genre.toUpperCase()} LIVE STREAM</span>
              </div>
            </div>
          </div>

          {/* Details Bar directly below the big album cover */}
          <div className="flex flex-col justify-center text-center text-white w-full min-w-0 z-10">
            <div className="text-sm sm:text-base font-black text-yellow-400 truncate tracking-wide" dir="rtl">
              {currentStation.nameFa}
            </div>
            <div className="text-xs text-gray-300 font-mono tracking-tight truncate">
              {currentStation.nameEn}
            </div>
            <div className="mt-1 inline-flex items-center justify-center gap-1.5 text-[10px] font-mono text-green-400 bg-black/60 px-2 py-0.5 border border-green-800 self-center">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-ping"></span>
              <span className="font-bold">{currentStation.bitrate} HIGH BITRATE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Themed LCD Screen & Visualizer Spectrum (7 cols on md/lg) */}
        <div
          className="md:col-span-7 win95-inset p-2 flex flex-col justify-between gap-1.5 transition-colors duration-300"
          style={{
            backgroundColor: currentTheme.lcdBg,
            borderColor: currentTheme.lcdBorder,
          }}
        >
          {/* LCD Screen Upper Row: Track info & Status */}
          <div
            className="p-2 flex flex-col gap-1.5 border transition-colors duration-300 shadow-inner"
            style={{
              backgroundColor: currentTheme.lcdInnerBg,
              borderColor: currentTheme.lcdBorder,
              boxShadow: isPlaying ? currentTheme.glowEffect : "none",
            }}
          >
            <div
              className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono border-b pb-1"
              style={{ borderColor: currentTheme.lcdBorder }}
            >
              <div className="flex items-center gap-1.5">
                <span style={{ color: currentTheme.lcdTextColor }} className="font-bold">
                  STREAM:
                </span>
                <span
                  style={{ color: currentTheme.lcdAccentColor }}
                  className="font-black uppercase"
                >
                  {currentStation.genre}
                </span>
                <span style={{ color: currentTheme.lcdSubColor }} className="hidden sm:inline">
                  [{currentStation.nameFa}]
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {isLoading && (
                  <span className="text-[#ffff00] animate-blink font-bold text-[10px]">
                    [BUFFERING...]
                  </span>
                )}
                {isPlaying && (
                  <span
                    style={{ color: currentTheme.lcdTextColor }}
                    className="font-bold animate-pulse text-[10px]"
                  >
                    ▶ LIVE ON AIR
                  </span>
                )}
                {status === "stopped" && (
                  <span className="text-gray-400 font-bold text-[10px]">■ IDLE</span>
                )}
                {status === "error" && (
                  <span className="text-red-400 font-bold animate-blink text-[10px]">
                    ⚠ RETRYING
                  </span>
                )}
              </div>
            </div>

            {/* Song Title LCD Display */}
            <div className="pt-0.5">
              <div
                className="text-[9px] font-mono uppercase tracking-wider"
                style={{ color: currentTheme.lcdSubColor }}
              >
                CURRENT TRACK / عنوان آهنگ:
              </div>
              <div
                className="text-xs sm:text-sm font-mono font-black tracking-wide truncate"
                style={{ color: currentTheme.lcdTextColor }}
                title={currentSong?.title || "Connecting..."}
              >
                {currentSong?.title || "Connecting to station broadcast..."}
              </div>
            </div>

            {/* Artist LCD Display */}
            <div className="flex items-center justify-between text-[11px] font-mono">
              <div className="truncate">
                <span style={{ color: currentTheme.lcdSubColor }}>خواننده: </span>
                <span style={{ color: currentTheme.lcdAccentColor }} className="font-bold">
                  {currentSong?.artist || "Unknown Artist"}
                </span>
              </div>
              <div
                className="text-[9px] hidden sm:block shrink-0"
                style={{ color: currentTheme.lcdSubColor }}
              >
                {currentSong?.server_name || "Ultra Radio Server"}
              </div>
            </div>
          </div>

          {/* Equalizer Spectrum Visualizer Area with Mode Options */}
          <div
            className="p-1.5 flex flex-col gap-1 border transition-colors duration-300"
            style={{
              backgroundColor: currentTheme.spectrumBg,
              borderColor: currentTheme.spectrumBorder,
            }}
          >
            {/* Visualizer Header Bar & Mode Buttons */}
            <div className="flex items-center justify-between text-[9px] font-mono px-1">
              <div className="flex items-center gap-1">
                <span style={{ color: currentTheme.lcdSubColor }}>MODE:</span>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => onSelectVisualizerMode("bars")}
                    className={`px-1.5 py-0.5 text-[9px] font-bold win95-btn ${
                      visualizerMode === "bars" ? "bg-[#000080] text-white" : "bg-[#c0c0c0] text-black"
                    }`}
                    title="اسپکتروم LED چند کاناله"
                  >
                    LED Bars
                  </button>
                  <button
                    onClick={() => onSelectVisualizerMode("vu_meters")}
                    className={`px-1.5 py-0.5 text-[9px] font-bold win95-btn ${
                      visualizerMode === "vu_meters" ? "bg-[#000080] text-white" : "bg-[#c0c0c0] text-black"
                    }`}
                    title="عقربه‌ای آنالوگ VU"
                  >
                    Dual VU
                  </button>
                  <button
                    onClick={() => onSelectVisualizerMode("oscilloscope")}
                    className={`px-1.5 py-0.5 text-[9px] font-bold win95-btn ${
                      visualizerMode === "oscilloscope" ? "bg-[#000080] text-white" : "bg-[#c0c0c0] text-black"
                    }`}
                    title="اسیلوسکوپ خطی موج صدا"
                  >
                    Wave
                  </button>
                </div>
              </div>

              <div
                className="hidden sm:block text-[8px] font-mono"
                style={{ color: currentTheme.lcdAccentColor }}
              >
                SKIN: {currentTheme.nameEn.toUpperCase()}
              </div>

              <span style={{ color: currentTheme.lcdTextColor }}>STEREO L/R</span>
            </div>

            {/* VISUALIZER VIEW: 1. BARS MODE */}
            {visualizerMode === "bars" && (
              <div className="h-14 sm:h-16 flex items-end justify-between gap-1 sm:gap-1.5 px-1 pt-1">
                {visualizerData.map((val, idx) => {
                  const totalSegments = 10;
                  const activeSegments = Math.round(val * totalSegments);
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col-reverse gap-0.5 h-full justify-start"
                    >
                      {Array.from({ length: totalSegments }).map((_, segIdx) => {
                        const isActive = segIdx < activeSegments;
                        const colors = currentTheme.ledActiveColors(segIdx, totalSegments);
                        return (
                          <div
                            key={segIdx}
                            className="w-full h-1.5 transition-all duration-75"
                            style={{
                              backgroundColor: isActive ? colors.bg : currentTheme.ledInactiveColor,
                              boxShadow: isActive ? `0 0 4px ${colors.shadow}` : "none",
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}

            {/* VISUALIZER VIEW: 2. DUAL ANALOG VU METERS MODE */}
            {visualizerMode === "vu_meters" && (
              <div className="h-14 sm:h-16 grid grid-cols-2 gap-2 p-1 bg-[#1a1815] border border-gray-700">
                {/* Left Channel VU */}
                <div className="bg-[#f2ebd4] p-1 border border-black relative flex flex-col justify-between overflow-hidden shadow-inner">
                  <div className="flex justify-between text-[7px] font-mono font-bold text-black border-b border-black/30 pb-0.5">
                    <span>-20</span>
                    <span>-10</span>
                    <span>-5</span>
                    <span>0</span>
                    <span className="text-red-700">+3 dB</span>
                  </div>
                  {/* Dial Arc & Needle */}
                  <div className="relative h-7 flex items-end justify-center">
                    <div
                      className="w-0.5 h-9 bg-black origin-bottom transition-transform duration-75 absolute bottom-0 shadow-xs"
                      style={{
                        transform: `rotate(${-45 + vuLeft * 90}deg)`,
                        backgroundColor: vuLeft > 0.8 ? "#cc0000" : "#111111",
                      }}
                    ></div>
                    <div className="w-3 h-3 rounded-full bg-black absolute bottom-0"></div>
                  </div>
                  <div className="text-[8px] font-bold font-mono text-center text-black bg-[#e0d6be] border-t border-black/20">
                    LEFT VU CH-1
                  </div>
                </div>

                {/* Right Channel VU */}
                <div className="bg-[#f2ebd4] p-1 border border-black relative flex flex-col justify-between overflow-hidden shadow-inner">
                  <div className="flex justify-between text-[7px] font-mono font-bold text-black border-b border-black/30 pb-0.5">
                    <span>-20</span>
                    <span>-10</span>
                    <span>-5</span>
                    <span>0</span>
                    <span className="text-red-700">+3 dB</span>
                  </div>
                  {/* Dial Arc & Needle */}
                  <div className="relative h-7 flex items-end justify-center">
                    <div
                      className="w-0.5 h-9 bg-black origin-bottom transition-transform duration-75 absolute bottom-0 shadow-xs"
                      style={{
                        transform: `rotate(${-45 + vuRight * 90}deg)`,
                        backgroundColor: vuRight > 0.8 ? "#cc0000" : "#111111",
                      }}
                    ></div>
                    <div className="w-3 h-3 rounded-full bg-black absolute bottom-0"></div>
                  </div>
                  <div className="text-[8px] font-bold font-mono text-center text-black bg-[#e0d6be] border-t border-black/20">
                    RIGHT VU CH-2
                  </div>
                </div>
              </div>
            )}

            {/* VISUALIZER VIEW: 3. OSCILLOSCOPE SINE WAVE */}
            {visualizerMode === "oscilloscope" && (
              <div className="h-14 sm:h-16 flex items-center justify-center p-1 relative overflow-hidden bg-black border border-green-900">
                {/* CRT Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#002200_1px,transparent_1px),linear-gradient(to_bottom,#002200_1px,transparent_1px)] bg-[size:12px_12px] opacity-40"></div>
                <svg className="w-full h-full" viewBox="0 0 320 60" preserveAspectRatio="none">
                  <path
                    d={`M 0 30 ${visualizerData
                      .map((val, i) => {
                        const x = (i / (visualizerData.length - 1)) * 320;
                        const amplitude = isPlaying ? (val - 0.5) * 50 : 0;
                        const y = 30 + amplitude;
                        return `L ${x} ${y}`;
                      })
                      .join(" ")}`}
                    fill="none"
                    stroke={currentTheme.lcdTextColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      filter: `drop-shadow(0 0 4px ${currentTheme.lcdTextColor})`,
                    }}
                  />
                </svg>
              </div>
            )}
          </div>

          {/* FM Quick Preset Button Bar (Presets 1 to 13) */}
          <div className="bg-[#c0c0c0] win95-outset p-1 flex items-center gap-1 overflow-x-auto">
            <div className="text-[9px] font-bold text-black px-1 shrink-0">
              FM PRESETS:
            </div>
            <div className="flex items-center gap-1">
              {STATIONS.map((st, idx) => {
                const isSelected = st.id === currentStation.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => onSelectStation(idx)}
                    className={`win95-btn px-1.5 py-0.5 text-[10px] font-mono font-bold whitespace-nowrap shrink-0 ${
                      isSelected
                        ? "bg-[#000080] text-white [border-color:#808080_#fff_#fff_#808080]"
                        : "bg-[#c0c0c0] text-black"
                    }`}
                    title={`${st.nameFa} (${st.nameEn})`}
                  >
                    P{idx + 1}:{st.genre.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
