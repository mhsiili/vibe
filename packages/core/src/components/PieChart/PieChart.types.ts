import { type VibeComponentProps } from "../../types";

export interface PieChartSlice {
  /**
   * The numerical value for this slice
   */
  value: number;
  /**
   * The label text for this slice
   */
  label: string;
  /**
   * Optional custom color for this slice (hex, rgb, or CSS variable)
   * Falls back to default color palette if not provided
   */
  color?: string;
}

export type PieChartSize = "small" | "medium" | "large";

export type PieChartLegendPosition = "top" | "bottom" | "left" | "right";

export interface PieChartProps extends VibeComponentProps {
  /**
   * Array of data slices to display in the pie chart
   */
  data: PieChartSlice[];
  /**
   * Size of the pie chart
   */
  size?: PieChartSize;
  /**
   * If true, renders as a donut chart with a hollow center
   */
  donutMode?: boolean;
  /**
   * If true, enables entrance animation
   */
  animated?: boolean;
  /**
   * Callback fired when a slice is clicked
   */
  onSliceClick?: (slice: PieChartSlice, index: number) => void;
  /**
   * If true, displays a legend beside the chart
   */
  showLegend?: boolean;
  /**
   * Position of the legend relative to the chart
   */
  legendPosition?: PieChartLegendPosition;
  /**
   * ARIA label for the pie chart
   */
  ariaLabel?: string;
}
