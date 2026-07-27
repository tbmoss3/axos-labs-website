"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  r: number;
  phase: number;
  flash: number;
  hub: boolean;
  neighbors: number[];
}

interface Pulse {
  from: number;
  to: number;
  t: number;
  speed: number;
}

// Side-profile brain silhouette (facing left), normalized to a unit box:
// cerebrum dome, occipital lobe, cerebellum bump, and brainstem.
const BRAIN_OUTLINE: [number, number][] = [
  [0.1, 0.52],
  [0.06, 0.4],
  [0.08, 0.28],
  [0.16, 0.16],
  [0.28, 0.08],
  [0.42, 0.04],
  [0.56, 0.03],
  [0.68, 0.06],
  [0.8, 0.12],
  [0.88, 0.22],
  [0.93, 0.34],
  [0.94, 0.45],
  [0.9, 0.55],
  [0.92, 0.6],
  [0.88, 0.72],
  [0.78, 0.78],
  [0.68, 0.76],
  [0.63, 0.7],
  [0.6, 0.8],
  [0.55, 0.86],
  [0.52, 0.78],
  [0.5, 0.7],
  [0.42, 0.72],
  [0.3, 0.7],
  [0.2, 0.64],
  [0.13, 0.58],
];

function pointInPoly(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    ) {
      inside = !inside;
    }
  }
  return inside;
}

