import { Task } from "../types/Task";

export const getCountStats = (list: Task[]):{count: Number, doneCount: Number} => ({count: list.length, doneCount: (list.filter(({done}) => done)).length })