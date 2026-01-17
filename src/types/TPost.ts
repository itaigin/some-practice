import { TId } from "./TId.ts";

export type TPost = TId & {
    userId: number;
    title: string;
    body: string;
}