import { TaskType } from "./TaskType"

export type ListType = {
    id: string,
    title: string,
    isActive: boolean,
    isDeleted?: boolean,
    createdDate?: number,
    items?: TaskType[]
}