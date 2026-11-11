'use client';

import {
  VAISHESHIKA_THEORY,
  getSubstance,
  getQuality,
  getCombination,
  VAISHESHIKA_LIMITATIONS,
} from "@axiom/module-atomic";
import type { ResearchSource } from "@axiom/core";

function statusChip(status: ResearchSource["verificationStatus"]) {
  const map: Record<string, string> = {
    verified: "bg-[#2d6a4f] text-white",
    "partially-verified": "bg-[#b7791f] text-white",
    unverified: "bg-[#8b4a4a] text-white",
  };
  return (
    <span className={`text-[0.62rem] font-mono px-1.5 py-0.5 rounded border ${map[status] ?? map["unverified"]}`}>
      {status}
    </span>
  );
}

export function TheoryInspector({
  selectedSubstanceId,
  selectedCombinationId,
}: {
  selectedSubstanceId: string | null;
  selectedCombinationId: string | null;
}) {
  const theory = VAISHESHIKA_THEORY;
  const substance = selectedSubstanceId ? getSubstance(selectedSubstanceId) : undefined;
  const combination = selectedCombinationId ? getCombination(selectedCombinationId) : undefined;

  return (
    <aside className="h-full w-80 axiom-surface-lift axiom-border border-l flex flex-col shrink-0">
      <div className="p-4 shrink-0 border-b border-slateLine">
        <h2 className="text-xs uppercase tracking-wider font-semibold text-accent mb-2">Selected model</h2>
        <div className="text-sm font-medium text-text mb-1">{theory.name}</div>
        <div className="text-[0.72rem] text-text-muted mb-2">
          {theory.historicalPeriod}
        </div>
        <div className="axiom-caption font-mono mb-1">
          Epistemic category: {theory.epistemicCategory}
        </div>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {theory.sources.map((s) => (
            <span key={s.id} className="flex items-center gap-1 text-[0.68rem]">
              {statusChip(s.verificationStatus)}&nbsp;{s.title}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-slateLine shrink-0 overflow-y-auto">
        <h3 className="text-[0.7rem] uppercase tracking-wider font-semibold text-text-muted mb-2">Description</h3>
        <div className="text-xs text-text-muted leading-relaxed">{theory.description}</div>
      </div>

      {substance ? (
        <div className="p-4 border-b border-slateLine shrink-0 overflow-y-auto">
          <h3 className="text-[0.7rem] uppercase tracking-wider font-semibold text-text-muted mb-2">
            Substance: {substance.name}
          </h3>
          <div className="text-xs text-text-muted mb-2">
            Sanskrit: {substance.sanskrit}&nbsp;·&nbsp;Element: {substance.element}
          </div>
          <h4 className="text-[0.68rem] uppercase tracking-wider font-semibold text-accent mb-1.5">Attributed qualities (guṇa)</h4>
          <div className="space-y-1">
            {substance.qualities.map((qId) => {
              const q = getQuality(qId);
              if (!q) return null;
              return (
                <div key={q.id} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7c8a99" }} />
                  <div className="text-xs text-text">
                    <span className="font-medium">{q.name}</span>
                    {q.sanskrit && <span className="text-text-muted"> ({q.sanskrit})</span>}
                  </div>
                  <div className="ml-auto flex gap-2">
                    <span className="axiom-caption">{q.epistemicClassification}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 border-b border-slateLine shrink-0 overflow-y-auto">
          <h3 className="text-[0.7rem] uppercase tracking-wider font-semibold text-text-muted mb-2">Historical information</h3>
          <div className="text-xs text-text-muted leading-relaxed space-y-2">
            <div>
              <span className="font-medium text-accent">Four atomic substances:</span>{" "}
              Pṛthvī (Earth), Āpas (Water), Tejas (Fire), Vāyu (Air). Ākāśa is part of
              the broader five-element framework but is not treated as an atomic
              substance.
            </div>
            <div>
              <span className="font-medium text-accent">Key categories:</span>{" "}
              dravya (substance), guṇa (quality), karma (motion), samavāya (inherence),
              saṃyoga (conjunction).
            </div>
            <div>
              <span className="font-medium text-accent">Combinations:</span>{" "}
              dyads (dvyaṇuka) and triads (tryaṇuka) as described in the textual and
              commentarial tradition.
            </div>
          </div>
        </div>
      )}

      {combination ? (
        <div className="p-4 border-b border-slateLine shrink-0 overflow-y-auto">
          <h3 className="text-[0.7rem] uppercase tracking-wider font-semibold text-text-muted mb-2">Selected combination</h3>
          <div className="text-xs text-text-muted leading-relaxed">
            <div className="font-medium text-text">{combination.name}</div>
            {combination.sanskrit && (
              <div className="axiom-caption font-mono mb-1">{combination.sanskrit}</div>
            )}
            <div className="text-[0.68rem] text-text-muted">{combination.description}</div>
            <div className="mt-1 axiom-caption font-mono">
              Basis: {combination.resultType} · {combination.constituentCount} constituent(s)
            </div>
          </div>
        </div>
      ) : null}

      <div className="p-4 shrink-0 overflow-y-auto">
        <h3 className="text-[0.7rem] uppercase tracking-wider font-semibold text-text-muted mb-2">Scientific assumptions &amp; limitations</h3>
        <ul className="text-xs text-text-muted leading-relaxed space-y-1 list-disc pl-4">
          {VAISHESHIKA_LIMITATIONS.map((lim) => (
            <li key={lim}>{lim}</li>
          ))}
        </ul>

        <div className="mt-3 pt-2 border-t border-slateLine">
          <div className="text-[0.68rem] font-mono text-accent mb-1">Result basis</div>
          <div className="text-xs text-text-muted">
            Conceptually reconstructed — analytical/numerical calculation not
            applicable to this historical-philosophical model.
          </div>
        </div>
      </div>
    </aside>
  );
}
