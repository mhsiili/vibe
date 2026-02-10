import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import PieChart from "../PieChart";
import { ComponentVibeId } from "../../../tests/constants";

const mockData = [
  { value: 30, label: "Category A", color: "#ff0000" },
  { value: 20, label: "Category B", color: "#00ff00" },
  { value: 50, label: "Category C", color: "#0000ff" }
];

describe("PieChart", () => {
  it("should render with basic data", () => {
    render(<PieChart data={mockData} id="test-pie-chart" />);

    const chart = screen.getByTestId("pie-chart_test-pie-chart");
    expect(chart).toBeInTheDocument();
    expect(chart).toHaveAttribute("data-vibe", ComponentVibeId.PIE_CHART);
  });

  it("should render correct number of slices", () => {
    render(<PieChart data={mockData} id="test-pie-chart" />);

    const slices = screen.getAllByRole("img");
    // Filter out the main SVG which also has role="img"
    const actualSlices = slices.filter(slice => slice.tagName.toLowerCase() === "path");

    expect(actualSlices).toHaveLength(3);
  });

  it("should apply custom className", () => {
    render(<PieChart data={mockData} className="custom-class" id="test-pie-chart" />);

    const chart = screen.getByTestId("pie-chart_test-pie-chart");
    expect(chart).toHaveClass("custom-class");
  });

  it("should handle click events on slices", () => {
    const handleClick = vi.fn();
    render(<PieChart data={mockData} onSliceClick={handleClick} id="test-pie-chart" />);

    const slices = screen.getAllByRole("img").filter(slice => slice.tagName.toLowerCase() === "path");

    fireEvent.click(slices[0]);

    expect(handleClick).toHaveBeenCalledWith(mockData[0], 0);
  });

  it("should render legend when showLegend is true", () => {
    render(<PieChart data={mockData} showLegend id="test-pie-chart" />);

    const legend = screen.getByTestId("pie-chart-legend_test-pie-chart");
    expect(legend).toBeInTheDocument();
  });

  it("should not render legend when showLegend is false", () => {
    render(<PieChart data={mockData} showLegend={false} id="test-pie-chart" />);

    const legend = screen.queryByTestId("pie-chart-legend_test-pie-chart");
    expect(legend).not.toBeInTheDocument();
  });

  it("should apply correct size class", () => {
    const { rerender } = render(<PieChart data={mockData} size="small" id="test-pie-chart" />);

    let chart = screen.getByTestId("pie-chart_test-pie-chart");
    expect(chart).toHaveClass("small");

    rerender(<PieChart data={mockData} size="large" id="test-pie-chart" />);
    chart = screen.getByTestId("pie-chart_test-pie-chart");
    expect(chart).toHaveClass("large");
  });

  it("should render donut mode", () => {
    render(<PieChart data={mockData} donutMode id="test-pie-chart" />);

    const svg = screen.getByRole("img", { name: "Pie chart" });
    const circle = svg.querySelector("circle");

    expect(circle).toBeInTheDocument();
  });

  it("should handle empty data gracefully", () => {
    render(<PieChart data={[]} id="test-pie-chart" />);

    const emptyMessage = screen.getByText("No data to display");
    expect(emptyMessage).toBeInTheDocument();
  });

  it("should apply correct aria-label", () => {
    render(<PieChart data={mockData} ariaLabel="Sales data chart" id="test-pie-chart" />);

    const svg = screen.getByRole("img", { name: "Sales data chart" });
    expect(svg).toBeInTheDocument();
  });

  it("should render with custom data-testid", () => {
    render(<PieChart data={mockData} data-testid="custom-testid" id="test-pie-chart" />);

    const chart = screen.getByTestId("custom-testid");
    expect(chart).toBeInTheDocument();
  });

  it("should forward ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PieChart data={mockData} ref={ref} id="test-pie-chart" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("should have slice accessibility labels", () => {
    render(<PieChart data={mockData} id="test-pie-chart" />);

    const sliceA = screen.getByLabelText(/Category A.*30.*30\.0%/);
    expect(sliceA).toBeInTheDocument();
  });
});
