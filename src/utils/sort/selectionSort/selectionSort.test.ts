import { selectionSort } from "./selectionSort";
import { describe } from "@jest/globals";

describe("Тесты сортировки выбором", () => {
    const array = [64, 25, 12, 22, 11];
    test("test n^2", () => {
        expect(selectionSort(array)).toEqual([11, 12, 22, 25, 64]);
    });
});
