"use client";

import { useState } from "react";
import { ComingSoonModal } from "./ComingSoonModal";

interface ComingSoonLinkProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

/**
 * Drop-in replacement for <Link> / <a> when the destination page
 * isn't ready yet. Renders a <button> that opens the Coming Soon modal.
 */
export function ComingSoonLink({
  children,
  title,
  className,
}: ComingSoonLinkProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {children}
      </button>
      <ComingSoonModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
      />
    </>
  );
}
