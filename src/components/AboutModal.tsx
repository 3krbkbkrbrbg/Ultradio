import React from "react";
import { Radio, Heart, Sparkles, User, Info, Check } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 backdrop-blur-xs select-none">
      <div className="win95-outset bg-[#c0c0c0] w-full max-w-lg shadow-2xl">
        {/* Title bar */}
        <div className="win95-titlebar px-2 py-1 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold">
            <Radio className="w-3.5 h-3.5 text-yellow-300" />
            <span>درباره ما / ABOUT - الترادیو (ULTRA RADIO)</span>
          </div>
          <button
            onClick={onClose}
            className="win95-btn w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-[#c0c0c0] text-black"
          >
            ✕
          </button>
        </div>

        {/* Modal content */}
        <div className="p-4 space-y-3">
          {/* Construction warning banner */}
          <div className="bg-construction h-3.5 w-full border border-black"></div>

          {/* Main About Card (Notepad 90s theme) */}
          <div className="win95-inset bg-[#ffffcc] p-4 text-black space-y-3" dir="rtl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-900 border-2 border-black flex items-center justify-center text-2xl shrink-0 text-white shadow-inner">
                📻
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-blue-950">
                  رادیو رایگان الترادیو
                </h2>
                <div className="text-xs font-bold text-red-700 mt-0.5 flex items-center gap-1">
                  <span>طراحی و توسعه یافته توسط:</span>
                  <span className="bg-yellow-300 px-1 py-0.2 border border-black text-black font-extrabold">
                    سلمان حسین پور
                  </span>
                </div>
              </div>
            </div>

            <hr className="hr-groove my-2" />

            {/* Description and Info */}
            <div className="text-xs leading-relaxed space-y-2 text-gray-900">
              <div className="bg-white win95-inset p-2.5 space-y-1.5">
                <p className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
                  <span>درباره پلتفرم الترادیو:</span>
                </p>
                <p className="text-[11px] text-gray-800">
                  <strong>الترادیو</strong> یک سامانه رایگان پخش زنده رادیویی استریم شده است که با هدف زنده کردن نوستالژی طلایی وب و سیستم‌های عامل دهه ۹۰ میلادی (ویندوز ۹۵ و نرم‌افزار خاطره‌انگیز Winamp) به همراه جدیدترین استانداردهای روز وب خلق شده است.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="win95-outset bg-[#f0f0f0] p-1.5">
                  <div className="font-bold text-black">🎧 ۱۳ شبکه استریم زنده:</div>
                  <div className="text-gray-700 text-[10px]">پاپ، لوفای، رپ فارسی، راک، سنتی، سول، فانک و...</div>
                </div>
                <div className="win95-outset bg-[#f0f0f0] p-1.5">
                  <div className="font-bold text-black">⚡ بروزرسانی آنلاین:</div>
                  <div className="text-gray-700 text-[10px]">دریافت لحظه‌ای عنوان آهنگ، نام خواننده و کاورها</div>
                </div>
              </div>
            </div>

            {/* Developer Credit Box */}
            <div className="win95-outset bg-[#e8e8e8] p-2 flex items-center justify-between text-[11px] font-mono border border-gray-400">
              <div className="flex items-center gap-1.5 text-black">
                <User className="w-3.5 h-3.5 text-blue-800" />
                <span className="font-bold">طراح و برنامه‌نویس:</span>
                <span className="font-bold text-blue-950">سلمان حسین پور</span>
              </div>
              <span className="text-[10px] text-green-700 font-bold bg-green-100 px-1 py-0.5 border border-green-400">
                ✓ نسخه ۲.۴
              </span>
            </div>
          </div>

          {/* 90s Retro Footer Badges */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold">
            <div className="win95-outset bg-blue-950 text-white p-1 text-center border border-black">
              ★ ULTRA RADIO 1995-2026
            </div>
            <div className="win95-outset bg-red-800 text-yellow-300 p-1 text-center border border-black">
              ❤ MADE WITH PASSION
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end pt-1">
            <button
              onClick={onClose}
              className="win95-btn px-6 py-1 text-xs font-bold bg-[#000080] text-white flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>بستن پنجره (OK)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
