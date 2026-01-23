import { quickSortHoara, quickSort } from "./quickSort";
import { describe } from "@jest/globals";

describe("Тесты быстрой сортировки", () => {
    const array = [9, -3, 5, 2, 6, 8, -6, 1, 3];
    test("quickSortHoara", () => {
        expect(quickSortHoara(array)).toEqual([-6, -3, 1, 2, 3, 5, 6, 8, 9]);
    });

    test("quickSort", () => {
        expect(quickSort(array)).toEqual([-6, -3, 1, 2, 3, 5, 6, 8, 9]);
    });
});