// Ambient simulation of neural activity: a faint synaptic network with
// electrical pulses that travel along connections, flash the receiving
// neuron, and often chain-fire onward. Reduced motion renders the static
// network only.
export function NeuralBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    let outlineEdgeCount = 0;
    let pulses: Pulse[] = [];
    let raf = 0;
    let last = 0;
    let spawnTimer = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // The whole network forms a single brain. The silhouette is traced by a
    // chain of neurons so the shape reads clearly; the interior keeps the
    // hive structure (hub ganglia + satellite swarms + fibers), with every
    // node constrained inside the silhouette.
    const build = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = [];
      edges = [];
      pulses = [];

      // Fit the silhouette (normalized bbox ~0.88 x 0.83) into the viewport
      const scale = Math.min((width * 0.82) / 0.88, (height * 0.84) / 0.83);
      const poly: [number, number][] = BRAIN_OUTLINE.map(([px, py]) => [
        width / 2 + (px - 0.5) * scale,
        height / 2 + (py - 0.445) * scale,
      ]);
      const inside = (x: number, y: number) => pointInPoly(x, y, poly);

      const link = (a: number, b: number) => {
        edges.push([a, b]);
        nodes[a].neighbors.push(b);
        nodes[b].neighbors.push(a);
      };

      // 1) Outline: neurons spaced along the perimeter, chained together
      const outlineIdx: number[] = [];
      const step = scale * 0.045;
      for (let i = 0; i < poly.length; i++) {
        const [x1, y1] = poly[i];
        const [x2, y2] = poly[(i + 1) % poly.length];
        const segLen = Math.hypot(x2 - x1, y2 - y1);
        const n = Math.max(1, Math.round(segLen / step));
        for (let k = 0; k < n; k++) {
          const t = k / n;
          outlineIdx.push(nodes.length);
          nodes.push({
            x: x1 + (x2 - x1) * t,
            y: y1 + (y2 - y1) * t,
            r: 1 + Math.random() * 1.1,
            phase: Math.random() * Math.PI * 2,
            flash: 0,
            hub: false,
            neighbors: [],
          });
        }
      }
      for (let i = 0; i < outlineIdx.length; i++) {
        link(outlineIdx[i], outlineIdx[(i + 1) % outlineIdx.length]);
      }
      outlineEdgeCount = edges.length;
      const outlineSet = new Set(outlineIdx);

      // 2) Interior ganglia: hubs + satellite swarms, all inside the brain
      const sampleInside = (): [number, number] | null => {
        for (let t = 0; t < 200; t++) {
          const x = width / 2 + (Math.random() - 0.5) * 0.88 * scale;
          const y = height / 2 + (Math.random() - 0.5) * 0.83 * scale;
          if (inside(x, y)) return [x, y];
        }
        return null;
      };

      const clusterCount = 7;
      const satPerCluster = 9;
      const spread = scale * 0.14;
      const hubIdx: number[] = [];
      for (let c = 0; c < clusterCount; c++) {
        const center = sampleInside();
        if (!center) continue;
        const hub = nodes.length;
        hubIdx.push(hub);
        nodes.push({
          x: center[0],
          y: center[1],
          r: 2.6 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          flash: 0,
          hub: true,
          neighbors: [],
        });
        let placed = 0;
        for (let s = 0; s < satPerCluster * 4 && placed < satPerCluster; s++) {
          const ang = Math.random() * Math.PI * 2;
          const rad = spread * ((Math.random() + Math.random()) / 2);
          const x = center[0] + Math.cos(ang) * rad;
          const y = center[1] + Math.sin(ang) * rad;
          if (!inside(x, y)) continue;
          nodes.push({
            x,
            y,
            r: 1 + Math.random() * 1.3,
            phase: Math.random() * Math.PI * 2,
            flash: 0,
            hub: false,
            neighbors: [],
          });
          placed++;
        }
        for (let i = hub + 1; i <= hub + placed; i++) {
          link(hub, i);
          for (let j = i + 1; j <= hub + placed; j++) {
            const d = Math.hypot(
              nodes[i].x - nodes[j].x,
              nodes[i].y - nodes[j].y
            );
            if (d < spread * 0.6) link(i, j);
          }
        }
      }

      // 3) Fibers between hubs: each hub to its 2 nearest fellow hubs
      const fibers = new Set<string>();
      for (const h of hubIdx) {
        hubIdx
          .filter((o) => o !== h)
          .map((o) => ({
            o,
            d: Math.hypot(nodes[h].x - nodes[o].x, nodes[h].y - nodes[o].y),
          }))
          .sort((p, q) => p.d - q.d)
          .slice(0, 2)
          .forEach(({ o }) => {
            const key = h < o ? `${h}-${o}` : `${o}-${h}`;
            if (!fibers.has(key)) {
              fibers.add(key);
              link(h, o);
            }
          });
      }

      // 4) Stitch outline to interior so silhouette and core fire as one
      for (let i = 0; i < outlineIdx.length; i += 3) {
        const o = outlineIdx[i];
        let best = -1;
        let bestD = scale * 0.22;
        for (let j = 0; j < nodes.length; j++) {
          if (outlineSet.has(j)) continue;
          const d = Math.hypot(nodes[j].x - nodes[o].x, nodes[j].y - nodes[o].y);
          if (d < bestD) {
            bestD = d;
            best = j;
          }
        }
        if (best >= 0) link(o, best);
      }
    };

    const drawNetwork = (now: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      // Silhouette edges drawn brighter than interior wiring so the brain
      // shape stays legible
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(167, 139, 250, 0.22)";
      ctx.beginPath();
      for (let e = 0; e < outlineEdgeCount; e++) {
        const [a, b] = edges[e];
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
      }
      ctx.stroke();
      ctx.strokeStyle = "rgba(139, 92, 246, 0.11)";
      ctx.beginPath();
      for (let e = outlineEdgeCount; e < edges.length; e++) {
        const [a, b] = edges[e];
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
      }
      ctx.stroke();
      for (const n of nodes) {
        const twinkle = 0.32 + 0.16 * Math.sin(now / 1400 + n.phase);
        if (n.hub) {
          // Hubs breathe: a soft halo marks each ganglion's center
          const halo = 0.1 + 0.06 * Math.sin(now / 1800 + n.phase);
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 26);
          g.addColorStop(0, `rgba(167, 139, 250, ${halo.toFixed(3)})`);
          g.addColorStop(1, "rgba(167, 139, 250, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 26, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(167, 139, 250, ${twinkle.toFixed(3)})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.flash > 0) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
          g.addColorStop(0, `rgba(196, 181, 253, ${(0.7 * n.flash).toFixed(3)})`);
          g.addColorStop(1, "rgba(196, 181, 253, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const spawnPulse = (from?: number, exclude?: number) => {
      // Bias half of spontaneous firings to start at a hub, so activity
      // radiates outward from the ganglia centers
      let start = from;
      if (start === undefined) {
        if (Math.random() < 0.5) {
          const hubs = nodes.filter((n) => n.hub);
          start = nodes.indexOf(hubs[Math.floor(Math.random() * hubs.length)]);
        } else {
          start = Math.floor(Math.random() * nodes.length);
        }
      }
      const options = nodes[start]?.neighbors.filter((n) => n !== exclude);
      if (!options || options.length === 0) return;
      const to = options[Math.floor(Math.random() * options.length)];
      pulses.push({ from: start, to, t: 0, speed: 110 + Math.random() * 90 });
    };

    const frame = (now: number) => {
      const dt = last === 0 ? 0.016 : Math.min(0.05, (now - last) / 1000);
      last = now;

      for (const n of nodes) n.flash = Math.max(0, n.flash - dt * 1.8);

      spawnTimer -= dt;
      if (spawnTimer <= 0 && pulses.length < 20) {
        spawnPulse();
        spawnTimer = 0.1 + Math.random() * 0.2;
      }

      const arrived: Pulse[] = [];
      for (const p of pulses) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        p.t += (p.speed * dt) / len;
        if (p.t >= 1) arrived.push(p);
      }
      for (const p of arrived) {
        pulses.splice(pulses.indexOf(p), 1);
        nodes[p.to].flash = 1;
        if (Math.random() < 0.65) spawnPulse(p.to, p.from);
      }

      drawNetwork(now);

      for (const p of pulses) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const tailT = Math.max(0, p.t - 0.18);
        const tx = a.x + (b.x - a.x) * tailT;
        const ty = a.y + (b.y - a.y) * tailT;
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, "rgba(139, 92, 246, 0)");
        grad.addColorStop(1, "rgba(196, 181, 253, 0.8)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "rgba(221, 214, 254, 0.95)";
        ctx.arc(x, y, 1.9, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    build();
    if (reduceMotion) {
      drawNetwork(0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      build();
      if (reduceMotion) drawNetwork(0);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
}
