import { calculatePercentages, calculateAngles, polarToCartesian, createArcPath } from "../calculations";

describe("calculatePercentages", () => {
  it("should calculate correct percentages for basic data", () => {
    const data = [
      { value: 30, label: "A" },
      { value: 20, label: "B" },
      { value: 50, label: "C" }
    ];

    const result = calculatePercentages(data);

    expect(result).toEqual([30, 20, 50]);
  });

  it("should handle different value distributions", () => {
    const data = [
      { value: 10, label: "A" },
      { value: 30, label: "B" },
      { value: 60, label: "C" }
    ];

    const result = calculatePercentages(data);

    expect(result).toEqual([10, 30, 60]);
  });

  it("should return zeros for empty values", () => {
    const data = [
      { value: 0, label: "A" },
      { value: 0, label: "B" }
    ];

    const result = calculatePercentages(data);

    expect(result).toEqual([0, 0]);
  });
});

describe("calculateAngles", () => {
  it("should calculate angles starting from -90 degrees", () => {
    const percentages = [50, 50];

    const result = calculateAngles(percentages);

    expect(result).toEqual([
      { start: -90, end: 90 },
      { start: 90, end: 270 }
    ]);
  });

  it("should handle unequal percentages", () => {
    const percentages = [25, 75];

    const result = calculateAngles(percentages);

    expect(result).toEqual([
      { start: -90, end: 0 },
      { start: 0, end: 270 }
    ]);
  });

  it("should handle three slices", () => {
    const percentages = [33.33, 33.33, 33.34];

    const result = calculateAngles(percentages);

    expect(result[0].start).toBeCloseTo(-90, 1);
    expect(result[0].end).toBeCloseTo(29.988, 1);
    expect(result[1].start).toBeCloseTo(29.988, 1);
    expect(result[2].end).toBeCloseTo(270, 1);
  });
});

describe("polarToCartesian", () => {
  it("should convert polar to cartesian coordinates at 0 degrees", () => {
    const result = polarToCartesian(100, 100, 50, 0);

    expect(result.x).toBeCloseTo(150);
    expect(result.y).toBeCloseTo(100);
  });

  it("should convert polar to cartesian coordinates at 90 degrees", () => {
    const result = polarToCartesian(100, 100, 50, 90);

    expect(result.x).toBeCloseTo(100, 1);
    expect(result.y).toBeCloseTo(150);
  });

  it("should convert polar to cartesian coordinates at 180 degrees", () => {
    const result = polarToCartesian(100, 100, 50, 180);

    expect(result.x).toBeCloseTo(50);
    expect(result.y).toBeCloseTo(100, 1);
  });
});

describe("createArcPath", () => {
  it("should create a valid SVG path for a pie slice", () => {
    const path = createArcPath(100, 100, 50, 0, 90);

    expect(path).toContain("M 100 100");
    expect(path).toContain("A 50 50");
    expect(path).toContain("Z");
  });

  it("should create a donut path with inner radius", () => {
    const path = createArcPath(100, 100, 50, 0, 90, 25);

    expect(path).toContain("A 50 50");
    expect(path).toContain("A 25 25");
    expect(path).toContain("Z");
  });

  it("should use large arc flag for angles greater than 180", () => {
    const path = createArcPath(100, 100, 50, 0, 200);

    expect(path).toContain("A 50 50 0 1");
  });

  it("should use small arc flag for angles less than 180", () => {
    const path = createArcPath(100, 100, 50, 0, 90);

    expect(path).toContain("A 50 50 0 0");
  });
});
