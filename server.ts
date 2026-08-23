import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory cache for songs metadata
let cachedSongData: { timestamp: number; data: any } | null = null;
const CACHE_TTL_MS = 3000; // 3 seconds cache

// Helper to fetch song info
async function fetchAllSongInfo() {
  const now = Date.now();
  if (cachedSongData && now - cachedSongData.timestamp < CACHE_TTL_MS) {
    return cachedSongData.data;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const response = await fetch("https://radio.9craft.ir/v1/api/genre/all", {
      signal: controller.signal,
      headers: {
        "User-Agent": "RetroRadioWeb/1.0",
        Accept: "application/json",
      },
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      cachedSongData = { timestamp: now, data: json };
      return json;
    }
  } catch (err) {
    console.error("Error fetching upstream song info:", err);
  }

  return cachedSongData ? cachedSongData.data : null;
}

// API endpoint for all song infos
app.get("/api/songs", async (req, res) => {
  try {
    const data = await fetchAllSongInfo();
    if (data) {
      return res.json(data);
    }
    return res.status(502).json({ code: 502, error: "Could not fetch song info" });
  } catch (error) {
    return res.status(500).json({ code: 500, error: "Server error" });
  }
});

// API endpoint for specific genre info
app.get("/api/song-info/:genre", async (req, res) => {
  const { genre } = req.params;
  try {
    const data = await fetchAllSongInfo();
    if (data && Array.isArray(data.data)) {
      const item = data.data.find(
        (d: any) => d.genre && d.genre.toLowerCase() === genre.toLowerCase()
      );
      if (item) {
        return res.json({ code: 200, data: item });
      }
    }
    return res.status(404).json({ code: 404, message: "Genre not found" });
  } catch (error) {
    return res.status(500).json({ code: 500, error: "Internal server error" });
  }
});

// In-memory cover buffer cache (5 minutes TTL)
const coverCache = new Map<string, { buffer: Buffer; timestamp: number; contentType: string }>();

// API endpoint for genre cover image proxy
app.get("/api/cover/:genre", async (req, res) => {
  const { genre } = req.params;
  const cleanGenre = genre.toLowerCase().trim();

  const cached = coverCache.get(cleanGenre);
  const now = Date.now();
  if (cached && now - cached.timestamp < 300000) {
    res.setHeader("Content-Type", cached.contentType);
    res.setHeader("Cache-Control", "public, max-age=300");
    return res.send(cached.buffer);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const upstreamUrl = `https://radio.9craft.ir/v1/api/${cleanGenre}/img`;
    const response = await fetch(upstreamUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "RetroRadioWeb/1.0",
      },
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentType = response.headers.get("content-type") || "image/jpeg";
      coverCache.set(cleanGenre, { buffer, timestamp: now, contentType });

      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=300");
      return res.send(buffer);
    }
  } catch (err) {
    console.error(`Error fetching cover for ${cleanGenre}:`, err);
  }

  // Fallback to direct redirect or 404
  return res.redirect(`https://radio.9craft.ir/v1/api/${cleanGenre}/img`);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Windows 95 Retro Radio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
