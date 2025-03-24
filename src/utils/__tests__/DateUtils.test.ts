import { formatDate } from "../DateUtils";

describe("formatDate test", () => {
  it("should format the date correctly with default format", () => {
    const date = new Date("2025-01-01");
    const result = formatDate(date);
    expect(result).toBe("2025-01-01");
  });

  it("should format the date correctly with custom format", () => {
    const date = new Date("2025-03-01");
    const result = formatDate(date, "DD/MM/YYYY");
    expect(result).toBe("01/03/2025");
  });

  it("should handle invalid date gracefully", () => {
    const date = new Date("invalid");
    const result = formatDate(date);
    expect(result).toBe("Invalid date");
  });
});
