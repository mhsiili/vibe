import React, { useEffect, useRef, useState } from "react";
import { type PieChartSlice } from "../../PieChart.types";
import styles from "./Tooltip.module.scss";

export interface TooltipProps {
  slice: PieChartSlice | null;
  percentage: number;
  mouseX: number;
  mouseY: number;
}

const Tooltip = ({ slice, percentage, mouseX, mouseY }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: mouseX, y: mouseY });

  useEffect(() => {
    if (!tooltipRef.current || !slice) return;

    const tooltip = tooltipRef.current;
    const tooltipRect = tooltip.getBoundingClientRect();
    const offsetX = 12; // Horizontal offset from cursor
    const offsetY = -8; // Vertical offset from cursor (slight upward shift)

    // Always position to the right of the cursor
    let x = mouseX + offsetX;
    let y = mouseY + offsetY;

    // Get the chart container bounds (tooltip's offset parent)
    const container = tooltip.offsetParent;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      
      // Only adjust if tooltip would go off the right edge of container
      if (x + tooltipRect.width > containerRect.width) {
        // Position to the left of cursor as fallback
        x = mouseX - tooltipRect.width - offsetX;
      }

      // Adjust if tooltip would go off the bottom edge of container
      if (y + tooltipRect.height > containerRect.height) {
        y = containerRect.height - tooltipRect.height - 4;
      }

      // Ensure tooltip doesn't go off the top edge
      if (y < 0) {
        y = 4;
      }

      // Ensure tooltip doesn't go off the left edge (edge case)
      if (x < 0) {
        x = 4;
      }
    }

    setPosition({ x, y });
  }, [mouseX, mouseY, slice]);

  if (!slice) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className={styles.tooltip}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      role="tooltip"
    >
      <div className={styles.label}>{slice.label}</div>
      <div className={styles.value}>Value: {slice.value}</div>
      <div className={styles.percentage}>{percentage.toFixed(1)}%</div>
    </div>
  );
};

export default Tooltip;
