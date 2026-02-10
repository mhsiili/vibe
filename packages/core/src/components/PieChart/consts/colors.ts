/**
 * Default color palette for pie chart slices
 * Uses Vibe design tokens for consistency
 */
export const DEFAULT_COLORS = [
  "var(--primary-color)",
  "var(--positive-color)",
  "var(--warning-color)",
  "var(--negative-color)",
  "var(--brand-color)",
  "var(--info-color)",
  "var(--success-color)",
  "var(--dark-color)",
  "var(--inverted-color-background)",
  "var(--secondary-text-color)"
] as const;

/**
 * Get color for a slice by index, cycling through the palette
 */
export function getSliceColor(index: number, customColor?: string): string {
  if (customColor) {
    return customColor;
  }

  return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}
