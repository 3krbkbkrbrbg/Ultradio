import { useState, useEffect, useCallback } from "react";
import { SongMetadata } from "../types";

export function useSongMetadata(currentGenre: string) {
  const [allSongs, setAllSongs] = useState<Record<string, SongMetadata>>({});
  const [currentSong, setCurrentSong] = useState<SongMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchMetadata = useCallback(async () => {
    try {
      // First try local proxy endpoint
      let response = await fetch("/api/songs", {
        headers: { Accept: "application/json" },
      });

      // Fallback directly to upstream if local proxy fails for any reason
      if (!response.ok) {
        response = await fetch("https://radio.9craft.ir/v1/api/genre/all");
      }

      if (response.ok) {
        const json = await response.json();
        if (json && Array.isArray(json.data)) {
          const map: Record<string, SongMetadata> = {};
          json.data.forEach((item: any) => {
            if (item && item.genre) {
              map[item.genre.toLowerCase()] = {
                genre: item.genre,
                title: item.title || "Unknown Track",
                artist: item.artist || "Unknown Artist",
                server_name: item.server_name || `${item.genre.toUpperCase()} Radio`,
              };
            }
          });
          setAllSongs(map);
          setLastUpdated(new Date());

          const active = map[currentGenre.toLowerCase()];
          if (active) {
            setCurrentSong(active);
          }
        }
      }
    } catch (err) {
      console.warn("Failed to update song metadata:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentGenre]);

  // Initial fetch and periodic polling every 5 seconds
  useEffect(() => {
    fetchMetadata();
    const interval = setInterval(fetchMetadata, 5000);
    return () => clearInterval(interval);
  }, [fetchMetadata]);

  // Update currentSong when genre changes
  useEffect(() => {
    if (allSongs[currentGenre.toLowerCase()]) {
      setCurrentSong(allSongs[currentGenre.toLowerCase()]);
    } else {
      setCurrentSong({
        genre: currentGenre,
        title: "Connecting to stream...",
        artist: "Radio Live Stream",
        server_name: `${currentGenre.toUpperCase()} FM`,
      });
    }
  }, [currentGenre, allSongs]);

  const getCoverUrl = useCallback((genre: string) => {
    // Return backend proxy cover image with cache buster fallback
    return `/api/cover/${genre.toLowerCase()}`;
  }, []);

  return {
    allSongs,
    currentSong,
    isLoading,
    lastUpdated,
    getCoverUrl,
    refreshNow: fetchMetadata,
  };
}
