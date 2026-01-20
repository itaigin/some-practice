import { sum } from "./sum.ts";

test("Сумма 3 + 5 = 8", () => {
    expect(sum(3, 5)).toBe(8);
});
