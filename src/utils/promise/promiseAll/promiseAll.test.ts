import { promiseAll } from "./promiseAll";

describe("promiseAll", () => {
    // 1. Базовые случаи
    test("должен возвращать Promise", () => {
        const result = promiseAll([]);
        expect(result).toBeInstanceOf(Promise);
    });

    test("должен разрешаться с пустым массивом для пустого входного массива", async () => {
        const result = await promiseAll([]);
        expect(result).toEqual([]);
    });

    // 2. Успешные сценарии
    test("должен разрешаться с массивом результатов в правильном порядке", async () => {
        const promises = [
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3),
        ];

        const result = await promiseAll(promises);
        expect(result).toEqual([1, 2, 3]);
    });

    test("должен сохранять порядок результатов независимо от времени разрешения", async () => {
        const promises = [
            new Promise((resolve) =>
                setTimeout(() => resolve("медленный"), 100),
            ),
            new Promise((resolve) => setTimeout(() => resolve("средний"), 50)),
            Promise.resolve("быстрый"),
        ];

        const result = await promiseAll(promises);
        expect(result).toEqual(["медленный", "средний", "быстрый"]);
    });

    // 3. Ошибочные сценарии
    test("должен отклоняться, если хотя бы один Promise отклоняется", async () => {
        const promises = [
            Promise.resolve("успех"),
            Promise.reject(new Error("ошибка")),
            Promise.resolve("еще успех"),
        ];

        await expect(promiseAll(promises)).rejects.toThrow("ошибка");
    });

    // 4. Асинхронные сценарии
    test("должен работать с асинхронными функциями", async () => {
        const asyncFunc1 = async () => "результат 1";
        const asyncFunc2 = async () => {
            await new Promise((resolve) => setTimeout(resolve, 10));
            return "результат 2";
        };

        const promises = [asyncFunc1(), asyncFunc2()];
        const result = await promiseAll(promises);
        expect(result).toEqual(["результат 1", "результат 2"]);
    });

    test("должен обрабатывать вложенные промисы", async () => {
        const promises = [
            Promise.resolve(Promise.resolve(1)),
            Promise.resolve(2),
        ];

        const result = await promiseAll(promises);
        expect(result).toEqual([1, 2]);
    });
});
