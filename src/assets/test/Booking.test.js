
import { describe, it, expect } from "vitest";

function calculateTotal(price, seats) {
  return price * seats.length;
}

describe("Ticket Price Calculation", () => {
  it("calculates the total price for selected seats", () => {
    expect(calculateTotal(150, ["S1", "S2"])).toBe(300);
  });

  it("returns zero when no seats are selected", () => {
    expect(calculateTotal(150, [])).toBe(0);
  });
});
