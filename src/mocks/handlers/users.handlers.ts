import {http, HttpResponse} from 'msw';

import { users } from "../models";
import {USER_DETAIL_ROUTE_MASK, USERS_LIST_ROUTE_MASK} from "../../api/constants.ts";
import {TUser} from "../../types";

export const getUsersHandlers = [
    http.get(USERS_LIST_ROUTE_MASK, () => {
        return HttpResponse.json({ users }.users)
    }),
    http.get(USER_DETAIL_ROUTE_MASK, ({ params }) => {
        const { id } = params;
        const user = users.find(u => u.id === id);

        if (!user) {
            return HttpResponse.json(
                { error: 'Пользователь не найден' },
                { status: 404 }
            );
        }

        return HttpResponse.json(user);
    }),
    http.post(USERS_LIST_ROUTE_MASK, async ({ request }) => {
        const newUser = await request.json();

        // Валидация
        if (!newUser?.username || !newUser.email) {
            return HttpResponse.json(
                { error: 'Имя пользователя и email обязательны' },
                { status: 400 }
            );
        }

        // Проверка уникальности email
        if (users.some(u => u.email === newUser.email)) {
            return HttpResponse.json(
                { error: 'Пользователь с таким email уже существует' },
                { status: 409 }
            );
        }

        const createdUser = {
            id: crypto.randomUUID(), // Генерация ID
            ...newUser,
            registeredAt: new Date().toISOString(),
            // Можно добавить дефолтные значения
            avatar: newUser.avatar || 'https://via.placeholder.com/150',
            birthdate: newUser.birthdate || new Date().toISOString()
        };

        users.push(createdUser);

        return HttpResponse.json(createdUser, { status: 201 });
    }),
    http.delete(USER_DETAIL_ROUTE_MASK, ({ params }) => {
        const { id } = params;
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return HttpResponse.json(
                { error: 'Пользователь не найден' },
                { status: 404 }
            );
        }

        const deletedUser = users.splice(userIndex, 1)[0];

        return HttpResponse.json({
            message: 'Пользователь успешно удален',
            user: deletedUser
        });
    }),
]