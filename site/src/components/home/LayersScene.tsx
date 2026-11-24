"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

/* Paleta do modelo (coerente com o design system) */
const C = {
  concreto: "#bdb8ae",
  membrana: "#2a2a27",
  aco: "#ff4d00",
  acoEscuro: "#4a4a45",
  eletrica: "#e3b341",
  agua: "#5e8fb5",
  cobre: "#b87333",
  vidro: "#9cc0d3",
  caixilho: "#1c1c1a",
  parede: "#edeae4",
  piso: "#d8d3ca",
  madeira: "#a0703f",
  jardim: "#2e3a26",
  copa: "#6b7a55",
  piscina: "#4fa3c7",
  luz: "#ffd7a0",
};

type V3 = [number, number, number];
type Prim =
  | { t: "box"; p: V3; s: V3; c: string; r?: V3; o?: number; e?: boolean; glow?: boolean }
  | { t: "cyl"; p: V3; rad: number; h: number; c: string; r?: V3 }
  | { t: "ico"; p: V3; rad: number; c: string };

const box = (p: V3, s: V3, c: string, extra: Partial<Extract<Prim, { t: "box" }>> = {}): Prim => ({ t: "box", p, s, c, ...extra });

/* ----------------------------- Camadas do modelo ----------------------------- */
function buildLayers(): Prim[][] {
  // 01 — Fundação e estrutura
  const l0: Prim[] = [box([0, 0.2, 0], [12, 0.4, 9], C.concreto)];
  for (const x of [-5.2, -0.5, 4.2]) for (const z of [-3.8, 3.8]) l0.push(box([x, 1.9, z], [0.35, 3, 0.35], C.concreto));
  l0.push(box([0.75, 3.55, 0], [14.5, 0.3, 9], C.concreto));
  for (const x of [-6.2, 0.75, 7.7]) for (const z of [-3.2, 3.2]) l0.push(box([x, 5.1, z], [0.3, 2.8, 0.3], C.concreto));

  // 02 — Estrutura metálica (aço com primer laranja)
  const l1: Prim[] = [box([6.6, 3.25, 3.2], [3.4, 0.3, 0.2], C.aco), box([6.6, 3.25, -3.2], [3.4, 0.3, 0.2], C.aco), box([6.6, 3.25, 0], [3.4, 0.3, 0.2], C.aco)];
  for (let i = 0; i < 12; i++) l1.push(box([-4.65 + i * 0.3, 0.53 + i * 0.2625, 2.6], [0.3, 0.06, 1.2], C.acoEscuro));
  l1.push(box([-3.0, 1.975, 3.22], [4.78, 0.2, 0.06], C.aco, { r: [0, 0, 0.719] }));
  l1.push(box([-3.0, 1.975, 1.98], [4.78, 0.2, 0.06], C.aco, { r: [0, 0, 0.719] }));
  for (const x of [-5.5, -2, 1.5, 5, 7.8]) l1.push(box([x, 4.25, 4.45], [0.05, 0.9, 0.05], C.acoEscuro));
  l1.push(box([1.15, 4.7, 4.45], [13.4, 0.05, 0.05], C.acoEscuro));

  // 03 — Elétrica e hidráulica
  const l2: Prim[] = [
    box([-0.5, 3.32, -2], [10, 0.06, 0.06], C.eletrica),
    box([-0.5, 3.32, 1], [10, 0.06, 0.06], C.eletrica),
    box([-5.6, 1.6, -3.5], [0.6, 0.9, 0.15], C.eletrica),
  ];
  for (const x of [-4, 0, 3]) l2.push(box([x, 1.9, -3.62], [0.06, 2.8, 0.06], C.eletrica));
  l2.push({ t: "cyl", p: [2.5, 3.5, -3.5], rad: 0.09, h: 6.3, c: C.agua });
  l2.push({ t: "cyl", p: [-0.5, 3.8, -2.8], rad: 0.06, h: 9, c: C.agua, r: [0, 0, Math.PI / 2] });
  l2.push({ t: "cyl", p: [-0.5, 3.8, -2.5], rad: 0.05, h: 9, c: C.cobre, r: [0, 0, Math.PI / 2] });
  l2.push({ t: "cyl", p: [-0.5, 0.55, -1.5], rad: 0.07, h: 9, c: C.agua, r: [0, 0, Math.PI / 2] });

  // 04 — Impermeabilização e cobertura
  const l3: Prim[] = [
    box([0.75, 6.65, 0], [14.5, 0.3, 7.2], C.concreto),
    box([0.75, 6.83, 0], [14.55, 0.06, 7.25], C.membrana),
    box([0.75, 3.72, 4.0], [14.5, 0.04, 1.0], C.membrana),
    box([0.75, 3.72, -4.0], [14.5, 0.04, 1.0], C.membrana),
  ];

  // 05 — Esquadrias e fachada
  const l4: Prim[] = [
    box([-0.5, 1.9, 3.95], [9.8, 2.9, 0.04], C.vidro, { o: 0.32, e: false }),
    box([4.4, 1.9, 0], [0.04, 2.9, 7.6], C.vidro, { o: 0.32, e: false }),
    box([2, 5.1, 3.62], [8, 1.6, 0.04], C.vidro, { o: 0.32, e: false }),
    box([-0.5, 3.33, 3.95], [9.8, 0.08, 0.1], C.caixilho),
    box([-0.5, 0.47, 3.95], [9.8, 0.08, 0.1], C.caixilho),
  ];
  for (const x of [-5.4, -2.95, -0.5, 1.95, 4.4]) l4.push(box([x, 1.9, 3.95], [0.07, 2.9, 0.1], C.caixilho));
  for (const x of [-2, 0, 2, 4, 6]) l4.push(box([x, 5.1, 3.64], [0.06, 1.6, 0.08], C.caixilho));

  // 06 — Acabamentos e pintura
  const l5: Prim[] = [
    box([-0.5, 1.9, -3.95], [9.8, 2.9, 0.2], C.parede),
    box([-5.4, 1.9, 0], [0.2, 2.9, 7.7], C.parede),
    box([0.75, 5.1, -3.5], [14.5, 2.8, 0.2], C.parede),
    box([-4.25, 5.1, 3.5], [4.5, 2.8, 0.2], C.parede),
    box([2, 4.0, 3.5], [8, 0.6, 0.2], C.parede),
    box([2, 6.2, 3.5], [8, 0.6, 0.2], C.parede),
    box([7, 5.1, 3.5], [2, 2.8, 0.2], C.parede),
    box([-6.5, 5.1, 0], [0.2, 2.8, 7.0], C.parede),
    box([8, 5.1, 0], [0.2, 2.8, 7.0], C.parede),
    box([-0.5, 0.42, 0], [9.6, 0.04, 7.6], C.piso),
  ];

  // 07 — Marcenaria
  const l6: Prim[] = [
    box([-0.5, 0.48, 6.0], [10, 0.12, 3.2], C.madeira),
    box([1.5, 0.92, 0.5], [3, 0.9, 1], C.madeira),
    box([-4.9, 1.7, -2], [0.6, 2.6, 2.4], C.madeira),
  ];
  for (let i = 0; i < 21; i++) l6.push(box([-6.3 + i * 0.2, 5.1, 3.66], [0.07, 2.7, 0.08], C.madeira));

  // 08 — Entrega: jardim, piscina, árvores, luz
  const l7: Prim[] = [
    box([0.5, -0.06, 2.5], [24, 0.1, 19], C.jardim, { e: false }),
    box([-0.5, 0.36, 8.9], [8, 0.08, 2.4], C.piscina, { e: false }),
  ];
  for (const x of [-3, 0, 3]) l7.push(box([x, 3.33, 0], [0.4, 0.03, 0.4], C.luz, { glow: true, e: false }));
  for (const x of [-3, 2, 6]) l7.push(box([x, 6.43, 0], [0.4, 0.03, 0.4], C.luz, { glow: true, e: false }));
  for (const [x, z] of [[9.5, 6], [-8.5, 5], [10.5, -3], [-9, -4.5]]) {
    l7.push({ t: "cyl", p: [x, 0.8, z], rad: 0.1, h: 1.6, c: "#5a4632" });
    l7.push({ t: "ico", p: [x, 2.2, z], rad: 1.1, c: C.copa });
  }

  return [l0, l1, l2, l3, l4, l5, l6, l7];
}

