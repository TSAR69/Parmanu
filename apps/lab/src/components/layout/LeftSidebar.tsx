'use client';

import { useCallback } from "react";
import { SUBSTANCES } from "@axiom/module-atomic";
import { listCombinations } from "@axiom/module-atomic";

const SUBSTANCE_COLORS_HEX: Record<string, string> = {
  prithvi: "8d6e63",
  apas: "4fc3f7",
  tejas: "ffab40",
  vayu: "ccff90",
};

interface LeftSidebarProps {
  selectedSubstanceId: string | null;
  selectedCombinationId: string | null;
  onSelectSubstance: (id: string | null) => void;
  onSelectCombination: (id: string | null) => void;
}

const EXPERIMENTS = [
  {
    id: "explore-substances",
    label: "Explore atomic substances",
    description: "Pṛthvī, Āpas, Tejas, Vāyu",
  },
  {
    id: "inspect-qualities",
    label: "Inspect attributed qualities",
    description: "guṇa — smell, taste, form, touch",
  },
  {
    id: "explore-combinations",
    label: "Explore atomic combinations",
    description: "Dyads (dvyaṇuka) and triads (tryaṇuka)",
  },
];

export function LeftSidebar({
  selectedSubstanceId,
  selectedCombinationId,
  onSelectSubstance,
  onSelectCombination,
}: LeftSidebarProps) {
  const handleSubstance = useCallback(
    (id: string) => () => {
      onSelectCombination(null);
      onSelectSubstance(id);
    },
    [onSelectCombination, onSelectSubstance]
  );

  const handleCombination = useCallback(
    (id: string) => () => {
      onSelectSubstance(null);
      onSelectCombination(id);
    },
    [onSelectSubstance, onSelectCombination]
  );

  return (
    <aside className="h-full w-72 axiom-surface-lift axiom-border border-r flex flex-col shrink-0">
      <div className="p-4 border-b border-slateLine shrink-0">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-accent mb-3">Discipline</h2>
        <div className="text-text-muted text-xs axiom-caption">Atomic Model Engine</div>
        <div className="mt-2 text-[0.75rem] text-text-muted">Historical period: Ancient India</div>
        <div className="mt-1 text-[0.75rem] text-text-muted">Tradition: Vaiśeṣika (Kaṇāda)</div>
      </div>

      <div className="p-4 border-b border-slateLine shrink-0 flex-1 overflow-y-auto">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-accent mb-3">Theory selection</h2>
        <div className="text-xs text-text-muted mb-3">Vaiśeṣika atomic theory</div>
        <div className="axiom-caption font-mono mb-1">Epistemic category: historical-philosophical</div>
        <div className="text-xs text-text-muted mt-1">
          Conceptual historical reconstruction — not a physical simulation.
        </div>
      </div>

      <div className="p-4 shrink-0 overflow-y-auto">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-accent mb-3">Available experiments</h2>
        <div className="space-y-2">
          {EXPERIMENTS.map((exp) => (
            <button
              key={exp.id}
              onClick={() => {
                onSelectSubstance(null);
                onSelectCombination(null);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-left rounded border border-slateLine bg-[#0f1115] text-xs text-text-muted hover:bg-accent-bg hover:border-accent transition-colors group"
            >
              <div>
                <div className="font-medium text-text">{exp.label}</div>
                <div className="axiom-caption mt-0.5">{exp.description}</div>
              </div>
              <svg className="w-3 h-3 text-text-muted group-hover:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-slateLine shrink-0 overflow-y-auto">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-accent mb-3">Substances</h2>
        <div className="space-y-1.5">
          {SUBSTANCES.map((s) => {
            const selected = selectedSubstanceId === s.id;
            return (
              <button
                key={s.id}
                onClick={handleSubstance(s.id)}
                className={`flex items-center gap-2.5 px-3 py-2 text-left rounded border text-xs transition-colors ${
                  selected
                    ? "border-accent bg-accent-bg text-text"
                    : "border-slateLine text-text-muted hover:bg-accent-bg hover:border-accent hover:text-text"
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `#${SUBSTANCE_COLORS_HEX[s.id] ?? "7c8a99"}` }} />
                <div className="font-medium">{s.name}</div>
                <div className="ml-auto w-16 text-right axiom-caption">{s.element}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 border-t pt-3">
          <h3 className="text-[0.7rem] uppercase tracking-wider font-semibold text-text-muted mb-2">Combinations</h3>
          <div className="space-y-1.5">
            {listCombinations().map((c) => {
              const selected = selectedCombinationId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={handleCombination(c.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-left rounded border text-[0.72rem] transition-colors ${
                    selected
                      ? "border-accent bg-accent-bg text-text"
                      : "border-slateLine text-text-muted hover:bg-accent-bg hover:border-accent hover:text-text"
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#9fb0c1" }} />
                  <div className="font-medium truncate">{c.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
