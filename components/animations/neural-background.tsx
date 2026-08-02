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

// Sparse neural network — wide, thin connections, few nodes
// Faint gray/purple to sit subtly on white backgrounds
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

    const build = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = [];
      edges = [];
      pulses = [];

      // Fewer nodes, spread widely across viewport (not in a brain shape)
      // Like Bittensor: sparse nodes with thin geometric connections
      const nodeCount = Math.max(20, Math.floor((width * height) / 30000));
      const linkDist = Math.min(width, height) * 0.22;

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1.2 + Math.random() * 0.8,
          phase: Math.random() * Math.PI * 2,
          flash: 0,
          hub: Math.random() < 0.12, // fewer hubs
          neighbors: [],
        });
      }

      // Connect nearby nodes, limit edges per node
      for (let i = 0; i < nodes.length; i++) {
        const near = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < linkDist) near.push({ j, d });
        }
        near.sort((a, b) => a.d - b.d);
        for (let k = 0; k < Math.min(near.length, 3); k++) {
          const { j } = near[k];
          if (!nodes[i].neighbors.includes(j)) {
            edges.push([i, j]);
            nodes[i].neighbors.push(j);
            nodes[j].neighbors.push(i);
          }
        }
      }

      // Make hubs slightly larger
      for (const n of nodes) {
        if (n.hub) n.r = 2.0 + Math.random() * 1.0;
      }
    };

    const drawNetwork = (now: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // Very faint edges — barely visible
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "rgba(124, 58, 237, 0.08)";
      ctx.beginPath();
      for (const [a, b] of edges) {
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
      }
      ctx.stroke();

      for (const n of nodes) {
        const twinkle = 0.18 + 0.08 * Math.sin(now / 2000 + n.phase);
        if (n.hub) {
          const halo = 0.06 + 0.03 * Math.sin(now / 2500 + n.phase);
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18);
          g.addColorStop(0, `rgba(124, 58, 237, ${halo.toFixed(3)})`);
          g.addColorStop(1, "rgba(124, 58, 237, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(124, 58, 237, ${twinkle.toFixed(3)})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.flash > 0) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 8);
          g.addColorStop(0, `rgba(139, 92, 246, ${(0.4 * n.flash).toFixed(3)})`);
          g.addColorStop(1, "rgba(139, 92, 246, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const spawnPulse = (from?: number, exclude?: number) => {
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
      pulses.push({ from: start, to, t: 0, speed: 90 + Math.random() * 70 });
    };

    const frame = (now: number) => {
      const dt = last === 0 ? 0.016 : Math.min(0.05, (now - last) / 1000);
      last = now;

      for (const n of nodes) n.flash = Math.max(0, n.flash - dt * 1.2);

      spawnTimer -= dt;
      if (spawnTimer <= 0 && pulses.length < 8) {
        spawnPulse();
        spawnTimer = 0.2 + Math.random() * 0.3;
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
        if (Math.random() < 0.5) spawnPulse(p.to, p.from);
      }

      drawNetwork(now);

      for (const p of pulses) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const tailT = Math.max(0, p.t - 0.14);
        const tx = a.x + (b.x - a.x) * tailT;
        const ty = a.y + (b.y - a.y) * tailT;
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, "rgba(124, 58, 237, 0)");
        grad.addColorStop(1, "rgba(139, 92, 246, 0.5)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "rgba(139, 92, 246, 0.7)";
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
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
