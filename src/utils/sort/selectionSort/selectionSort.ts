// 1 [64, 25, 12, 22, 11];
// 2 [11, 25, 12, 22, 64];
// 3 [11, 12, 25, 22, 64];
// 4 [11, 12, 22, 25, 64];

export function selectionSort(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}
