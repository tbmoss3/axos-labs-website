"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  r: number;
  phase: number;
  flash: number;
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

    const build = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(30, Math.min(90, Math.floor((width * height) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        flash: 0,
        neighbors: [],
      }));
      edges = [];
      const linkDist = 150;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.hypot(dx, dy) < linkDist) {
            edges.push([i, j]);
            nodes[i].neighbors.push(j);
            nodes[j].neighbors.push(i);
          }
        }
      }
      pulses = [];
    };

    const drawNetwork = (now: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(139, 92, 246, 0.06)";
      ctx.beginPath();
      for (const [a, b] of edges) {
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
      }
      ctx.stroke();
      for (const n of nodes) {
        const twinkle = 0.2 + 0.13 * Math.sin(now / 1400 + n.phase);
        ctx.beginPath();
        ctx.fillStyle = `rgba(167, 139, 250, ${twinkle.toFixed(3)})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.flash > 0) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
          g.addColorStop(0, `rgba(196, 181, 253, ${(0.5 * n.flash).toFixed(3)})`);
          g.addColorStop(1, "rgba(196, 181, 253, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const spawnPulse = (from?: number, exclude?: number) => {
      const start = from ?? Math.floor(Math.random() * nodes.length);
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
      if (spawnTimer <= 0 && pulses.length < 7) {
        spawnPulse();
        spawnTimer = 0.35 + Math.random() * 0.5;
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
        if (Math.random() < 0.55) spawnPulse(p.to, p.from);
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
        grad.addColorStop(1, "rgba(196, 181, 253, 0.55)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "rgba(221, 214, 254, 0.85)";
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
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
