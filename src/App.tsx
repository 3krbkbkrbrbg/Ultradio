import React, { useState, useEffect } from "react";
import { useRadioPlayer } from "./hooks/useRadioPlayer";
import { useSongMetadata } from "./hooks/useSongMetadata";
import { usePwaInstall } from "./hooks/usePwaInstall";
import { TopTitleBar } from "./components/TopTitleBar";
import { MarqueeBanner } from "./components/MarqueeBanner";
import { VisualizerScreen } from "./components/VisualizerScreen";
import { StationGrid } from "./components/StationGrid";
import { BottomPlayerBar } from "./components/BottomPlayerBar";
import { EqualizerModal } from "./components/EqualizerModal";
import { AboutModal } from "./components/AboutModal";
import { InstallModal } from "./components/InstallModal";
import { InstallNotificationBanner } from "./components/InstallNotificationBanner";
import { EQ_THEMES } from "./data/eqThemes";
import { VisualizerMode } from "./types";

export default function App() {
  const {
    currentStation,
    status,
    volume,
    isMuted,
    visualizerData,
    setVolume,
    setIsMuted,
    togglePlay,
    playStation,
    nextStation,
    prevStation,
  } = useRadioPlayer();

  const {
    allSongs,
    currentSong,
    getCoverUrl,
    refreshNow,
  } = useSongMetadata(currentStation.genre);

  const {
    isInstallable,
    isInstalled,
    isIOS,
    triggerInstall,
  } = usePwaInstall();

  // Equalizer theme and mode state with local storage persistence
  const [selectedThemeId, setSelectedThemeId] = useState<string>(() => {
    return localStorage.getItem("ultra_radio_eq_theme") || "winamp_classic";
  });

  const [visualizerMode, setVisualizerMode] = useState<VisualizerMode>(() => {
    return (localStorage.getItem("ultra_radio_eq_mode") as VisualizerMode) || "bars";
  });

  const [isEqOpen, setIsEqOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  // Show "Add to Home Screen" notification banner on entering the site
  useEffect(() => {
    // Check if user has dismissed the banner in this session or if already installed
    if (isInstalled) return;

    const dismissed = sessionStorage.getItem("ultra_radio_install_dismissed");
    if (!dismissed) {
      // Delay showing toast by 1.2s for pleasant onboarding entrance
      const timer = setTimeout(() => {
        setShowInstallBanner(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isInstalled]);

  const handleDismissBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem("ultra_radio_install_dismissed", "true");
  };

  const currentTheme =
    EQ_THEMES.find((t) => t.id === selectedThemeId) || EQ_THEMES[0];

  const handleSelectTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
    localStorage.setItem("ultra_radio_eq_theme", themeId);
  };

  const handleSelectVisualizerMode = (mode: VisualizerMode) => {
    setVisualizerMode(mode);
    localStorage.setItem("ultra_radio_eq_mode", mode);
  };

  return (
    <div
      className="h-screen max-h-screen w-screen max-w-screen flex flex-col bg-90s-tile overflow-hidden text-black select-none"
      id="retro-radio-app"
    >
      {/* 1. Top Windows 95 System Menu & Titlebar */}
      <TopTitleBar
        activeStationName={currentStation.nameFa}
        isPlaying={status === "playing"}
        onOpenEqualizer={() => setIsEqOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenInstallModal={() => setIsInstallOpen(true)}
      />

      {/* 2. Mandatory 90s Animated Marquee Ticker */}
      <MarqueeBanner
        currentStation={currentStation}
        currentSong={currentSong}
        isPlaying={status === "playing"}
      />

      {/* 3. Main Workspace / Deck & Station Selector */}
      <main className="flex-1 min-h-0 p-1.5 sm:p-2 flex flex-col lg:flex-row gap-1.5 sm:gap-2 overflow-y-auto lg:overflow-hidden pb-20 sm:pb-2">
        {/* Top Window on Mobile: Large Cover Art Deck + Live Song Metadata */}
        <div className="w-full lg:w-5/12 flex flex-col shrink-0 min-h-0">
          <VisualizerScreen
            currentStation={currentStation}
            currentSong={currentSong}
            status={status}
            visualizerData={visualizerData}
            currentTheme={currentTheme}
            visualizerMode={visualizerMode}
            onSelectTheme={handleSelectTheme}
            onSelectVisualizerMode={handleSelectVisualizerMode}
            onSelectStation={playStation}
            onRefreshMetadata={refreshNow}
            getCoverUrl={getCoverUrl}
          />
        </div>

        {/* Channels List & Genre Database */}
        <div className="w-full lg:w-7/12 flex-1 min-h-[300px] flex flex-col">
          <StationGrid
            currentStation={currentStation}
            status={status}
            allSongs={allSongs}
            onSelectStation={playStation}
            getCoverUrl={getCoverUrl}
          />
        </div>
      </main>

      {/* 4. Fixed Bottom Player Bar (Persistent & Always Visible) */}
      <BottomPlayerBar
        currentStation={currentStation}
        currentSong={currentSong}
        status={status}
        volume={volume}
        isMuted={isMuted}
        onTogglePlay={togglePlay}
        onPrevStation={prevStation}
        onNextStation={nextStation}
        onSelectStation={playStation}
        onVolumeChange={setVolume}
        onToggleMute={() => setIsMuted(!isMuted)}
        onOpenEqualizer={() => setIsEqOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenInstallModal={() => setIsInstallOpen(true)}
        getCoverUrl={getCoverUrl}
      />

      {/* 5. Add to Home Screen Prompt Toast on Entrance */}
      <InstallNotificationBanner
        isVisible={showInstallBanner && !isInstalled}
        onClose={handleDismissBanner}
        onOpenInstallModal={() => {
          handleDismissBanner();
          setIsInstallOpen(true);
        }}
        isInstallable={isInstallable}
        isIOS={isIOS}
        onQuickInstall={triggerInstall}
      />

      {/* 6. Retro Modals */}
      <EqualizerModal
        isOpen={isEqOpen}
        onClose={() => setIsEqOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
      />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <InstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isIOS={isIOS}
        onInstall={triggerInstall}
      />
    </div>
  );
}
