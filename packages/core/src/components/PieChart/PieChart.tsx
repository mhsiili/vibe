import React, { forwardRef, useMemo, useState, useCallback } from "react";
import cx from "classnames";
import { type PieChartProps, type PieChartSlice } from "./PieChart.types";
import { calculatePercentages, calculateAngles } from "./utils/calculations";
import { getSliceColor } from "./consts/colors";
import Slice from "./components/Slice/Slice";
import Legend from "./components/Legend/Legend";
import Tooltip from "./components/Tooltip/Tooltip";
import { ComponentDefaultTestId, ComponentVibeId } from "../../tests/constants";
import { getTestId } from "../../tests/test-ids-utils";
import styles from "./PieChart.module.scss";

const PieChart = forwardRef(
  (
    {
      data,
      size = "medium",
      donutMode = false,
      animated = true,
      onSliceClick,
      showLegend = false,
      legendPosition = "right",
      ariaLabel = "Pie chart",
      className,
      id,
      "data-testid": dataTestId
    }: PieChartProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [hoveredSlice, setHoveredSlice] = useState<{
      slice: PieChartSlice;
      index: number;
      percentage: number;
    } | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Calculate percentages and angles
    const percentages = useMemo(() => calculatePercentages(data), [data]);
    const angles = useMemo(() => calculateAngles(percentages), [percentages]);

    // Assign colors to slices
    const colors = useMemo(() => data.map((slice, index) => getSliceColor(index, slice.color)), [data]);

    // Calculate dimensions based on size
    const { viewBoxSize, radius, innerRadius, strokeWidth } = useMemo(() => {
      const dimensions = {
        small: { viewBoxSize: 120, radius: 50, innerRadius: 25, strokeWidth: 1 },
        medium: { viewBoxSize: 200, radius: 85, innerRadius: 42, strokeWidth: 1.5 },
        large: { viewBoxSize: 280, radius: 120, innerRadius: 60, strokeWidth: 2 }
      };
      return dimensions[size];
    }, [size]);

    const centerX = viewBoxSize / 2;
    const centerY = viewBoxSize / 2;
    const actualInnerRadius = donutMode ? innerRadius : 0;

    const handleSliceMouseEnter = useCallback(
      (slice: PieChartSlice, index: number) => {
        setHoveredSlice({ slice, index, percentage: percentages[index] });
      },
      [percentages]
    );

    const handleSliceMouseLeave = useCallback(() => {
      setHoveredSlice(null);
    }, []);

    const handleMouseMove = useCallback((event: React.MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }, []);

    const wrapperClassName = useMemo(
      () =>
        cx(
          styles.wrapper,
          styles[size],
          {
            [styles.withLegend]: showLegend,
            [styles.legendTop]: showLegend && legendPosition === "top",
            [styles.legendBottom]: showLegend && legendPosition === "bottom",
            [styles.legendLeft]: showLegend && legendPosition === "left",
            [styles.legendRight]: showLegend && legendPosition === "right"
          },
          className
        ),
      [size, showLegend, legendPosition, className]
    );

    if (!data || data.length === 0) {
      return (
        <div
          ref={ref}
          id={id}
          className={cx(styles.wrapper, styles.empty, className)}
          data-testid={dataTestId || getTestId(ComponentDefaultTestId.PIE_CHART, id)}
          data-vibe={ComponentVibeId.PIE_CHART}
        >
          <div className={styles.emptyMessage}>No data to display</div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        id={id}
        className={wrapperClassName}
        data-testid={dataTestId || getTestId(ComponentDefaultTestId.PIE_CHART, id)}
        data-vibe={ComponentVibeId.PIE_CHART}
      >
        {showLegend && (legendPosition === "top" || legendPosition === "left") && (
          <Legend
            data={data}
            colors={colors}
            percentages={percentages}
            position={legendPosition}
            testId={getTestId(ComponentDefaultTestId.PIE_CHART_LEGEND, id)}
          />
        )}

        <div className={styles.chartContainer} onMouseMove={handleMouseMove}>
          <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className={styles.svg} role="img" aria-label={ariaLabel}>
            {data.map((slice, index) => (
              <Slice
                key={index}
                slice={slice}
                index={index}
                centerX={centerX}
                centerY={centerY}
                radius={radius}
                innerRadius={actualInnerRadius}
                startAngle={angles[index].start}
                endAngle={angles[index].end}
                color={colors[index]}
                animated={animated}
                onClick={onSliceClick}
                onMouseEnter={handleSliceMouseEnter}
                onMouseLeave={handleSliceMouseLeave}
                testId={getTestId(ComponentDefaultTestId.PIE_CHART_SLICE, `${id}-${index}`)}
              />
            ))}

            {donutMode && (
              <circle
                cx={centerX}
                cy={centerY}
                r={actualInnerRadius}
                fill="var(--primary-background-color)"
                stroke="var(--ui-border-color)"
                strokeWidth={strokeWidth}
              />
            )}
          </svg>

          {hoveredSlice && (
            <Tooltip
              slice={hoveredSlice.slice}
              percentage={hoveredSlice.percentage}
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
            />
          )}
        </div>

        {showLegend && (legendPosition === "bottom" || legendPosition === "right") && (
          <Legend
            data={data}
            colors={colors}
            percentages={percentages}
            position={legendPosition}
            testId={getTestId(ComponentDefaultTestId.PIE_CHART_LEGEND, id)}
          />
        )}
      </div>
    );
  }
);

export default PieChart;
