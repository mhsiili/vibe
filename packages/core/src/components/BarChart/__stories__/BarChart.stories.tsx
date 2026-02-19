import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import BarChart from "../BarChart";

const defaultData = [
  { name: "q1", a: 15, b: 25, c: 20 },
  { name: "q2", a: 30, b: 20, c: 25 },
  { name: "q3", a: 25, b: 30, c: 15 },
  { name: "q4", a: 20, b: 15, c: 35 }
];

const defaultSeries = [
  { key: "a", label: "Content" },
  { key: "b", label: "Content" },
  { key: "c", label: "Content" }
];

const periodOptions = [
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "quarter", label: "This Quarter" }
];

type Story = StoryObj<typeof BarChart>;

export default {
  title: "Components/BarChart",
  component: BarChart
} satisfies Meta<typeof BarChart>;

export const Default: Story = {
  render: args => <BarChart {...args} />,
  args: {
    data: defaultData,
    series: defaultSeries,
    title: "CHART TITLE",
    aggregateValue: "5.000,00",
    periodSelector: {
      value: "week",
      options: periodOptions,
      onChange: () => {}
    },
    showLegend: true
  }
};

export const NoAggregateNumber: Story = {
  render: args => <BarChart {...args} />,
  args: {
    data: defaultData,
    series: defaultSeries,
    title: "CHART TITLE",
    periodSelector: {
      value: "week",
      options: periodOptions,
      onChange: () => {}
    },
    showLegend: true
  }
};

export const NoPeriodSelector: Story = {
  render: args => <BarChart {...args} />,
  args: {
    data: defaultData,
    series: defaultSeries,
    title: "CHART TITLE",
    showLegend: true
  }
};

export const TwoSeries: Story = {
  render: args => <BarChart {...args} />,
  args: {
    data: [
      { name: "q1", a: 20, b: 30 },
      { name: "q2", a: 35, b: 25 },
      { name: "q3", a: 30, b: 35 },
      { name: "q4", a: 25, b: 20 }
    ],
    series: [
      { key: "a", label: "Content" },
      { key: "b", label: "Content" }
    ],
    title: "CHART TITLE",
    showLegend: true
  }
};

export const ChartOnly: Story = {
  render: args => <BarChart {...args} />,
  args: {
    data: defaultData,
    series: defaultSeries,
    showLegend: true
  }
};
