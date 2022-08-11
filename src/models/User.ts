import { GamePlayed } from "./GamePlayed";

export interface User {
    id: number;
    name: string;
    nickname: string;
    pic: string;
    tokens: number;
    roles: string;      // enum?
    gamesPlayed: Array<GamePlayed>;
};

