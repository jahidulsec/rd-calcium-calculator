import { cn } from "@/lib/utils";
import React from "react";

export type CircularProgressProps = {
  /** 0 - 100 */
  progress: number;
  /** diameter in px */
  size?: number;
  /** stroke width in px */
  stroke?: number;
  /** background track color (tailwind or any css color) */
  trackColor?: string;
  /** progress stroke color */
  indicatorColor?: string;
  /** optional label under the percent */
  label?: string;
  /** show percent text in center */
  showPercent?: boolean;
  /** optional className wrapper */
  className?: string;
};

/**
 * CircularProgress
 *
 * Renders an accessible SVG-based circular progress indicator.
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 120,
  stroke = 10,
  //   trackColor = "#e5e7eb", // tailwind gray-200
  //   indicatorColor = "#0ea5e9", // tailwind sky-500
  label,
  showPercent = true,
  className,
}) => {
  // clamp progress to [0,100]
  const pct = Math.max(0, Math.min(100, Math.round(progress)));

  // radius = (diameter - stroke) / 2
  // use number-by-number calculation to avoid surprises
  // e.g. size 120, stroke 10 => radius = (120 - 10) / 2 = 55
  const radius = (size - stroke) / 2;
  // circumference = 2 * PI * radius
  const circumference = 2 * Math.PI * radius;
  // strokeDashoffset for progress: circumference * (1 - pct/100)
  const offset = circumference * (1 - pct / 100);

  let indicatorColor = "#ff2056";
  const trackColor = "oklch(0.967 0.001 286.375)";

  if (progress < 30) {
    indicatorColor = "#ff2056";
  } else if (progress < 60) {
    indicatorColor = "#ffb900";
  } else if (progress <= 100) {
    indicatorColor = "#009689";
  }

  return (
    <div
      role="img"
      aria-label={label ? `${label} - ${pct}%` : `Progress: ${pct}%`}
      className={`inline-flex flex-col items-center ${className ?? ""}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
        aria-hidden={false}
      >
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={trackColor}
            strokeWidth={stroke}
          />
          {/* Progress indicator */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={indicatorColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={-offset}
            style={{
              transition: "stroke-dashoffset 600ms ease, stroke 200ms",
            }}
          />
        </g>
        {/* Optional center content */}
        <foreignObject
          x={stroke}
          y={stroke}
          width={size - stroke * 2}
          height={size - stroke * 2}
        >
          <div
            className="w-full h-full flex flex-col items-center justify-center text-center select-none"
            style={{ fontFamily: "inherit" }}
          >
            {showPercent && (
              <div
                className={cn(
                  "text-xs font-semibold w-[90px] aspect-square flex justify-center items-center rounded-full",
                  pct >= 0 && pct < 30
                    ? "bg-destructive/10 text-destructive"
                    : pct < 60
                    ? "bg-chart-4/10 text-chart-4"
                    : pct <= 100
                    ? "bg-chart-2/10 text-chart-2"
                    : "bg-destructive/10 text-destructive"
                )}
                aria-hidden
              >
                {pct}% <br /> Calcium
              </div>
            )}
          </div>
        </foreignObject>
      </svg>

      {label && (
        <div className="mt-2 text-xs text-muted-foreground" aria-hidden>
          {label}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
