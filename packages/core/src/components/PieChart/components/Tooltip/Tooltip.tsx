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
    const padding = 10;

    let x = mouseX + padding;
    let y = mouseY + padding;

    // Adjust if tooltip would go off screen
    if (x + tooltipRect.width > window.innerWidth) {
      x = mouseX - tooltipRect.width - padding;
    }

    if (y + tooltipRect.height > window.innerHeight) {
      y = mouseY - tooltipRect.height - padding;
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
