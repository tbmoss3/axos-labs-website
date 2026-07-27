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
    let pulses: Pulse[] = [];
    let raf = 0;
    let last = 0;
    let spawnTimer = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Hive-mind topology: ganglia (a hub neuron surrounded by a swarm of
    // satellites, densely interlinked) connected to neighboring ganglia by
    // long fibers. Activity radiates from hubs, so the network reads as one
    // collective organism instead of random scatter.
    const build = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = [];
      edges = [];
      pulses = [];

      const clusterCount = Math.max(4, Math.min(9, Math.round(width / 220)));
      const cx = width / 2;
      const cy = height / 2;
      const centers = Array.from({ length: clusterCount }, (_, i) => {
        const angle =
          (i / clusterCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        return {
          x: cx + Math.cos(angle) * width * 0.36 * (0.6 + Math.random() * 0.55),
          y: cy + Math.sin(angle) * height * 0.34 * (0.6 + Math.random() * 0.55),
        };
      });

      const satPerCluster = Math.max(
        6,
        Math.min(13, Math.floor((width * height) / 16000 / clusterCount))
      );
      const spread = Math.min(width, height) * 0.17;
      const hubIdx: number[] = [];
      for (const c of centers) {
        hubIdx.push(nodes.length);
        nodes.push({
          x: c.x,
          y: c.y,
          r: 2.6 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          flash: 0,
          hub: true,
          neighbors: [],
        });
        for (let s = 0; s < satPerCluster; s++) {
          const ang = Math.random() * Math.PI * 2;
          const rad = spread * ((Math.random() + Math.random()) / 2);
          nodes.push({
            x: c.x + Math.cos(ang) * rad,
            y: c.y + Math.sin(ang) * rad,
            r: 1 + Math.random() * 1.3,
            phase: Math.random() * Math.PI * 2,
            flash: 0,
            hub: false,
            neighbors: [],
          });
        }
      }

      const link = (a: number, b: number) => {
        edges.push([a, b]);
        nodes[a].neighbors.push(b);
        nodes[b].neighbors.push(a);
      };

      // Intra-cluster: every satellite to its hub, plus nearby satellites
      hubIdx.forEach((hub) => {
        const start = hub + 1;
        const end = hub + satPerCluster;
        for (let i = start; i <= end; i++) {
          link(hub, i);
          for (let j = i + 1; j <= end; j++) {
            const d = Math.hypot(
              nodes[i].x - nodes[j].x,
              nodes[i].y - nodes[j].y
            );
            if (d < spread * 0.55) link(i, j);
          }
        }
      });

      // Inter-cluster fibers: each hub to its 2 nearest fellow hubs
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
    };

    const drawNetwork = (now: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(139, 92, 246, 0.11)";
      ctx.beginPath();
      for (const [a, b] of edges) {
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
