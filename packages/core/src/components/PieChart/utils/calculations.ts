import { type PieChartSlice } from "../PieChart.types";

/**
 * Calculate the percentage value for each slice
 */
export function calculatePercentages(data: PieChartSlice[]): number[] {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  if (total === 0) {
    return data.map(() => 0);
  }

  return data.map(slice => (slice.value / total) * 100);
}

/**
 * Calculate start and end angles for each slice in degrees
 */
export function calculateAngles(percentages: number[]): { start: number; end: number }[] {
  let currentAngle = -90; // Start from top (12 o'clock position)

  return percentages.map(percentage => {
    const angleSize = (percentage / 100) * 360;
    const start = currentAngle;
    const end = currentAngle + angleSize;
    currentAngle = end;

    return { start, end };
  });
}

/**
 * Convert polar coordinates to cartesian coordinates
 */
export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

/**
 * Create SVG path string for an arc (pie slice)
 */
export function createArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  innerRadius = 0
): string {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  if (innerRadius > 0) {
    // Donut mode - create a path with inner and outer arcs
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);

    return [
      `M ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x} ${innerStart.y}`,
      "Z"
    ].join(" ");
  }

  // Regular pie mode - path from center
  return [
    `M ${centerX} ${centerY}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z"
  ].join(" ");
}
