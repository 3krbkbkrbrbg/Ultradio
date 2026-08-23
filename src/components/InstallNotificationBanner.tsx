import React from "react";
import { Download, Sparkles, X, PlusSquare, Share } from "lucide-react";

interface InstallNotificationBannerProps {
  isVisible: boolean;
  onClose: () => void;
  onOpenInstallModal: () => void;
  isInstallable: boolean;
  isIOS: boolean;
  onQuickInstall: () => Promise<boolean>;
}

export const InstallNotificationBanner: React.FC<InstallNotificationBannerProps> = ({
  isVisible,
  onClose,
  onOpenInstallModal,
  isInstallable,
  isIOS,
  onQuickInstall,
}) => {
  if (!isVisible) return null;

  const handleAction = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInstallable) {
      const success = await onQuickInstall();
      if (success) {
        onClose();
        return;
      }
    }
    onOpenInstallModal();
  };

  return (
    <div
      className="fixed bottom-14 sm:bottom-16 right-2 sm:right-4 z-40 max-w-sm w-[calc(100vw-1rem)] sm:w-auto animate-bounce-short select-none"
      dir="rtl"
    >
      <div className="win95-outset bg-[#ffffcc] p-2.5 shadow-2xl border-2 border-black space-y-2">
        {/* Title bar inside toast */}
        <div className="win95-titlebar px-1.5 py-0.5 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1 font-bold text-yellow-300">
            <Download className="w-3.5 h-3.5" />
            <span>نصب الترادیو روی دستگاه شما</span>
          </div>
          <button
            onClick={onClose}
            className="win95-btn w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-[#c0c0c0] text-black"
            title="بستن اعلان"
          >
            ✕
          </button>
        </div>

        {/* Message body */}
        <div className="flex items-start gap-2 text-black">
          <div className="w-10 h-10 win95-outset bg-[#000080] p-0.5 shrink-0 flex items-center justify-center">
            <img src="/icon.svg" alt="الترادیو" className="w-full h-full object-contain" />
          </div>
          <div className="text-[11px] leading-relaxed flex-1">
            <div className="font-black text-blue-950 text-xs">
              الترادیو را به صفحه اصلی اضافه کنید!
            </div>
            <div className="text-gray-700 mt-0.5">
              {isIOS
                ? "برای پخش تمام‌صفحه و سریع، از منوی Share گزینه Add to Home Screen را بزنید."
                : "دسترسی آسان، بدون نوار مرورگر و با مصرف اینترنت بهینه."}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-[#808080]">
          <button
            onClick={onClose}
            className="win95-btn px-2.5 py-1 text-[11px] font-bold bg-[#c0c0c0] text-black"
          >
            بعداً
          </button>
          <button
            onClick={handleAction}
            className="win95-btn px-3 py-1 text-[11px] font-black bg-[#000080] text-yellow-200 hover:bg-blue-900 flex items-center gap-1 animate-pulse border border-black"
          >
            <Download className="w-3.5 h-3.5" />
            <span>افزودن به هوم اسکرین (نصب)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
