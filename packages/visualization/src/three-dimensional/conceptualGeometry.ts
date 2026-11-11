/**
 * AXIOM Visualization — Conceptual 3D geometry helpers.
 *
 * Builds simple, performance-conscious geometry for conceptual historical
 * reconstructions. Shapes are illustrative placeholders for paramāṇus and
 * combinations; they are NOT historically documented forms and NOT physical
 * particles. Every mesh produced here is a visual representation only.
 */

import * as THREE from "three";

export interface ConceptualAtomOptions {
  radius?: number;
  detail?: number;
  color?: number;
  substanceId?: string;
}

export function createConceptualAtom(
  options: ConceptualAtomOptions = {}
): THREE.Mesh {
  const {
    radius = 0.45,
    detail = 6,
    color = 0x7c8a99,
    substanceId,
  } = options;

  // Low-poly sphere: performance-conscious, explicitly illustrative.
  const geometry = new THREE.IcosahedronGeometry(radius, detail);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.6,
    metalness: 0.1,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "conceptual-atom";
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (substanceId) {
    mesh.userData.substanceId = substanceId;
  }
  return mesh;
}

export interface ConceptualCombinationOptions {
  count: number;
  spacing?: number;
  color?: number;
}

/**
 * Builds a conceptual combination cluster: N atoms arranged on a simple
 * sphere around the origin. This is an illustrative arrangement only; the
 * Vaiśeṣika sources do not specify a physical geometry.
 */
export function createConceptualCombination(
  options: ConceptualCombinationOptions
): THREE.Group {
  const { count, spacing = 1.1, color = 0x9fb0c1 } = options;
  const group = new THREE.Group();
  group.name = "conceptual-combination";

  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < count; i++) {
    const atom = createConceptualAtom({ radius: 0.35, color });
    const y = 1 - (i / (count - 1 || 1)) * 2; // -1 to +1
    const radiusXY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    const x = Math.cos(theta) * radiusXY * spacing;
    const z = Math.sin(theta) * radiusXY * spacing;
    atom.position.set(x, y * spacing, z);
    group.add(atom);
  }

  return group;
}

export interface SubstanceColorMap {
  [substanceId: string]: number;
}

export const SUBSTANCE_COLORS: SubstanceColorMap = {
  prithvi: 0x8d6e63, // earthy brown
  apas: 0x4fc3f7, // water blue
  tejas: 0xffab40, // fire orange
  vayu: 0xccff90, // air pale green
};
