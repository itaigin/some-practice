import { binarySearch } from "./binarySearch";
import { describe } from "@jest/globals";

describe("Тесты бинарного поиска", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    test("target is 1", () => {
        expect(binarySearch(array, 1)).toEqual(0);
    });
    test("target is 11", () => {
        expect(binarySearch(array, 11)).toEqual(-1);
    });
    test("target is 9", () => {
        expect(binarySearch(array, 9)).toEqual(8);
    });
});
