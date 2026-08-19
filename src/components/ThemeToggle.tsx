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
      {theme === "dark" ? <Sun size={12} className="text-orange" /> : <Moon size={12} />}
      <span>{theme === "dark" ? "LIGHT" : "DARK"}</span>
      <span className="ml-1 text-[9px] opacity-40">[D]</span>
    </button>
  );
}
