"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ResetButton({ onReset }: { onReset: () => void }) {
  const [confirming, setConfirming] = useState(false);

  const handleResetClick = () => {
    if (confirming) {
      onReset();
      setConfirming(false);
    } else {
      setConfirming(true);
    }
  };

  const handleCancel = () => {
    setConfirming(false);
  }

  if (confirming) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-red-text">¿Seguro?</span>
            <button onClick={handleResetClick} className="rounded-md bg-red px-3 py-1 text-sm text-text-primary">Sí</button>
            <button onClick={handleCancel} className="rounded-md border border-border-bright px-3 py-1 text-sm text-text-secondary">No</button>
        </div>
    )
  }

  return (
    <button
      onClick={handleResetClick}
      className="inline-flex h-10 items-center justify-center rounded-md border border-border-bright bg-transparent px-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
    >
      Reiniciar
    </button>
  );
}
