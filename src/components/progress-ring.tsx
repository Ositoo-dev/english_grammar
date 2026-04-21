"use client";

export function ProgressRing({ progress }: { progress: number }) {
  const radius = 20;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative h-11 w-11">
      <svg
        height="44"
        width="44"
        className="-rotate-90"
      >
        <circle
          stroke="var(--border)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="var(--accent)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.35s' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-body text-[10px] font-bold text-text-primary">
        {Math.round(progress)}%
      </span>
    </div>
  );
}
