import {TId} from "./TId.ts";

export type TUser = TId & {
    username: string;
    email: string;
    avatar: string;
    password: string;
    birthdate: Date;
    registeredAt: Date;
}