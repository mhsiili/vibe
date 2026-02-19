import React from "react";
import { render, screen } from "@testing-library/react";
import BarChart from "../BarChart";
import { ComponentDefaultTestId, ComponentVibeId } from "../../../tests/constants";

const mockData = [
  { name: "q1", a: 10, b: 20, c: 15 },
  { name: "q2", a: 25, b: 15, c: 20 },
  { name: "q3", a: 20, b: 25, c: 10 },
  { name: "q4", a: 15, b: 10, c: 30 }
];

const mockSeries = [
  { key: "a", label: "Series A" },
  { key: "b", label: "Series B" },
  { key: "c", label: "Series C" }
];

describe("BarChart", () => {
  it("should render with minimal data and series", () => {
    render(<BarChart data={mockData} series={mockSeries} id="test-bar-chart" />);

    const chart = screen.getByTestId("bar-chart_test-bar-chart");
    expect(chart).toBeInTheDocument();
    expect(chart).toHaveAttribute("data-vibe", ComponentVibeId.BAR_CHART);
  });

  it("should apply correct data-testid from getTestId when id is provided", () => {
    render(<BarChart data={mockData} series={mockSeries} id="my-chart" />);

    expect(screen.getByTestId("bar-chart_my-chart")).toBeInTheDocument();
  });

  it("should apply custom data-testid when provided", () => {
    render(
      <BarChart data={mockData} series={mockSeries} data-testid="custom-testid" id="test-bar-chart" />
    );

    expect(screen.getByTestId("custom-testid")).toBeInTheDocument();
  });

  it("should render header when title is provided", () => {
    render(
      <BarChart data={mockData} series={mockSeries} title="CHART TITLE" id="test-bar-chart" />
    );

    expect(screen.getByText("CHART TITLE")).toBeInTheDocument();
  });

  it("should render aggregate value when provided", () => {
    render(
      <BarChart
        data={mockData}
        series={mockSeries}
        title="CHART TITLE"
        aggregateValue="5.000,00"
        id="test-bar-chart"
      />
    );

    expect(screen.getByText("5.000,00")).toBeInTheDocument();
  });

  it("should render period selector dropdown when periodSelector is provided", () => {
    const options = [
      { value: "week", label: "This Week" },
      { value: "month", label: "This Month" }
    ];
    render(
      <BarChart
        data={mockData}
        series={mockSeries}
        periodSelector={{
          value: "week",
          options,
          onChange: () => {}
        }}
        id="test-bar-chart"
      />
    );

    expect(screen.getByText("This Week")).toBeInTheDocument();
  });

  it("should have aria-label when ariaLabel is provided", () => {
    render(
      <BarChart
        data={mockData}
        series={mockSeries}
        ariaLabel="Stacked bar chart by quarter"
        id="test-bar-chart"
      />
    );

    const chart = screen.getByTestId("bar-chart_test-bar-chart");
    expect(chart).toHaveAttribute("role", "img");
    expect(chart).toHaveAttribute("aria-label", "Stacked bar chart by quarter");
  });

  it("should apply custom className", () => {
    render(
      <BarChart data={mockData} series={mockSeries} className="custom-class" id="test-bar-chart" />
    );

    const chart = screen.getByTestId("bar-chart_test-bar-chart");
    expect(chart).toHaveClass("custom-class");
  });

  it("should forward ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<BarChart data={mockData} series={mockSeries} ref={ref} id="test-bar-chart" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("should render chart container even with empty data (no crash)", () => {
    render(<BarChart data={[]} series={mockSeries} id="test-bar-chart" />);

    const chart = screen.getByTestId("bar-chart_test-bar-chart");
    expect(chart).toBeInTheDocument();
  });
});
