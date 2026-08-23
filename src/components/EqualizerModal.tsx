import React, { useState } from "react";
import { Sliders, RotateCcw, Check, Palette, Sparkles } from "lucide-react";
import { EQ_THEMES } from "../data/eqThemes";
import { EqTheme } from "../types";

interface EqualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: EqTheme;
  onSelectTheme: (themeId: string) => void;
}

const FREQUENCIES = [
  "PREAMP",
  "31Hz",
  "62Hz",
  "125Hz",
  "250Hz",
  "500Hz",
  "1kHz",
  "2kHz",
  "4kHz",
  "8kHz",
  "16kHz",
];

export const EqualizerModal: React.FC<EqualizerModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  const [bandValues, setBandValues] = useState<number[]>(
    new Array(FREQUENCIES.length).fill(0)
  );
  const [isEqEnabled, setIsEqEnabled] = useState(true);
  const [activePreset, setActivePreset] = useState("Rock/Pop");

  if (!isOpen) return null;

  const presets: Record<string, number[]> = {
    Flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "Rock/Pop": [2, 4, 3, 0, -1, 1, 2, 4, 5, 4, 3],
    "Bass Boost": [4, 8, 7, 5, 2, 0, 0, 0, 1, 2, 2],
    "Lo-Fi / Vocal": [1, -2, -1, 1, 3, 4, 3, 2, 0, -2, -3],
    "Classic Persian": [2, 2, 1, 0, 2, 3, 4, 3, 2, 1, 1],
  };

  const applyPreset = (name: string) => {
    setActivePreset(name);
    if (presets[name]) {
      setBandValues([...presets[name]]);
    }
  };

  const handleSliderChange = (idx: number, val: number) => {
    const next = [...bandValues];
    next[idx] = val;
    setBandValues(next);
    setActivePreset("Custom");
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 backdrop-blur-xs select-none">
      <div className="win95-outset bg-[#c0c0c0] w-full max-w-lg shadow-2xl">
        {/* Title bar */}
        <div className="win95-titlebar px-2 py-1 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold">
            <Sliders className="w-3.5 h-3.5 text-yellow-300" />
            <span>الترادیو DSP EQUALIZER & THEMES - v2.4</span>
          </div>
          <button
            onClick={onClose}
            className="win95-btn w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-[#c0c0c0] text-black"
          >
            ✕
          </button>
        </div>

        {/* EQ Controls */}
        <div className="p-3 space-y-3">
          {/* EQUALIZER THEME SELECTION PANEL */}
          <div className="win95-inset bg-[#e4e4e4] p-2 space-y-1.5" dir="rtl">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900 border-b border-gray-400 pb-1">
              <div className="flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-blue-800" />
                <span>انتخاب تم رنگی و گرافیکی اکولایزر (Equalizer Skins):</span>
              </div>
              <span className="text-[10px] text-gray-700 font-mono">
                {currentTheme.nameEn}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
              {EQ_THEMES.map((theme) => {
                const isSelected = currentTheme.id === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onSelectTheme(theme.id)}
                    className={`win95-btn p-1 flex items-center gap-1.5 text-right text-[11px] ${
                      isSelected
                        ? "bg-[#000080] text-white [border-color:#808080_#fff_#fff_#808080]"
                        : "bg-[#dcdcdc] text-black hover:bg-[#e8e8e8]"
                    }`}
                  >
                    {/* Color dot indicator */}
                    <div
                      className="w-3 h-3 rounded-full border border-black shrink-0"
                      style={{ backgroundColor: theme.lcdTextColor }}
                    ></div>
                    <div className="truncate flex-1">
                      <div className="font-bold truncate">{theme.nameFa}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-1 pb-1 border-b border-[#808080]">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsEqEnabled(!isEqEnabled)}
                className={`win95-btn px-2 py-0.5 text-xs font-bold ${
                  isEqEnabled ? "bg-[#000080] text-white" : "bg-[#c0c0c0]"
                }`}
              >
                {isEqEnabled ? "EQ: ON" : "EQ: OFF"}
              </button>
            </div>

            {/* Presets List */}
            <div className="flex flex-wrap items-center gap-1 text-[10px]">
              {Object.keys(presets).map((pName) => (
                <button
                  key={pName}
                  onClick={() => applyPreset(pName)}
                  className={`win95-btn px-1.5 py-0.5 font-bold ${
                    activePreset === pName
                      ? "bg-[#000080] text-white"
                      : "bg-[#c0c0c0]"
                  }`}
                >
                  {pName}
                </button>
              ))}
            </div>
          </div>

          {/* Equalizer Vertical Sliders inside Themed LCD Box */}
          <div
            className="win95-inset p-2 flex items-center justify-between gap-1 overflow-x-auto transition-colors duration-300"
            style={{
              backgroundColor: currentTheme.lcdInnerBg,
              borderColor: currentTheme.lcdBorder,
            }}
          >
            {FREQUENCIES.map((freq, idx) => {
              const val = bandValues[idx] || 0;
              return (
                <div
                  key={freq}
                  className="flex flex-col items-center gap-1 flex-1 min-w-[32px]"
                >
                  <span
                    className="text-[9px] font-mono font-bold"
                    style={{ color: currentTheme.lcdTextColor }}
                  >
                    {val > 0 ? `+${val}` : val}
                  </span>
                  <div className="h-28 flex items-center justify-center py-1">
                    <input
                      type="range"
                      min="-12"
                      max="12"
                      step="1"
                      value={val}
                      disabled={!isEqEnabled}
                      onChange={(e) =>
                        handleSliderChange(idx, parseInt(e.target.value))
                      }
                      className="h-24 w-4 appearance-none [writing-mode:vertical-lr] [direction:rtl] cursor-pointer"
                    />
                  </div>
                  <span
                    className="text-[8px] font-mono font-bold whitespace-nowrap"
                    style={{ color: currentTheme.lcdAccentColor }}
                  >
                    {freq}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dialog Action Buttons */}
          <div className="flex items-center justify-between pt-1 border-t border-[#808080]">
            <button
              onClick={() => applyPreset("Flat")}
              className="win95-btn px-3 py-1 text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>ریست تنظیمات (Flat)</span>
            </button>
            <button
              onClick={onClose}
              className="win95-btn px-5 py-1 text-xs font-bold bg-[#000080] text-white flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>تایید و ذخیره (OK)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
