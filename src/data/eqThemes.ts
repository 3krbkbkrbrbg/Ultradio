import { EqTheme } from "../types";

export const EQ_THEMES: EqTheme[] = [
  {
    id: "winamp_classic",
    nameFa: "وینمپ کلاسیک",
    nameEn: "Winamp 95 Classic",
    lcdBg: "#001400",
    lcdInnerBg: "#000a00",
    lcdBorder: "#005500",
    lcdTextColor: "#00ff44",
    lcdSubColor: "#00aa00",
    lcdAccentColor: "#ffff00",
    spectrumBg: "#000500",
    spectrumBorder: "#004400",
    ledInactiveColor: "#002200",
    badgeBg: "#004400",
    badgeText: "#00ff00",
    glowEffect: "0 0 8px rgba(0, 255, 68, 0.4)",
    ledActiveColors: (segIdx, total) => {
      if (segIdx >= 8) return { bg: "#ff0000", shadow: "#ff0000" };
      if (segIdx >= 5) return { bg: "#ffff00", shadow: "#ffff00" };
      return { bg: "#00ff00", shadow: "#00ff00" };
    },
  },
  {
    id: "amber_crt",
    nameFa: "کهربایی رترو ۸۰s",
    nameEn: "Amber Phosphor CRT",
    lcdBg: "#1a0d00",
    lcdInnerBg: "#100800",
    lcdBorder: "#884400",
    lcdTextColor: "#ffaa00",
    lcdSubColor: "#cc7700",
    lcdAccentColor: "#ffe066",
    spectrumBg: "#0d0600",
    spectrumBorder: "#663300",
    ledInactiveColor: "#2b1400",
    badgeBg: "#663300",
    badgeText: "#ffaa00",
    glowEffect: "0 0 10px rgba(255, 170, 0, 0.5)",
    ledActiveColors: (segIdx, total) => {
      if (segIdx >= 8) return { bg: "#ff4400", shadow: "#ff4400" };
      if (segIdx >= 5) return { bg: "#ff9900", shadow: "#ff9900" };
      return { bg: "#ffc400", shadow: "#ffc400" };
    },
  },
  {
    id: "cyber_neon",
    nameFa: "نئون سایبرپانک",
    nameEn: "Cyberpunk 90s Neon",
    lcdBg: "#0d001a",
    lcdInnerBg: "#070010",
    lcdBorder: "#660099",
    lcdTextColor: "#00ffff",
    lcdSubColor: "#cc00ff",
    lcdAccentColor: "#ff007f",
    spectrumBg: "#05000d",
    spectrumBorder: "#440066",
    ledInactiveColor: "#200033",
    badgeBg: "#440066",
    badgeText: "#00ffff",
    glowEffect: "0 0 12px rgba(0, 255, 255, 0.6)",
    ledActiveColors: (segIdx, total) => {
      if (segIdx >= 8) return { bg: "#ff007f", shadow: "#ff007f" };
      if (segIdx >= 5) return { bg: "#bf00ff", shadow: "#bf00ff" };
      return { bg: "#00e5ff", shadow: "#00e5ff" };
    },
  },
  {
    id: "matrix_code",
    nameFa: "ماتریکس دیجیتال",
    nameEn: "Matrix Digital Code",
    lcdBg: "#001100",
    lcdInnerBg: "#000800",
    lcdBorder: "#008800",
    lcdTextColor: "#39ff14",
    lcdSubColor: "#1f990a",
    lcdAccentColor: "#a6ff00",
    spectrumBg: "#000400",
    spectrumBorder: "#006600",
    ledInactiveColor: "#002b00",
    badgeBg: "#003b00",
    badgeText: "#39ff14",
    glowEffect: "0 0 10px rgba(57, 255, 20, 0.5)",
    ledActiveColors: (segIdx, total) => {
      if (segIdx >= 8) return { bg: "#b8ff00", shadow: "#b8ff00" };
      if (segIdx >= 4) return { bg: "#39ff14", shadow: "#39ff14" };
      return { bg: "#00dd00", shadow: "#00dd00" };
    },
  },
  {
    id: "sony_ice_blue",
    nameFa: "سونی واکمن آبی",
    nameEn: "Sony Ice-Blue LCD",
    lcdBg: "#001122",
    lcdInnerBg: "#000a14",
    lcdBorder: "#006699",
    lcdTextColor: "#66d9ff",
    lcdSubColor: "#3399cc",
    lcdAccentColor: "#ffffff",
    spectrumBg: "#00060d",
    spectrumBorder: "#004466",
    ledInactiveColor: "#001f33",
    badgeBg: "#00334d",
    badgeText: "#66d9ff",
    glowEffect: "0 0 10px rgba(102, 217, 255, 0.5)",
    ledActiveColors: (segIdx, total) => {
      if (segIdx >= 8) return { bg: "#ffffff", shadow: "#66d9ff" };
      if (segIdx >= 5) return { bg: "#00bfff", shadow: "#00bfff" };
      return { bg: "#0088cc", shadow: "#0088cc" };
    },
  },
  {
    id: "blaze_fire",
    nameFa: "آتشین و شعله",
    nameEn: "Blaze Inferno Fire",
    lcdBg: "#1a0500",
    lcdInnerBg: "#100300",
    lcdBorder: "#881a00",
    lcdTextColor: "#ff3b00",
    lcdSubColor: "#cc2e00",
    lcdAccentColor: "#ffff00",
    spectrumBg: "#0d0200",
    spectrumBorder: "#661400",
    ledInactiveColor: "#2b0a00",
    badgeBg: "#4d0f00",
    badgeText: "#ff5500",
    glowEffect: "0 0 12px rgba(255, 60, 0, 0.6)",
    ledActiveColors: (segIdx, total) => {
      if (segIdx >= 8) return { bg: "#ffff00", shadow: "#ffff00" };
      if (segIdx >= 5) return { bg: "#ff5500", shadow: "#ff5500" };
      return { bg: "#cc0000", shadow: "#cc0000" };
    },
  },
  {
    id: "analog_meters",
    nameFa: "عقربه‌ای آنالوگ VU",
    nameEn: "Analog Dual VU Meters",
    lcdBg: "#1f1e1b",
    lcdInnerBg: "#141311",
    lcdBorder: "#80786b",
    lcdTextColor: "#f4eedb",
    lcdSubColor: "#c2bba8",
    lcdAccentColor: "#ffcc00",
    spectrumBg: "#f5f0dc",
    spectrumBorder: "#666054",
    ledInactiveColor: "#dfd8c0",
    badgeBg: "#4a463d",
    badgeText: "#f4eedb",
    glowEffect: "0 0 6px rgba(244, 238, 219, 0.3)",
    ledActiveColors: (segIdx, total) => {
      if (segIdx >= 8) return { bg: "#cc1100", shadow: "#cc1100" };
      if (segIdx >= 6) return { bg: "#ee8800", shadow: "#ee8800" };
      return { bg: "#222222", shadow: "#222222" };
    },
  },
];
