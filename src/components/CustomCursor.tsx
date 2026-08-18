"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only show on devices with a fine pointer (desktop mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const hasShown = { current: false };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!hasShown.current) {
        hasShown.current = true;
        ring.current = { x: e.clientX, y: e.clientY };
        setIsVisible(true);
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const animate = () => {
      // Smooth linear interpolation for the outer ring
      ring.current.x += (pos.current.x - ring.current.x) * 0.16;
      ring.current.y += (pos.current.y - ring.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeaveWindow = () => setIsVisible(false);
    const onEnterWindow = () => setIsVisible(true);

    const bindHover = () => {
      const interactiveEls = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, label, select, .card-hover-glow, .group"
      );
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    bindHover();

    const observer = new MutationObserver(bindHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Center Golden Point */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "8px" : "6px",
          height: isHovering ? "8px" : "6px",
          borderRadius: "9999px",
          backgroundColor: "#F3BA42",
          boxShadow: isHovering
            ? "0 0 14px 3px rgba(229, 169, 60, 0.9), 0 0 24px 6px rgba(229, 169, 60, 0.4)"
            : "0 0 8px 2px rgba(229, 169, 60, 0.6)",
          pointerEvents: "none",
          zIndex: 99999,
          marginLeft: isHovering ? "-4px" : "-3px",
          marginTop: isHovering ? "-4px" : "-3px",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, opacity 0.3s",
          willChange: "transform",
        }}
      />

      {/* Lagging Trailing Gold Ring / Halo */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isClicking ? "24px" : isHovering ? "46px" : "32px",
          height: isClicking ? "24px" : isHovering ? "46px" : "32px",
          borderRadius: "9999px",
          border: `1.5px solid ${isHovering ? "rgba(243, 186, 66, 0.9)" : "rgba(229, 169, 60, 0.45)"}`,
          backgroundColor: isHovering ? "rgba(229, 169, 60, 0.08)" : "transparent",
          boxShadow: isHovering
            ? "0 0 20px rgba(229, 169, 60, 0.3), inset 0 0 10px rgba(229, 169, 60, 0.15)"
            : "none",
          pointerEvents: "none",
          zIndex: 99998,
          marginLeft: isClicking ? "-12px" : isHovering ? "-23px" : "-16px",
          marginTop: isClicking ? "-12px" : isHovering ? "-23px" : "-16px",
          opacity: isVisible ? (isHovering ? 1 : 0.65) : 0,
          transition:
            "width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), margin 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, background-color 0.2s, opacity 0.3s, box-shadow 0.25s",
          willChange: "transform",
        }}
      />
    </>
  );
}
