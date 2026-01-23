export function promiseAll<T = any>(promises: Promise<T>[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) return resolve([]);
        const result = new Array(promises.length);
        let countResolved = 0;
        promises.forEach((promise, index) => {
            promise
                .then((value) => {
                    result[index] = value;
                    countResolved++;
                    if (countResolved === promises.length) {
                        resolve(result);
                    }
                })
                .catch(reject);
        });
    });
}
