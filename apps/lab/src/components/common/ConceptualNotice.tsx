'use client';

export function ConceptualNotice() {
  return (
    <div className="axiom-surface-lift axiom-border border-accent/40 rounded px-4 py-3 my-4 shadow-sm">
      <div className="flex items-start gap-2 mb-1">
        <div className="flex-shrink-0 w-1 h-5 bg-accent rounded-r-sm mt-0.5" />
        <div>
          <div className="text-[0.72rem] uppercase tracking-wider font-semibold text-accent">
            Conceptual historical reconstruction
          </div>
          <div className="text-xs text-text-muted leading-relaxed mt-0.5">
            The Vaiśeṣika paramāṇus shown here are a conceptual reconstruction of a
            historical-philosophical atomism. They are NOT modern chemical atoms. No
            proton counts, neutron counts, electron configurations, atomic masses, or
            modern chemical properties are assigned or implied. Geometry, spacing, and
            motion of combinations are not documented in the surviving sources and are
            shown as illustrative arrangements only.
          </div>
        </div>
      </div>
    </div>
  );
}
