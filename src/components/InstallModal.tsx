import React from "react";
import { Download, Smartphone, Monitor, Share, PlusSquare, Check, Sparkles } from "lucide-react";

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  onInstall: () => Promise<boolean>;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isIOS,
  onInstall,
}) => {
  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await onInstall();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 backdrop-blur-xs select-none">
      <div className="win95-outset bg-[#c0c0c0] w-full max-w-md shadow-2xl">
        {/* Title bar */}
        <div className="win95-titlebar px-2 py-1 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold">
            <Download className="w-3.5 h-3.5 text-yellow-300" />
            <span>نصب الترادیو / ADD TO HOME SCREEN</span>
          </div>
          <button
            onClick={onClose}
            className="win95-btn w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-[#c0c0c0] text-black"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-3.5 space-y-3" dir="rtl">
          {/* App Header Card */}
          <div className="win95-inset bg-[#ffffcc] p-3 flex items-center gap-3">
            <div className="w-14 h-14 win95-outset bg-[#000080] p-1 flex items-center justify-center shrink-0">
              <img src="/icon.svg" alt="الترادیو" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-blue-950">
                الترادیو (Ultra Radio)
              </h3>
              <p className="text-[11px] text-gray-700 font-mono mt-0.5">
                رادیو آنلاین رایگان نوستالژیک
              </p>
              <div className="text-[10px] text-red-700 font-bold mt-1">
                ★ بدون نیاز به نصب از بازار یا گوگل‌پلی (وب‌اپلیکیشن PWA)
              </div>
            </div>
          </div>

          {/* Already installed state */}
          {isInstalled ? (
            <div className="win95-inset bg-[#e6ffe6] p-3 text-center space-y-1">
              <div className="text-green-700 font-black text-sm flex items-center justify-center gap-1">
                <Check className="w-4 h-4" />
                <span>برنامه از قبل روی دستگاه شما نصب شده است!</span>
              </div>
              <p className="text-[11px] text-gray-600">
                می‌توانید الترادیو را مستقیماً از صفحه اصلی (Home Screen) باز کنید.
              </p>
            </div>
          ) : isInstallable ? (
            /* Direct 1-Click Install for Android / Chrome / Windows / Mac */
            <div className="space-y-2">
              <p className="text-xs text-gray-800 leading-relaxed font-bold">
                برای دسترسی سریع و اجرای تمام‌صفحه بدون نوار مرورگر، الترادیو را به صفحه اصلی گوشی یا دسکتاپ اضافه کنید:
              </p>
              <button
                onClick={handleInstallClick}
                className="win95-btn w-full py-2 bg-[#000080] text-white hover:bg-blue-900 text-xs font-black flex items-center justify-center gap-2 border-2"
              >
                <Download className="w-4 h-4 text-yellow-300 animate-bounce" />
                <span>افزودن به صفحه اصلی (Add to Home Screen)</span>
              </button>
            </div>
          ) : isIOS ? (
            /* iOS Safari Instructions */
            <div className="win95-inset bg-white p-3 space-y-2 text-xs">
              <div className="font-bold text-blue-900 flex items-center gap-1.5 border-b pb-1">
                <Smartphone className="w-3.5 h-3.5 text-blue-700" />
                <span>راهنمای نصب روی آیفون و آیپد (iOS Safari):</span>
              </div>
              <ol className="text-[11px] space-y-2 text-gray-800 list-decimal list-inside pr-1">
                <li className="leading-relaxed">
                  در نوار پایین مرورگر سافاری روی دکمه <strong className="text-blue-700 inline-flex items-center gap-0.5"><Share className="w-3 h-3 inline" /> اشتراک‌گذاری (Share)</strong> بزنید.
                </li>
                <li className="leading-relaxed">
                  گزینه <strong className="text-black inline-flex items-center gap-0.5"><PlusSquare className="w-3 h-3 inline" /> افزودن به صفحه اصلی (Add to Home Screen)</strong> را انتخاب کنید.
                </li>
                <li className="leading-relaxed">
                  در بالای صفحه گزینه <strong>Add</strong> را بزنید.
                </li>
              </ol>
            </div>
          ) : (
            /* Desktop / Manual fallback instructions */
            <div className="win95-inset bg-white p-3 space-y-2 text-xs">
              <div className="font-bold text-blue-900 flex items-center gap-1.5 border-b pb-1">
                <Monitor className="w-3.5 h-3.5 text-blue-700" />
                <span>راهنمای نصب در مرورگر دسکتاپ و اندروید:</span>
              </div>
              <p className="text-[11px] text-gray-700 leading-relaxed">
                در نوار آدرس مرورگر کروم روی آیکون <strong>نصب (Install / ⊕)</strong> کلیک کنید یا از منوی سه نقطه مرورگر گزینه <strong>«Add to Home Screen / Install App»</strong> را انتخاب نمایید.
              </p>
            </div>
          )}

          {/* Benefits list */}
          <div className="win95-outset bg-[#f0f0f0] p-2 grid grid-cols-2 gap-1.5 text-[10px] font-mono">
            <div className="text-gray-800">✓ بدون اشغال حافظه</div>
            <div className="text-gray-800">✓ پخش بدون قطعی</div>
            <div className="text-gray-800">✓ کنترل از لاک‌اسکرین</div>
            <div className="text-gray-800">✓ اجرای تمام‌صفحه</div>
          </div>

          {/* Dialog Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#808080]">
            <button
              onClick={onClose}
              className="win95-btn px-5 py-1 text-xs font-bold bg-[#c0c0c0] text-black"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
