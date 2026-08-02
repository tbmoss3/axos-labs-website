"use client";

const systems = [
  { name: "QBO", x: 80, y: 80 },
  { name: "RentManager", x: 280, y: 40 },
  { name: "CRM", x: 480, y: 80 },
  { name: "ERP", x: 80, y: 240 },
  { name: "Email", x: 480, y: 240 },
];

export function SystemArchitecture() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 560 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Connection lines */}
        {systems.map((sys) => (
          <line
            key={sys.name}
            x1={sys.x + 40}
            y1={sys.y + 20}
            x2={280}
            y2={170}
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* System nodes */}
        {systems.map((sys) => (
          <g key={sys.name}>
            <rect
              x={sys.x}
              y={sys.y}
              width="80"
              height="40"
              rx="4"
              fill="white"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1"
            />
            <text
              x={sys.x + 40}
              y={sys.y + 25}
              textAnchor="middle"
              fill="#1a1a2e"
              fontSize="12"
              fontFamily="var(--font-inter), sans-serif"
              fontWeight="500"
            >
              {sys.name}
            </text>
          </g>
        ))}

        {/* Brain center node */}
        <g>
          <rect
            x={220}
            y={130}
            width="120"
            height="80"
            rx="6"
            fill="white"
            stroke="#7c3aed"
            strokeWidth="1.5"
          />
          <text
            x={280}
            y={165}
            textAnchor="middle"
            fill="#1a1a2e"
            fontSize="14"
            fontFamily="var(--font-serif), serif"
            fontWeight="400"
          >
            AI Brain
          </text>
          <text
            x={280}
            y={185}
            textAnchor="middle"
            fill="#6b7280"
            fontSize="10"
            fontFamily="var(--font-inter), sans-serif"
          >
            On Your Hardware
          </text>
        </g>

        {/* Pulse dots on lines */}
        <circle cx="180" cy="110" r="2" fill="#7c3aed" opacity="0.5">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="360" cy="110" r="2" fill="#7c3aed" opacity="0.5">
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="180" cy="210" r="2" fill="#7c3aed" opacity="0.5">
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
