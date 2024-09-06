import { TaskType } from "./TaskType"

export type ListType = {
    id: number,
    title: string,
    isActive: boolean,
    isDeleted?: boolean,
    description?: string,
    createdDate?: number,
    items: TaskType[]
}