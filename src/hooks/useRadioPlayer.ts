import { useState, useEffect, useRef, useCallback } from "react";
import { RadioStation, PlaybackStatus } from "../types";
import { STATIONS } from "../data/stations";

export function useRadioPlayer() {
  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const [status, setStatus] = useState<PlaybackStatus>("stopped");
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [bufferedTime, setBufferedTime] = useState<number>(0);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(16).fill(0));

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const currentStation = STATIONS[currentStationIndex] || STATIONS[0];

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.preload = "none";
    audio.volume = volume;
    audioRef.current = audio;

    const handleWaiting = () => setStatus("loading");
    const handlePlaying = () => {
      setStatus("playing");
      setStreamError(null);
    };
    const handlePause = () => {
      if (status !== "loading") setStatus("stopped");
    };
    const handleError = () => {
      setStatus("error");
      setStreamError("Connection error with stream");
    };
    const handleTimeUpdate = () => {
      if (audio.buffered.length > 0) {
        setBufferedTime(audio.buffered.end(audio.buffered.length - 1));
      }
    };

    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Visualizer spectrum generator (simulated dynamic VU meter when real audio is streaming)
  useEffect(() => {
    let tick = 0;
    const updateVisualizer = () => {
      if (status === "playing") {
        tick++;
        // Generate dynamic retro spectrum frequencies
        const bars = Array.from({ length: 16 }, (_, i) => {
          const base = Math.sin(tick * 0.15 + i * 0.5) * 0.3 + 0.5;
          const bassBoost = i < 4 ? 0.25 : 0;
          const randomJitter = Math.random() * 0.25;
          return Math.min(1, Math.max(0.05, (base + bassBoost + randomJitter) * (isMuted ? 0.05 : volume)));
        });
        setVisualizerData(bars);
      } else {
        // Decay to zero
        setVisualizerData((prev) => prev.map((v) => Math.max(0, v * 0.8)));
      }
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [status, volume, isMuted]);

  // Play stream
  const playStation = useCallback((index: number) => {
    if (!audioRef.current) return;
    const station = STATIONS[index];
    if (!station) return;

    setCurrentStationIndex(index);
    setStatus("loading");
    setStreamError(null);

    const audio = audioRef.current;
    // Add cache buster to stream url to force live edge
    const streamUrl = `${station.streamUrl}?nocache=${Date.now()}`;
    audio.src = streamUrl;
    audio.load();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Audio play error:", err);
        setStatus("stopped");
      });
    }
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (status === "playing" || status === "loading") {
      audioRef.current.pause();
      audioRef.current.src = "";
      setStatus("stopped");
    } else {
      playStation(currentStationIndex);
    }
  }, [status, currentStationIndex, playStation]);

  const nextStation = useCallback(() => {
    const nextIdx = (currentStationIndex + 1) % STATIONS.length;
    playStation(nextIdx);
  }, [currentStationIndex, playStation]);

  const prevStation = useCallback(() => {
    const prevIdx = (currentStationIndex - 1 + STATIONS.length) % STATIONS.length;
    playStation(prevIdx);
  }, [currentStationIndex, playStation]);

  const selectStationByGenre = useCallback((genre: string) => {
    const idx = STATIONS.findIndex((s) => s.genre.toLowerCase() === genre.toLowerCase());
    if (idx !== -1) {
      playStation(idx);
    }
  }, [playStation]);

  return {
    currentStation,
    currentStationIndex,
    status,
    volume,
    isMuted,
    bufferedTime,
    streamError,
    visualizerData,
    setVolume,
    setIsMuted,
    togglePlay,
    playStation,
    nextStation,
    prevStation,
    selectStationByGenre,
  };
}
