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
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-12 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
          animation: "blob1 18s ease-in-out infinite",
        }}
      />
      {/* Blob 2 */}
      <div
        className="absolute top-[30%] -right-[15%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-8 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #ddd6fe 0%, transparent 70%)",
          animation: "blob2 22s ease-in-out infinite",
        }}
      />
      {/* Blob 3 */}
      <div
        className="absolute -bottom-[10%] left-[20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-6 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #c4b5fd 0%, transparent 70%)",
          animation: "blob3 20s ease-in-out infinite",
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
