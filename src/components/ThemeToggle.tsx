"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-indicator"
      title="Press D to toggle theme"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <Sun size={12} className="text-orange" />
      ) : (
        <Moon size={12} />
      )}
      <span>{theme === "dark" ? "LIGHT" : "DARK"}</span>
      <span className="opacity-40 text-[9px] ml-1">[D]</span>
    </button>
  );
}
