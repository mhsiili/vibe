import React, { forwardRef, useMemo } from "react";
import cx from "classnames";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { Heading, Text } from "@vibe/typography";
import { Dropdown } from "../Dropdown";
import { ComponentDefaultTestId, ComponentVibeId } from "../../tests/constants";
import { getTestId } from "../../tests/test-ids-utils";
import { getBarColor } from "./consts/colors";
import type { BarChartProps } from "./BarChart.types";
import styles from "./BarChart.module.scss";

const STACK_ID = "stack1";

const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      series,
      categoryKey = "name",
      title,
      aggregateValue,
      periodSelector,
      showLegend = true,
      ariaLabel,
      className,
      id,
      "data-testid": dataTestId
    },
    ref
  ) => {
    const hasHeader = Boolean(title ?? aggregateValue ?? periodSelector);

    const periodDropdownValue = useMemo(() => {
      if (!periodSelector) return undefined;
      return periodSelector.options.find(opt => opt.value === periodSelector.value);
    }, [periodSelector]);

    const periodDropdownOptions = periodSelector?.options ?? [];

    const handlePeriodChange = (option: { value: string; label: string } | { value: string; label: string }[]) => {
      if (!periodSelector) return;
      const selected = Array.isArray(option) ? option[0] : option;
      if (selected && typeof selected.value === "string") {
        periodSelector.onChange(selected.value);
      }
    };

    const chartContent = useMemo(() => {
      if (!data?.length || !series?.length) return null;

      return (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="0" stroke="var(--layout-border-color)" vertical={false} />
            <XAxis
              dataKey={categoryKey}
              tick={{ fill: "var(--secondary-text-color)", fontSize: 12 }}
              axisLine={{ stroke: "var(--layout-border-color)" }}
              tickLine={false}
            />
            <YAxis
              allowDecimals
              tick={{ fill: "var(--secondary-text-color)", fontSize: 12 }}
              axisLine={false}
              tickLine={{ stroke: "var(--layout-border-color)" }}
            />
            <Tooltip
              cursor={{ fill: "var(--primary-background-hover-color)" }}
              contentStyle={{
                backgroundColor: "var(--primary-background-color)",
                border: "1px solid var(--layout-border-color)",
                borderRadius: "4px"
              }}
              labelStyle={{ color: "var(--primary-text-color)" }}
            />
            {showLegend && (
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: "var(--primary-text-color)", fontSize: 12, marginLeft: 8 }}>
                    {series.find(s => s.key === entry?.dataKey)?.label ?? value}
                  </span>
                )}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: 16 }}
              />
            )}
            {series.map((s, index) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                stackId={STACK_ID}
                fill={getBarColor(index, s.color)}
                name={s.label}
                radius={[0, 0, 0, 0]}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      );
    }, [data, series, categoryKey, showLegend]);

    return (
      <div
        ref={ref}
        id={id}
        className={cx(styles.wrapper, className)}
        data-vibe={ComponentVibeId.BAR_CHART}
        data-testid={dataTestId ?? getTestId(ComponentDefaultTestId.BAR_CHART, id)}
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
      >
        {hasHeader && (
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              {title != null && (
                <Heading type="h4" className={styles.title}>
                  {title}
                </Heading>
              )}
              {aggregateValue != null && (
                <Text type="text1" weight="medium" className={styles.aggregate}>
                  {String(aggregateValue)}
                </Text>
              )}
            </div>
            {periodSelector && (
              <div className={styles.periodSelector}>
                <Dropdown
                  options={periodDropdownOptions}
                  value={periodDropdownValue}
                  onChange={handlePeriodChange}
                  size="small"
                  searchable={false}
                  clearable={false}
                  placeholder=""
                  className={styles.periodDropdown}
                />
              </div>
            )}
          </div>
        )}
        <div className={styles.chartContainer}>{chartContent}</div>
      </div>
    );
  }
);

BarChart.displayName = "BarChart";

export default BarChart;
