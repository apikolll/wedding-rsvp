"use client";
import { createContext, useContext } from "react";

// Defaults to open so sections still render normally without the intro.
// `instant` skips the names animation when the intro is skipped on a back navigation.
export const IntroContext = createContext({ isOpen: true, instant: true });

export const useIntro = () => useContext(IntroContext);
