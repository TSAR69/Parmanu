'use client';

import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SUBSTANCES } from "@axiom/module-atomic";

interface Viewport3DProps {
  selectedSubstanceId: string | null;
  selectedCombinationId: string | null;
  onSelectSubstance: (id: string | null) => void;
  resetKey: number;
}

const SUBSTANCE_POSITIONS: Record<string, [number, number, number]> = {
  prithvi: [-3, 0, 0],
  apas: [3, 0, 0],
  tejas: [0, 0, -3],
  vayu: [0, 0, 3],
};

const SUBSTANCE_COLORS: Record<string, number> = {
  prithvi: 0x8d6e63,
  apas: 0x4fc3f7,
  tejas: 0xffab40,
  vayu: 0xccff90,
};

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

export function Viewport3D({
  selectedSubstanceId,
  selectedCombinationId,
  onSelectSubstance,
  resetKey,
}: Viewport3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const atomMeshesRef = useRef<Record<string, THREE.Mesh>>({});
  const combinationMeshesRef = useRef<THREE.Mesh[]>([]);

  const handleSelect = useCallback(
    (id: string | null) => {
      onSelectSubstance(id);
    },
    [onSelectSubstance]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c11);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(5, 5, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 8, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x7c8a99, 0.4);
    pointLight.position.set(-5, 2, -5);
    scene.add(pointLight);

    const gridHelper = new THREE.GridHelper(20, 20, 0x232a34, 0x161a22);
    scene.add(gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 24;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;

    const createAtom = (
      id: string,
      position: [number, number, number],
      color: number
    ) => {
      const geometry = new THREE.IcosahedronGeometry(0.5, 7);
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.6,
        metalness: 0.1,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { substanceId: id, type: "substance" };
      scene.add(mesh);
      atomMeshesRef.current[id] = mesh;
      return mesh;
    };

    SUBSTANCES.forEach((s) => {
      createAtom(
        s.id,
        SUBSTANCE_POSITIONS[s.id],
        SUBSTANCE_COLORS[s.id] ?? 0x7c8a99
      );
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const allMeshes = [
        ...Object.values(atomMeshesRef.current),
        ...combinationMeshesRef.current,
      ];
      const intersects = raycaster.intersectObjects(allMeshes);

      if (intersects.length > 0) {
        const userData = intersects[0].object.userData;
        handleSelect(userData.substanceId ?? null);
      } else {
        handleSelect(null);
      }
    };

    renderer.domElement.addEventListener("click", onClick);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("click", onClick);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.set(5, 5, 5);
      controlsRef.current.reset();
    }
  }, [resetKey]);

  useEffect(() => {
    Object.entries(atomMeshesRef.current).forEach(([id, mesh]) => {
      const isSelected = selectedSubstanceId === id;
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (isSelected) {
        material.emissive = new THREE.Color(0x9fb0c1);
        material.emissiveIntensity = 0.3;
      } else {
        material.emissive = new THREE.Color(0x000000);
        material.emissiveIntensity = 0;
      }
    });
  }, [selectedSubstanceId]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    combinationMeshesRef.current.forEach((mesh) => {
      scene.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.MeshStandardMaterial).dispose();
    });
    combinationMeshesRef.current = [];

    if (selectedCombinationId) {
      const count =
        selectedCombinationId === "dvyanuka" ? 2 : 3;
      const geometry = new THREE.IcosahedronGeometry(0.35, 6);
      const material = new THREE.MeshStandardMaterial({
        color: 0x9fb0c1,
        roughness: 0.6,
        metalness: 0.1,
        flatShading: true,
      });

      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1 || 1)) * 2;
        const radiusXY = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = GOLDEN_ANGLE * i;
        const spacing = 1.4;
        const x = Math.cos(theta) * radiusXY * spacing;
        const z = Math.sin(theta) * radiusXY * spacing;

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y * spacing, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = {
          substanceId: selectedCombinationId,
          type: "combination",
        };
        scene.add(mesh);
        combinationMeshesRef.current.push(mesh);
      }
    }
  }, [selectedCombinationId]);

  if (!containerRef.current) {
    return null;
  }

  return (
    <div ref={containerRef} className="w-full h-full relative bg-[#0a0c11] overflow-hidden">
      {selectedSubstanceId && (
        <div className="absolute bottom-4 left-4 z-20 axiom-surface-lift axiom-border px-3 py-2 rounded text-[0.78rem] leading-tight shadow-lg">
          <div className="axiom-caption font-mono mb-1">Selected substance</div>
          <div className="font-medium">{selectedSubstanceId}</div>
        </div>
      )}
    </div>
  );
}