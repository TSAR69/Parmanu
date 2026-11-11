'use client';

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
// Importing the module registers the Vaiśeṣika theory with the default registry.
import "@axiom/module-atomic";
import { defaultRegistry } from "@axiom/core";
import type { ScientificTheory } from "@axiom/core";
import { TopNav } from "@/components/layout/TopNav";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { TheoryInspector } from "@/components/inspector/TheoryInspector";
import { BottomControls } from "@/components/controls/BottomControls";
import { ConceptualNotice } from "@/components/common/ConceptualNotice";

const Viewport3D = dynamic(
  () =>
    import("@/components/viewport/Viewport3D").then((mod) => mod.Viewport3D),
  {
    ssr: false,
    loading: () => (
      <div className="axiom-surface-lift axiom-border h-full flex items-center justify-center text-xs text-text-muted">
        Initializing 3D view…
      </div>
    ),
  }
);

const Viewport2D = dynamic(
  () =>
    import("@/components/viewport/Viewport2D").then((mod) => mod.Viewport2D),
  {
    ssr: false,
    loading: () => (
      <div className="axiom-surface-lift axiom-border h-full flex items-center justify-center text-xs text-text-muted">
        Initializing 2D view…
      </div>
    ),
  }
);

const THEORY_ID = "vaisheshika";

export default function LabPage() {
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [selectedSubstanceId, setSelectedSubstanceId] = useState<string | null>(null);
  const [selectedCombinationId, setSelectedCombinationId] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const theory = defaultRegistry.get(THEORY_ID) as ScientificTheory | undefined;

  const onToggleView = useCallback(() => {
    setViewMode((m) => (m === "3d" ? "2d" : "3d"));
  }, []);

  const onResetCamera = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  const onSelectSubstance = useCallback((id: string | null) => {
    setSelectedSubstanceId(id);
    if (id !== null) setSelectedCombinationId(null);
  }, []);

  const onSelectCombination = useCallback((id: string | null) => {
    setSelectedCombinationId(id);
    if (id !== null) setSelectedSubstanceId(null);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <TopNav />

      <div className="absolute inset-x-0 top-12 bottom-14 left-0 right-0 overflow-hidden">
        <LeftSidebar
          selectedSubstanceId={selectedSubstanceId}
          selectedCombinationId={selectedCombinationId}
          onSelectSubstance={onSelectSubstance}
          onSelectCombination={onSelectCombination}
        />

        <div className="absolute top-0 bottom-0 left-72 right-80 overflow-hidden">
          {viewMode === "3d" ? (
            <Viewport3D
              key={resetKey}
              selectedSubstanceId={selectedSubstanceId}
              selectedCombinationId={selectedCombinationId}
              onSelectSubstance={onSelectSubstance}
              resetKey={resetKey}
            />
          ) : (
            <Viewport2D
              selectedSubstanceId={selectedSubstanceId}
              selectedCombinationId={selectedCombinationId}
              onSelectSubstance={onSelectSubstance}
            />
          )}
          <ConceptualNotice />
        </div>

        <TheoryInspector
          selectedSubstanceId={selectedSubstanceId}
          selectedCombinationId={selectedCombinationId}
        />
      </div>

      <BottomControls
        viewMode={viewMode}
        onToggleView={onToggleView}
        onResetCamera={onResetCamera}
      />

      {!theory && (
        <div className="absolute top-12 left-72 right-80 bottom-14 flex items-center justify-center pointer-events-none z-10">
          <div className="axiom-surface-lift axiom-border border-dashed border-slateLine px-6 py-4 rounded text-xs text-text-muted text-center">
            Theory {THEORY_ID} is not registered. Check the module import.
          </div>
        </div>
      )}
    </div>
  );
}
