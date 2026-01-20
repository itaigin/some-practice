import { sum } from "./sum";
import { describe } from "@jest/globals";

describe("Тесты функции sum", () => {
    test("3 + 5 = 8", () => {
        expect(sum(3, 5)).toEqual(8);
        expect(sum(3, 5)).toBeGreaterThan(7);
        expect(sum(3, 5)).toBeLessThan(9);
    });
});
