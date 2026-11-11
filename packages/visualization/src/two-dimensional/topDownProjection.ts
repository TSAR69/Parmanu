/**
 * AXIOM Visualization — 2D top-down projection helper.
 *
 * Projects a THREE.Group of conceptual atoms onto the XZ plane (top-down).
 * Returns per-atom screen-position data so the Lab can render a 2D view from
 * the SAME underlying representation — not a second, unrelated depiction.
 */

import type * as THREE from "three";

export interface ProjectedAtom {
  id: string;
  x: number;
  z: number;
  color: number;
  substanceId?: string;
}

export function projectToTopDown(
  group: THREE.Group,
  substanceId?: string
): ProjectedAtom[] {
  const projected: ProjectedAtom[] = [];
  group.traverse((object) => {
    if (!(object as THREE.Mesh).isMesh) return;
    const mesh = object as THREE.Mesh;
    if (mesh.name !== "conceptual-atom") return;
    // Prefer the per-mesh substanceId (stored in userData), falling back to
    // the caller-supplied substanceId so combinations (no per-atom id) still
    // resolve to a single substance label.
    const meshSubstanceId = (mesh.userData as { substanceId?: string })
      .substanceId;
    projected.push({
      id: mesh.uuid,
      x: mesh.position.x,
      z: mesh.position.z,
      color: (mesh.material as THREE.MeshStandardMaterial).color.getHex(),
      substanceId: meshSubstanceId ?? substanceId,
    });
  });
  return projected;
}
