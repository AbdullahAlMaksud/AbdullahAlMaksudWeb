"use client"

import { create } from "zustand"

type UIState = {
  commandOpen: boolean
  sidebarCollapsed: boolean
  setCommandOpen: (open: boolean) => void
  toggleCommand: () => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  commandOpen: false,
  sidebarCollapsed: false,
  setCommandOpen: (open) => set({ commandOpen: open }),
  toggleCommand: () => set((state) => ({ commandOpen: !state.commandOpen })),
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}))
