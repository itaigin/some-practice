// 1 [64, 34, 25, 12, 22, 11, 90];
// 2 [34, 25, 12, 22, 11, 64, 90];
// 3 [25, 12, 22, 11, 34, 64, 90];
// 4 [12, 22, 11, 25, 34, 64, 90];
// 5 [12, 11, 22, 25, 34, 64, 90];
// 6 [11, 12, 22, 25, 34, 64, 90];

export function bubbleSort(arr: Array<number>) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
