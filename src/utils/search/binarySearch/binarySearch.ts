export function binarySearch(arr: number[], current: number) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === current) {
            return mid;
        }
        if (arr[mid] > current) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}
