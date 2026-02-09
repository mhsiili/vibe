import React, { useCallback } from "react";
import cx from "classnames";
import { type PieChartSlice } from "../../PieChart.types";
import { createArcPath } from "../../utils/calculations";
import styles from "./Slice.module.scss";

export interface SliceProps {
  slice: PieChartSlice;
  index: number;
  centerX: number;
  centerY: number;
  radius: number;
  innerRadius: number;
  startAngle: number;
  endAngle: number;
  color: string;
  animated: boolean;
  onClick?: (slice: PieChartSlice, index: number) => void;
  onMouseEnter?: (slice: PieChartSlice, index: number) => void;
  onMouseLeave?: () => void;
  testId?: string;
}

const Slice = ({
  slice,
  index,
  centerX,
  centerY,
  radius,
  innerRadius,
  startAngle,
  endAngle,
  color,
  animated,
  onClick,
  onMouseEnter,
  onMouseLeave,
  testId
}: SliceProps) => {
  const pathData = createArcPath(centerX, centerY, radius, startAngle, endAngle, innerRadius);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(slice, index);
    }
  }, [onClick, slice, index]);

  const handleMouseEnter = useCallback(() => {
    if (onMouseEnter) {
      onMouseEnter(slice, index);
    }
  }, [onMouseEnter, slice, index]);

  const percentage = ((endAngle - startAngle) / 360) * 100;
  const ariaLabel = `${slice.label}: ${slice.value} (${percentage.toFixed(1)}%)`;

  return (
    <path
      d={pathData}
      fill={color}
      className={cx(styles.slice, {
        [styles.animated]: animated,
        [styles.clickable]: Boolean(onClick)
      })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      role="img"
      data-testid={testId}
    />
  );
};

export default Slice;
