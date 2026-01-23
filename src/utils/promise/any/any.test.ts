import { promiseAny } from "./any";

describe("promiseAny", () => {
    // 1. Базовые тесты
    describe("Базовые случаи", () => {
        test("должна возвращать Promise", () => {
            const result = promiseAny([]);
            expect(result).toBeInstanceOf(Promise);
        });
    });

    // 2. Успешные сценарии
    describe("Успешное разрешение", () => {
        test("должна разрешаться с первым успешным промисом", async () => {
            const promises = [
                new Promise<string>((_, reject) =>
                    setTimeout(() => reject(new Error("error1")), 100),
                ),
                new Promise<string>((resolve) =>
                    setTimeout(() => resolve("success"), 50),
                ),
                new Promise<string>((_, reject) =>
                    setTimeout(() => reject(new Error("error2")), 10),
                ),
            ];

            const result = await promiseAny(promises);
            expect(result).toBe("success");
        });

        test("должна работать с немедленно разрешающимися промисами", async () => {
            const result = await promiseAny([
                Promise.reject(new Error("error")),
                Promise.resolve("success"),
                Promise.reject(new Error("another error")),
            ]);
            expect(result).toBe("success");
        });

        test("должна выбирать первый успешный промис", async () => {
            const promises = [
                new Promise<string>((_, reject) =>
                    setTimeout(() => reject(new Error("fast error")), 5),
                ),
                new Promise<string>((resolve) =>
                    setTimeout(() => resolve("medium success"), 10),
                ),
                new Promise<string>((resolve) =>
                    setTimeout(() => resolve("slow success"), 100),
                ),
            ];

            const result = await promiseAny(promises);
            expect(result).toBe("medium success");
        });
    });

    // 4. Поведение при разрешении
    describe("Поведение при разрешении", () => {
        test("не должна останавливаться при первой ошибке", async () => {
            const executionOrder: string[] = [];

            const promises = [
                new Promise<string>((_, reject) => {
                    setTimeout(() => {
                        executionOrder.push("error1");
                        reject(new Error("error1"));
                    }, 5);
                }),
                new Promise<string>((resolve) => {
                    setTimeout(() => {
                        executionOrder.push("success");
                        resolve("success");
                    }, 10);
                }),
                new Promise<string>((_, reject) => {
                    setTimeout(() => {
                        executionOrder.push("error2");
                        reject(new Error("error2"));
                    }, 15);
                }),
            ];

            const result = await promiseAny(promises);
            expect(result).toBe("success");
        });

        test("должна игнорировать ошибки после успешного разрешения", async () => {
            let lateRejectionHandled = false;

            const promises = [
                Promise.resolve("immediate success"),
                new Promise((_, reject) => {
                    setTimeout(() => {
                        lateRejectionHandled = true;
                        reject(new Error("late error"));
                    }, 10);
                }),
            ];

            const result = await promiseAny(promises);
            expect(result).toBe("immediate success");

            // Ждем чтобы убедиться что поздняя ошибка обработалась
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(lateRejectionHandled).toBe(true);
        });

        test("не должна вызывать resolve после reject", async () => {
            let resolveCalled = false;
            let rejectCalled = false;

            const promise = promiseAny([
                Promise.reject(new Error("error")),
                Promise.resolve("success"),
            ]);

            promise.then(
                () => {
                    resolveCalled = true;
                },
                () => {
                    rejectCalled = true;
                },
            );

            await promise;
            expect(resolveCalled).toBe(true);
            expect(rejectCalled).toBe(false);
        });
    });

    // 7. Асинхронные функции
    describe("С асинхронными функциями", () => {
        test("должна работать с async функциями возвращающими успех", async () => {
            const asyncSuccess = async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
                return "async success";
            };

            const asyncError = async () => {
                throw new Error("async error");
            };

            const result = await promiseAny([asyncError(), asyncSuccess()]);
            expect(result).toBe("async success");
        });
    });
});
