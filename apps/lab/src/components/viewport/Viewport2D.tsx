'use client';

import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import {
  createConceptualAtom,
  createConceptualCombination,
  projectToTopDown,
  SUBSTANCE_COLORS,
} from "@axiom/visualization";
import { SUBSTANCES } from "@axiom/module-atomic";

interface Viewport2DProps {
  selectedSubstanceId: string | null;
  selectedCombinationId: string | null;
  onSelectSubstance: (id: string | null) => void;
}

const PLANE_SIZE = 8; // projection plane half-extent in world units

const SUBSTANCE_POSITIONS: Record<string, [number, number, number]> = {
  prithvi: [-3, 0, 0],
  apas: [3, 0, 0],
  tejas: [0, 0, -3],
  vayu: [0, 0, 3],
};

export function Viewport2D({
  selectedSubstanceId,
  selectedCombinationId,
  onSelectSubstance,
}: Viewport2DProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState("0 0 400 400");

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const size = Math.max(width, height, 1);
        setViewBox(`0 0 ${size} ${size}`);
      }
    });
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  // Build the same conceptual objects used in 3D, then project to top-down.
  const atoms = useMemo(() => {
    const group = new THREE.Group();
    if (selectedCombinationId) {
      group.add(
        createConceptualCombination({
          count: selectedCombinationId === "dvyanuka" ? 2 : 3,
          spacing: 1.4,
          color: 0x9fb0c1,
        })
      );
    } else {
      SUBSTANCES.forEach((s) => {
        const atom = createConceptualAtom({
          radius: 0.5,
          color: SUBSTANCE_COLORS[s.id] ?? 0x7c8a99,
          substanceId: s.id,
        });
        atom.position.set(...(SUBSTANCE_POSITIONS[s.id] as [number, number, number]));
        group.add(atom);
      });
    }
    return projectToTopDown(group, undefined);
  }, [selectedCombinationId, selectedSubstanceId]);

  const handleAtomClick = (id: string | null) => () => {
    onSelectSubstance(id);
  };

  return (
    <div className="w-full h-full relative bg-[#0a0c11] overflow-hidden flex items-center justify-center">
      <svg
        ref={svgRef}
        className="w-full h-full block"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="gradAtom" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0a0c11" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Projection plane boundary (subtle reference). */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="#232a34"
          strokeWidth="1"
        />

        {atoms.map((atom) => {
          const cx = ((atom.x + PLANE_SIZE) / (2 * PLANE_SIZE)) * 100;
          const cy = ((PLANE_SIZE - atom.z) / (2 * PLANE_SIZE)) * 100; // flip Z for screen Y
          const selected = atom.id === selectedSubstanceId;
          const substanceId =
            SUBSTANCES.find((s) => s.id === atom.substanceId)?.id ?? null;
          return (
            <g
              key={atom.id}
              cursor="pointer"
              onClick={handleAtomClick(substanceId)}
            >
              <circle
                cx={`${cx}%`}
                cy={`${cy}%`}
                r={selected ? 5.5 : 4}
                fill={selected ? "#9fb0c1" : `#${atom.color.toString(16).padStart(6, "0")}`}
                stroke="#ffffff"
                strokeWidth={selected ? 2 : 1}
                opacity={selected ? 1 : 0.85}
              />
              <title>{atom.substanceId ?? "combination"}</title>
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-4 left-4 z-20 axiom-surface-lift axiom-border px-3 py-2 rounded text-[0.78rem] leading-tight shadow-lg">
        <div className="axiom-caption font-mono mb-1">2D top-down projection (XZ plane)</div>
        <div className="font-medium">
          {selectedCombinationId ? selectedCombinationId : "substance atoms"}
        </div>
      </div>
    </div>
  );
}