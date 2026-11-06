"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface Track {
  src: string;
  title?: string;
  artist?: string;
}

interface AudioPlayerContextValue {
  currentTrack: Track | null;
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  play: (track?: Track) => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  stop: () => void;
}

const DEFAULT_SRC = "/songs/wedding_nasheed.mp3";

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<Track | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>({
    src: DEFAULT_SRC,
  });
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);

  // Keep ref in sync with state
  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  // Single setup effect: creates ONE audio element + wires up interaction listener
  useEffect(() => {
    const audio = new Audio(DEFAULT_SRC);
    audio.preload = "auto";
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const play = useCallback((track?: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (track && track.src !== currentTrackRef.current?.src) {
      audio.src = track.src;
      audio.load();
      setCurrentTrack(track);
    }

    audio.play().catch((err) => {
      console.error("Playback failed:", err.name, err.message);
    });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch((err) => console.error("Playback failed:", err));
    } else {
      audio.pause();
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  }, []);

  const setVolume = useCallback((v: number) => {
    if (audioRef.current) {
      audioRef.current.volume = v;
      setVolumeState(v);
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTrack(null);
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        playing,
        currentTime,
        duration,
        volume,
        play,
        pause,
        toggle,
        seek,
        setVolume,
        stop,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerProvider;

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx)
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return ctx;
}
