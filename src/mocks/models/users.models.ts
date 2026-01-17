import { faker } from '@faker-js/faker';
import { TUser } from "../../types";

export function createRandomUser(): TUser{
    return {
        id: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    }
}

export const users = faker.helpers.multiple(createRandomUser, {
    count: 5,
});