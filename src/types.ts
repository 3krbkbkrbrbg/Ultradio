export interface RadioStation {
  id: string;
  genre: string;
  nameFa: string;
  nameEn: string;
  streamUrl: string;
  bitrate: string;
  color: string;
  accent: string;
  iconName: string;
  description: string;
}

export interface SongMetadata {
  genre: string;
  title: string;
  artist: string;
  server_name?: string;
}

export interface RadioApiResponse {
  code: number;
  data: SongMetadata[];
}

export type PlaybackStatus = "stopped" | "loading" | "playing" | "error";

export interface EqualizerBand {
  label: string;
  value: number; // -12 to +12 dB
}

export type VisualizerMode = "bars" | "vu_meters" | "oscilloscope" | "fire";

export interface EqTheme {
  id: string;
  nameFa: string;
  nameEn: string;
  lcdBg: string;
  lcdInnerBg: string;
  lcdBorder: string;
  lcdTextColor: string;
  lcdSubColor: string;
  lcdAccentColor: string;
  spectrumBg: string;
  spectrumBorder: string;
  ledActiveColors: (segIdx: number, total: number) => { bg: string; shadow: string };
  ledInactiveColor: string;
  badgeBg: string;
  badgeText: string;
  glowEffect?: string;
}
