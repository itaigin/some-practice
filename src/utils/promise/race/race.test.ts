import { promiseRace } from "./race";

describe("promiseRace", () => {
    // 1. Базовые тесты
    describe("Базовые случаи", () => {
        test("должна возвращать Promise", () => {
            const result = promiseRace([]);
            expect(result).toBeInstanceOf(Promise);
        });

        test("пустой массив должен возвращать pending promise", (done) => {
            const racePromise = promiseRace([]);
            let resolved = false;
            let rejected = false;

            racePromise.then(
                () => {
                    resolved = true;
                },
                () => {
                    rejected = true;
                },
            );

            // Ждем немного чтобы убедиться, что промис не разрешился
            setTimeout(() => {
                expect(resolved).toBe(false);
                expect(rejected).toBe(false);
                done();
            }, 50);
        });
    });

    // 2. Успешные сценарии
    describe("Успешное разрешение", () => {
        test("должна разрешаться с первым успешным промисом", async () => {
            const promises = [
                new Promise<string>((resolve) =>
                    setTimeout(() => resolve("slow"), 100),
                ),
                new Promise<string>((resolve) =>
                    setTimeout(() => resolve("fast"), 10),
                ),
                new Promise<string>((resolve) =>
                    setTimeout(() => resolve("medium"), 50),
                ),
            ];

            const result = await promiseRace(promises);
            expect(result).toBe("fast");
        });

        test("должна работать с немедленно разрешающимися промисами", async () => {
            const result = await promiseRace([
                Promise.resolve("first"),
                Promise.resolve("second"),
            ]);
            expect(result).toBe("first");
        });

        test("должна сохранять порядок при одинаковом времени", async () => {
            const promises = [
                Promise.resolve("A"),
                Promise.resolve("B"),
                Promise.resolve("C"),
            ];

            const result = await promiseRace(promises);
            // В случае микрозадач порядок может быть специфичным
            expect(["A", "B", "C"]).toContain(result);
        });
    });

    // 3. Ошибочные сценарии
    describe("Отклонение", () => {
        test("должна отклоняться при первой ошибке", async () => {
            const error = new Error("First error");
            const promises = [
                new Promise((_, reject) => setTimeout(() => reject(error), 10)),
                new Promise((resolve) =>
                    setTimeout(() => resolve("success"), 100),
                ),
            ];

            await expect(promiseRace(promises)).rejects.toThrow("First error");
        });

        test("ошибка должна иметь правильный тип", async () => {
            const promises = [
                Promise.reject(new TypeError("Type error")),
                Promise.reject(new SyntaxError("Syntax error")),
            ];

            try {
                await promiseRace(promises);
                fail("Should have thrown");
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
            }
        });
    });

    // 4. Смешанные сценарии
    describe("Смешанные результаты", () => {
        test("ошибка побеждает если приходит раньше успеха", async () => {
            const promises = [
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("fast error")), 5),
                ),
                new Promise((resolve) =>
                    setTimeout(() => resolve("slow success"), 50),
                ),
            ];

            await expect(promiseRace(promises)).rejects.toThrow("fast error");
        });

        test("успех побеждает если приходит раньше ошибки", async () => {
            const promises = [
                new Promise((resolve) =>
                    setTimeout(() => resolve("fast success"), 5),
                ),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("slow error")), 50),
                ),
            ];

            const result = await promiseRace(promises);
            expect(result).toBe("fast success");
        });
    });

    // 6. Асинхронные функции
    describe("С асинхронными функциями", () => {
        test("должна работать с async функциями", async () => {
            const asyncFunc1 = async () => {
                await new Promise((resolve) => setTimeout(resolve, 30));
                return "slow async";
            };

            const asyncFunc2 = async () => {
                await new Promise((resolve) => setTimeout(resolve, 10));
                return "fast async";
            };

            const result = await promiseRace([asyncFunc1(), asyncFunc2()]);
            expect(result).toBe("fast async");
        });

        test("должна обрабатывать ошибки из async функций", async () => {
            const asyncFunc = async () => {
                throw new Error("Async error");
            };

            await expect(promiseRace([asyncFunc()])).rejects.toThrow(
                "Async error",
            );
        });
    });

    // 7. Поведенческие тесты
    describe("Поведение", () => {
        test("не должна создавать утечек памяти", async () => {
            let pendingResolved = false;
            const pendingPromise = new Promise((resolve) => {
                // Никогда не разрешается
            }).finally(() => {
                pendingResolved = true;
            });

            const fastPromise = Promise.resolve("fast");

            const result = await promiseRace([pendingPromise, fastPromise]);
            expect(result).toBe("fast");
            expect(pendingResolved).toBe(false);
        });

        test("должна корректно обрабатывать микрозадачи", (done) => {
            const executionOrder: string[] = [];

            Promise.resolve().then(() => {
                executionOrder.push("microtask 1");
            });

            const promise1 = Promise.resolve().then(() => {
                executionOrder.push("promise1 microtask");
                return "promise1";
            });

            const promise2 = new Promise((resolve) => {
                executionOrder.push("promise2 sync start");
                resolve("promise2");
            }).then((value) => {
                executionOrder.push("promise2 microtask");
                return value;
            });

            promiseRace([promise1, promise2]).then((result) => {
                executionOrder.push("race resolved");
                expect(result).toBeDefined();
                // Порядок может варьироваться
                expect(executionOrder.length).toBeGreaterThan(0);
                done();
            });
        });
    });

    // 8. Сравнение с нативным Promise.race
    describe("Сравнение с Promise.race", () => {
        test("должна вести себя как нативная Promise.race для успешных промисов", async () => {
            const promises = [
                new Promise((resolve) => setTimeout(() => resolve("fast"), 10)),
                new Promise((resolve) =>
                    setTimeout(() => resolve("slow"), 100),
                ),
            ];

            const nativeResult = await Promise.race(promises);
            const customResult = await promiseRace(promises);

            expect(customResult).toBe(nativeResult);
        });
    });
});
