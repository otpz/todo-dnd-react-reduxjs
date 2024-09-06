import { TaskType } from "./TaskType"

export type ListType = {
    id: number,
    title: string,
    isActive: boolean,
    isDeleted?: boolean,
    createdDate?: number,
    items?: TaskType[]
}