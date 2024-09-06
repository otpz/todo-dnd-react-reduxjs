import { Task } from "./Task"

export type List = {
    id: number,
    title: string,
    description?: string,
    isActive: boolean,
    isDeleted?: boolean,
    createdDate: string,
    items: Task[]
}