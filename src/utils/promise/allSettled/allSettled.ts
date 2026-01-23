export function allSettled(promises: Promise<any>[]): Promise<any[]> {
    return new Promise((resolve) => {
        if (promises.length === 0) return resolve([]);
        const result = new Array(promises.length);
        let resolved = 0;
        console.log(result);
        promises.forEach((promise, index) => {
            promise
                .then((data) => {
                    result[index] = { status: "fulfilled", data };
                })
                .catch((error) => {
                    result[index] = { status: "rejected", error };
                })
                .finally(() => {
                    resolved++;
                    if (resolved === promises.length) {
                        resolve(result);
                    }
                });
        });
    });
}
