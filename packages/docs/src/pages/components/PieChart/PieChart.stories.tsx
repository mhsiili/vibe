import React, { useState } from "react";
import { PieChart, type PieChartProps, Flex } from "@vibe/core";
import { type Meta, type StoryObj } from "@storybook/react";

export default {
  title: "Components/PieChart",
  component: PieChart
} satisfies Meta<typeof PieChart>;

type Story = StoryObj<typeof PieChart>;

const sampleData = [
  { value: 30, label: "Category A" },
  { value: 20, label: "Category B" },
  { value: 50, label: "Category C" }
];

export const Overview: Story = {
  render: (args: PieChartProps) => (
    <PieChart data={sampleData} size="medium" id="overview-pie-chart" ariaLabel="Overview pie chart" {...args} />
  )
};

export const WithLegend: Story = {
  render: () => (
    <Flex direction="column" gap="large" align="start">
      <div>
        <h4 style={{ marginBottom: "var(--spacing-small)" }}>Legend on the right</h4>
        <PieChart
          data={sampleData}
          showLegend
          legendPosition="right"
          id="legend-right-pie-chart"
          ariaLabel="Pie chart with legend on right"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: "var(--spacing-small)" }}>Legend on the bottom</h4>
        <PieChart
          data={sampleData}
          showLegend
          legendPosition="bottom"
          id="legend-bottom-pie-chart"
          ariaLabel="Pie chart with legend on bottom"
        />
      </div>
    </Flex>
  )
};

export const DonutMode: Story = {
  render: () => (
    <Flex gap="large" align="center">
      <div>
        <h4 style={{ marginBottom: "var(--spacing-small)" }}>Regular Pie</h4>
        <PieChart data={sampleData} size="medium" id="regular-pie-chart" ariaLabel="Regular pie chart" />
      </div>
      <div>
        <h4 style={{ marginBottom: "var(--spacing-small)" }}>Donut Mode</h4>
        <PieChart data={sampleData} size="medium" donutMode id="donut-pie-chart" ariaLabel="Donut chart" />
      </div>
    </Flex>
  )
};

export const Animated: Story = {
  render: () => {
    const [key, setKey] = useState(0);

    return (
      <div>
        <PieChart
          key={key}
          data={sampleData}
          size="medium"
          animated
          id="animated-pie-chart"
          ariaLabel="Animated pie chart"
        />
        <button
          onClick={() => setKey(prev => prev + 1)}
          style={{ marginTop: "var(--spacing-medium)", padding: "8px 16px" }}
        >
          Replay Animation
        </button>
      </div>
    );
  }
};

export const Interactive: Story = {
  render: () => {
    const [selectedSlice, setSelectedSlice] = useState<string | null>(null);

    return (
      <div>
        <PieChart
          data={sampleData}
          size="medium"
          onSliceClick={(slice, index) => {
            setSelectedSlice(`${slice.label} (${slice.value})`);
          }}
          id="interactive-pie-chart"
          ariaLabel="Interactive pie chart"
        />
        {selectedSlice && (
          <div style={{ marginTop: "var(--spacing-medium)", fontSize: "14px" }}>
            Selected: <strong>{selectedSlice}</strong>
          </div>
        )}
      </div>
    );
  }
};

export const CustomColors: Story = {
  render: () => {
    const customData = [
      { value: 30, label: "Product A", color: "#FF6B6B" },
      { value: 20, label: "Product B", color: "#4ECDC4" },
      { value: 25, label: "Product C", color: "#45B7D1" },
      { value: 25, label: "Product D", color: "#FFA07A" }
    ];

    return (
      <PieChart
        data={customData}
        size="medium"
        showLegend
        id="custom-colors-pie-chart"
        ariaLabel="Pie chart with custom colors"
      />
    );
  }
};

export const SmallData: Story = {
  render: () => {
    const smallData = [
      { value: 60, label: "Success" },
      { value: 40, label: "Pending" }
    ];

    return (
      <PieChart
        data={smallData}
        size="medium"
        showLegend
        legendPosition="bottom"
        id="small-data-pie-chart"
        ariaLabel="Pie chart with two categories"
      />
    );
  }
};

export const LargeData: Story = {
  render: () => {
    const largeData = [
      { value: 15, label: "Q1 Sales" },
      { value: 12, label: "Q2 Sales" },
      { value: 18, label: "Q3 Sales" },
      { value: 20, label: "Q4 Sales" },
      { value: 8, label: "Marketing" },
      { value: 7, label: "Operations" },
      { value: 10, label: "Research" },
      { value: 5, label: "Support" },
      { value: 3, label: "Admin" },
      { value: 2, label: "Other" }
    ];

    return (
      <PieChart
        data={largeData}
        size="large"
        showLegend
        legendPosition="right"
        donutMode
        id="large-data-pie-chart"
        ariaLabel="Pie chart with many categories"
      />
    );
  }
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="large" align="center">
      <div>
        <h4 style={{ marginBottom: "var(--spacing-small)" }}>Small</h4>
        <PieChart data={sampleData} size="small" id="small-size-pie-chart" ariaLabel="Small pie chart" />
      </div>
      <div>
        <h4 style={{ marginBottom: "var(--spacing-small)" }}>Medium</h4>
        <PieChart data={sampleData} size="medium" id="medium-size-pie-chart" ariaLabel="Medium pie chart" />
      </div>
      <div>
        <h4 style={{ marginBottom: "var(--spacing-small)" }}>Large</h4>
        <PieChart data={sampleData} size="large" id="large-size-pie-chart" ariaLabel="Large pie chart" />
      </div>
    </Flex>
  )
};
