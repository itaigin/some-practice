import { bubbleSort } from "./bubbleSort";
import { describe } from "@jest/globals";

describe("Тесты пузырьковой сортировки", () => {
    const array = [64, 34, 25, 12, 22, 11, 90];
    test("test n^2", () => {
        expect(bubbleSort(array)).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });
});
