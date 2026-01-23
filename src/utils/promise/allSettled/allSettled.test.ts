import { allSettled } from "./allSettled";

describe("allSettled", () => {
    // 1. Базовые случаи
    test("должен возвращать Promise", () => {
        const result = allSettled([]);
        expect(result).toBeInstanceOf(Promise);
    });

    test("должен разрешаться с пустым массивом для пустого входного массива", async () => {
        const result = await allSettled([]);
        expect(result).toEqual([]);
    });

    // 2. Успешные промисы
    test("должен разрешать все успешные промисы", async () => {
        const promises = [
            Promise.resolve(1),
            Promise.resolve("text"),
            Promise.resolve({ key: "value" }),
        ];

        const result = await allSettled(promises);
        expect(result).toEqual([
            { status: "fulfilled", data: 1 },
            { status: "fulfilled", data: "text" },
            { status: "fulfilled", data: { key: "value" } },
        ]);
    });

    // 3. Отклоненные промисы
    test("должен обрабатывать отклоненные промисы", async () => {
        const error = new Error("Произошла ошибка");
        const promises = [
            Promise.resolve("success"),
            Promise.reject(error),
            Promise.resolve("another success"),
        ];

        const result = await allSettled(promises);
        expect(result).toEqual([
            { status: "fulfilled", data: "success" },
            { status: "rejected", error },
            { status: "fulfilled", data: "another success" },
        ]);
    });

    test("должен обрабатывать все отклоненные промисы", async () => {
        const error1 = new Error("Error 1");
        const error2 = new TypeError("Type Error");
        const promises = [Promise.reject(error1), Promise.reject(error2)];

        const result = await allSettled(promises);
        expect(result).toEqual([
            { status: "rejected", error: error1 },
            { status: "rejected", error: error2 },
        ]);
    });

    // 4. Смешанные результаты
    test("должен сохранять порядок результатов независимо от времени выполнения", async () => {
        const promises = [
            new Promise((resolve) => setTimeout(() => resolve("slow"), 100)),
            Promise.reject(new Error("fast error")),
            new Promise((resolve) => setTimeout(() => resolve("medium"), 50)),
        ];

        const result = await allSettled(promises);
        expect(result[0]).toEqual({ status: "fulfilled", data: "slow" });
        expect(result[1]).toMatchObject({
            status: "rejected",
            error: expect.any(Error),
        });
        expect(result[2]).toEqual({ status: "fulfilled", data: "medium" });
    });

    // 5. Асинхронные функции
    test("должен работать с асинхронными функциями", async () => {
        const asyncFunc1 = async () => "результат 1";
        const asyncFunc2 = async () => {
            throw new Error("async error");
        };

        const result = await allSettled([asyncFunc1(), asyncFunc2()]);
        expect(result).toEqual([
            { status: "fulfilled", data: "результат 1" },
            { status: "rejected", error: expect.any(Error) },
        ]);
    });

    // 10. Тест на производительность (не блокирует выполнение)
    test("должен дожидаться всех промисов даже если один очень медленный", async () => {
        const startTime = Date.now();
        const promises = [
            new Promise((resolve) => setTimeout(() => resolve("fast"), 10)),
            new Promise((resolve) => setTimeout(() => resolve("slow"), 100)),
        ];

        const result = await allSettled(promises);
        const elapsedTime = Date.now() - startTime;

        expect(elapsedTime).toBeGreaterThanOrEqual(100);
        expect(result).toEqual([
            { status: "fulfilled", data: "fast" },
            { status: "fulfilled", data: "slow" },
        ]);
    });
});
