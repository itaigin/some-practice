import { TId } from "./TId";

export type TPost = TId & {
    userId: number;
    title: string;
    body: string;
};