/* ------------------------------- Primitivos 3D ------------------------------- */
function Primitive({ prim }: { prim: Prim }) {
  const { geometry, edges } = useMemo(() => {
    let g: THREE.BufferGeometry;
    if (prim.t === "box") g = new THREE.BoxGeometry(...prim.s);
    else if (prim.t === "cyl") g = new THREE.CylinderGeometry(prim.rad, prim.rad, prim.h, 12);
    else g = new THREE.IcosahedronGeometry(prim.rad, 0);
    const showEdges = prim.t === "box" ? prim.e !== false : prim.t === "ico";
    return { geometry: g, edges: showEdges ? new THREE.EdgesGeometry(g, 20) : null };
  }, [prim]);

  const rot = prim.t !== "ico" && prim.r ? prim.r : ([0, 0, 0] as V3);
  const opacity = prim.t === "box" && prim.o !== undefined ? prim.o : 1;
  const glow = prim.t === "box" && prim.glow;

  return (
    <group position={prim.p} rotation={rot}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={prim.c}
          roughness={0.9}
          metalness={0.02}
          transparent={opacity < 1}
          opacity={opacity}
          depthWrite={opacity === 1}
          emissive={glow ? prim.c : "#000000"}
          emissiveIntensity={glow ? 1.4 : 0}
          flatShading={prim.t === "ico"}
        />
      </mesh>
      {edges && (
        <lineSegments geometry={edges}>
          <lineBasicMaterial color="#141413" transparent opacity={0.6} />
        </lineSegments>
      )}
    </group>
  );
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const SPAN = 0.92; // a última camada encaixa em 92% do scroll; o resto mantém a casa pronta

function Model({ progress }: { progress: RefObject<number> }) {
  const layers = useMemo(buildLayers, []);
  const groups = useRef<(THREE.Group | null)[]>([]);
  const root = useRef<THREE.Group>(null);
  const smooth = useRef(0);

  useFrame((_, dt) => {
    const target = progress.current ?? 0;
    smooth.current += (target - smooth.current) * Math.min(1, dt * 8);
    const P = smooth.current;
    groups.current.forEach((g, i) => {
      if (!g) return;
      // a camada 0 já está pronta no início; a última encaixa em SPAN
      const lp = Math.min(1, Math.max(0, (P / SPAN) * (layers.length - 1) - (i - 1)));
      const e = easeOut(lp);
      g.visible = lp > 0.001;
      g.position.y = (1 - e) * 9;
    });
    if (root.current) root.current.rotation.y = -0.42 + P * 0.7;
  });

  return (
    <group ref={root}>
      <group position={[-0.5, -3, -2.5]}>
        {layers.map((prims, i) => (
          <group key={i} ref={(el) => void (groups.current[i] = el)} visible={false}>
            {prims.map((p, j) => (
              <Primitive key={j} prim={p} />
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}

function Rig() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    cam.zoom = Math.min(size.width / 30, size.height / 21);
    cam.position.set(20, 15, 20);
    cam.lookAt(0, 0.5, 0);
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

export default function LayersScene({ progress, active }: { progress: RefObject<number>; active: boolean }) {
  return (
    <Canvas
      orthographic
      flat
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [20, 15, 20], zoom: 30, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <Rig />
      <ambientLight intensity={1.1} />
      <hemisphereLight args={["#ffffff", "#3a3a36", 0.6]} />
      <directionalLight position={[10, 18, 8]} intensity={1.8} />
      <directionalLight position={[-12, 6, -6]} intensity={0.35} />
      <Model progress={progress} />
    </Canvas>
  );
}
