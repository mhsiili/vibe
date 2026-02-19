import type { ReactNode } from "react";
import type { VibeComponentProps } from "../../types";

export interface BarChartSeriesConfig {
  /**
   * Data key for this series (must match a key in each data item)
   */
  key: string;
  /**
   * Label shown in the legend
   */
  label: string;
  /**
   * Optional color (hex, rgb, or CSS variable). Falls back to default palette if not provided.
   */
  color?: string;
}

export interface BarChartPeriodOption {
  value: string;
  label: string;
}

export interface BarChartPeriodSelector {
  /** Currently selected value */
  value: string;
  /** Options for the dropdown */
  options: BarChartPeriodOption[];
  /** Called when selection changes */
  onChange: (value: string) => void;
}

/**
 * Data item: one key (categoryKey, default "name") for the X-axis category;
 * remaining keys are numeric series values keyed by series[].key.
 */
export type BarChartDataItem = Record<string, string | number>;

export interface BarChartProps extends VibeComponentProps {
  /**
   * Chart data. Each item must have a category field (see categoryKey) and numeric values for each series key.
   */
  data: BarChartDataItem[];
  /**
   * Series definitions: key (data key), label (legend), optional color.
   */
  series: BarChartSeriesConfig[];
  /**
   * Key in each data item used for the X-axis category (default "name")
   */
  categoryKey?: string;
  /**
   * Optional chart title (header left)
   */
  title?: ReactNode;
  /**
   * Optional aggregate value displayed below/beside the title (e.g. "5.000,00")
   */
  aggregateValue?: string | number;
  /**
   * Optional period selector dropdown (header right, e.g. "This Week")
   */
  periodSelector?: BarChartPeriodSelector;
  /**
   * Whether to show the legend below the chart (default true)
   */
  showLegend?: boolean;
  /**
   * ARIA label for the chart region
   */
  ariaLabel?: string;
}
