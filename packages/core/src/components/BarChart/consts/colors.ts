/**
 * Default color palette for bar chart series.
 * Uses Vibe design tokens; approximates Figma blue-purple, lavender, light pink.
 */
export const DEFAULT_BAR_COLORS = [
  "var(--primary-color)",
  "var(--primary-selected-color)",
  "var(--positive-color)"
] as const;

/**
 * Get fill color for a bar series by index, with optional custom color.
 */
export function getBarColor(seriesIndex: number, customColor?: string): string {
  if (customColor) {
    return customColor;
  }
  return DEFAULT_BAR_COLORS[seriesIndex % DEFAULT_BAR_COLORS.length];
}
