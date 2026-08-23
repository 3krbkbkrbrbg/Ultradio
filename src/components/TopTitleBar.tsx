import React, { useState, useEffect } from "react";
import { Download, Sparkles } from "lucide-react";

interface TopTitleBarProps {
  onOpenAbout: () => void;
  onOpenEqualizer: () => void;
  onOpenInstallModal: () => void;
  activeStationName: string;
  isPlaying: boolean;
}

export const TopTitleBar: React.FC<TopTitleBarProps> = ({
  onOpenAbout,
  onOpenEqualizer,
  onOpenInstallModal,
  activeStationName,
  isPlaying,
}) => {
  const [time, setTime] = useState<string>("");
  const [visitorCount] = useState<number>(48291);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full select-none shrink-0" id="retro-header">
      {/* Topmost Windows 95 Program Titlebar */}
      <div className="win95-titlebar flex items-center justify-between px-2 py-1 text-xs border-b border-black">
        <div className="flex items-center gap-2 font-bold tracking-wider truncate">
          <div className="w-4 h-4 bg-yellow-400 border border-black flex items-center justify-center text-black font-extrabold text-[10px]">
            📻
          </div>
          <span className="truncate">
            الترادیو (ULTRA RADIO) v2.4 - [{activeStationName || "NO STATION"}]
          </span>
          {isPlaying && (
            <span className="bg-red-600 text-white px-1.5 py-0.5 text-[10px] uppercase font-bold animate-pulse">
              ● ON AIR
            </span>
          )}
        </div>

        {/* Window control buttons */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            title="Minimize"
            className="win95-btn w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-[#c0c0c0] leading-none"
          >
            _
          </button>
          <button
            title="Maximize"
            className="win95-btn w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-[#c0c0c0] leading-none"
          >
            □
          </button>
          <button
            onClick={onOpenAbout}
            title="Close"
            className="win95-btn w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-[#c0c0c0] leading-none text-red-800"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Classic Menu Bar */}
      <div className="bg-[#c0c0c0] border-b-2 [border-color:#fff_#808080_#808080_#fff] flex items-center justify-between px-2 py-0.5 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onOpenInstallModal}
            className="win95-btn bg-[#008080] text-yellow-200 px-2 py-0.5 text-xs font-black flex items-center gap-1 cursor-pointer hover:bg-[#006666] border border-black animate-pulse"
            title="نصب اپلیکیشن روی گوشی یا کامپیوتر"
          >
            <Download className="w-3.5 h-3.5 text-yellow-300" />
            <span>📲 نصب برنامه (Add to Home)</span>
          </button>

          <button
            onClick={onOpenEqualizer}
            className="win95-btn px-2 py-0.5 font-bold text-xs bg-[#c0c0c0] hover:bg-[#000080] hover:text-white"
          >
            <span>اکولایزر و تم‌ها (EQ Skins)</span>
          </button>

          <button
            onClick={onOpenAbout}
            className="win95-btn bg-[#ffff00] text-black px-2 py-0.5 text-xs font-black flex items-center gap-1 cursor-pointer hover:bg-[#ffea00] border border-black"
          >
            <span>★ درباره ما (About)</span>
          </button>
        </div>

        {/* 90s Hit Counter & Clock */}
        <div className="flex items-center gap-3">
          <div className="win95-inset bg-black px-2 py-0.5 text-green-400 font-mono text-[11px] font-bold tracking-widest hidden sm:flex items-center gap-1.5">
            <span className="text-yellow-400 text-[9px]">VISITORS:</span>
            <span>{String(visitorCount).padStart(7, "0")}</span>
          </div>

          <div className="win95-inset bg-[#ffffcc] px-2 py-0.5 text-black font-mono text-[11px] font-bold">
            {time || "12:00:00 PM"}
          </div>
        </div>
      </div>
    </header>
  );
};
