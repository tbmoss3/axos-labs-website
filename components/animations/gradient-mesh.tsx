"use client";

import { cn } from "@/lib/utils";

interface GradientMeshProps {
  className?: string;
}

export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Blob 1 */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          animation: "blob1 18s ease-in-out infinite",
        }}
      />
      {/* Blob 2 */}
      <div
        className="absolute top-[30%] -right-[15%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-15 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          animation: "blob2 22s ease-in-out infinite",
        }}
      />
      {/* Blob 3 */}
      <div
        className="absolute -bottom-[10%] left-[20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-10 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
          animation: "blob3 20s ease-in-out infinite",
        }}
      />
      {/* Subtle noise/overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <style jsx>{`
        @keyframes blob1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 40px) scale(0.95);
          }
        }
        @keyframes blob2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 50px) scale(1.05);
          }
          66% {
            transform: translate(30px, -20px) scale(0.95);
          }
        }
        @keyframes blob3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, 30px) scale(1.08);
          }
          66% {
            transform: translate(-50px, -40px) scale(0.9);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
