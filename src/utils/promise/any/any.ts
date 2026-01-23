export function promiseAny(promises: Promise<any>[]) {
    if (promises.length === 0) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
        let rejectedCount = 0;
        const errors = new Array(promises.length);
        promises.forEach((promise, index) => {
            promise.then(resolve).catch((error) => {
                errors[index] = error;
                rejectedCount++;
                if (rejectedCount === promises.length) {
                    reject(errors);
                }
            });
        });
    });
}
