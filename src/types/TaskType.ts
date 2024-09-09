export type TaskType = {
    id: string,
    listId: string,
    title: string,
    isActive: boolean,
    isDeleted?: boolean,
    createdDate?: number
}