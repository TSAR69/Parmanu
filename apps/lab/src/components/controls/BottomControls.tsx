'use client';

import { useCallback } from "react";

interface BottomControlsProps {
  viewMode: "3d" | "2d";
  onToggleView: () => void;
  onResetCamera: () => void;
}

export function BottomControls({
  viewMode,
  onToggleView,
  onResetCamera,
}: BottomControlsProps) {
  const handleReset = useCallback(() => {
    onResetCamera();
  }, [onResetCamera]);

  return (
    <div className="h-14 axiom-surface-lift axiom-border border-t shrink-0 flex items-center justify-between px-5">
      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span className="font-mono">View:</span>
        <button
          onClick={onToggleView}
          className={`px-3 py-1.5 rounded border text-[0.72rem] transition-colors ${
            viewMode === "3d"
              ? "border-accent bg-accent-bg text-text"
              : "border-slateLine text-text-muted hover:bg-accent-bg hover:border-accent"
          }`}
        >
          3D
        </button>
        <button
          onClick={onToggleView}
          className={`px-3 py-1.5 rounded border text-[0.72rem] transition-colors ${
            viewMode === "2d"
              ? "border-accent bg-accent-bg text-text"
              : "border-slateLine text-text-muted hover:bg-accent-bg hover:border-accent"
          }`}
        >
          2D top-down
        </button>
      </div>

      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span className="font-mono">Camera:</span>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded border border-slateLine text-[0.72rem] text-text-muted hover:bg-accent-bg hover:border-accent hover:text-text transition-colors"
          title="Reset camera"
        >
          Reset camera
        </button>
        <span className="w-px h-3 bg-slateLine mx-1" />
        <span className="font-mono text-[0.68rem]">Status: Conceptual reconstruction</span>
        <span className="w-px h-3 bg-slateLine mx-1" />
        <span className="font-mono text-[0.68rem] text-accent">No simulation active</span>
      </div>
    </div>
  );
}
