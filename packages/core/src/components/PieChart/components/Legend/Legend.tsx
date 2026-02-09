import React from "react";
import cx from "classnames";
import { type PieChartSlice } from "../../PieChart.types";
import styles from "./Legend.module.scss";

export interface LegendProps {
  data: PieChartSlice[];
  colors: string[];
  percentages: number[];
  position: "top" | "bottom" | "left" | "right";
  testId?: string;
}

const Legend = ({ data, colors, percentages, position, testId }: LegendProps) => {
  const isHorizontal = position === "top" || position === "bottom";

  return (
    <div
      className={cx(styles.legend, {
        [styles.horizontal]: isHorizontal,
        [styles.vertical]: !isHorizontal
      })}
      data-testid={testId}
    >
      {data.map((slice, index) => (
        <div key={index} className={styles.legendItem}>
          <div className={styles.colorIndicator} style={{ backgroundColor: colors[index] }} aria-hidden="true" />
          <div className={styles.legendContent}>
            <span className={styles.label}>{slice.label}</span>
            <span className={styles.value}>
              {slice.value} ({percentages[index].toFixed(1)}%)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Legend;
