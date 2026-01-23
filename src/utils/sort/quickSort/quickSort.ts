// Базовая версия (с использованием дополнительной памяти)
// 1 | [9, -3, 5, 2, 6, 8, -6, 1, 3]
// 2 | [-3, 5, 2 -6, 1, 3] 6 [9, 8]
// 3 | [] -6 [-3, 5, 2, 1, 3] 6 [] 8 [9]
// 4 | -6 [-3, 1] 2 [5, 3] 6 8 9
// 5 | -6 [-3] 1 [] 2 [] 3 [5] 6 8 9
// 6 | -6 -3 1 2 3 5 6 8 9

export function quickSortHoara(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (i === Math.floor(arr.length / 2)) continue;

        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSortHoara(left).concat(pivot, quickSortHoara(right));
}

// 1 | [9, -3, 5, 2, 6, 8, -6, 1, 3]
// pivot-6 i-0 j-8
// 1 | [3, -3, 5, 2, 6, 8, -6, 1, 9]
// pivot-6 i-4 j-7
// 2 | [3, -3, 5, 2, 1, 8, -6, 6, 9]
// pivot-6 i-5 j-6
// 3 | [3, -3, 5, 2, 1, -6, 8, 6, 9]
// pivot-6 i-5 j-6
// 3 | [3, -3, 5, 2, 1, -6, 8, 6, 9]
function partition(arr: number[], left: number, right: number) {
    const pivotIndex = Math.floor((left + right) / 2);
    const pivot = arr[pivotIndex];
    let i = left - 1;
    let j = right + 1;

    while (true) {
        do {
            i++;
        } while (arr[i] < pivot);
        do {
            j--;
        } while (arr[j] > pivot);

        console.log(arr);
        console.log("i", i);
        console.log("j", j);
        if (i >= j) return j;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// 1 | [9, -3, 5, 2, 6, 8, -6, 1, 3]
export function quickSort(
    arr: number[],
    left: number = 0,
    right: number = arr.length - 1,
): number[] {
    if (left >= right) return;
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex);
    quickSort(arr, pivotIndex + 1, right);
    return arr;
}
