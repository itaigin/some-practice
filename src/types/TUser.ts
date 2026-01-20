import { TId } from "./TId";

export type TUser = TId & {
    username: string;
    email: string;
    avatar: string;
    password: string;
    birthdate: Date;
    registeredAt: Date;
};
