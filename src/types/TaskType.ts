export type TaskType = {
    id: number,
    listId: number,
    title: string,
    isActive: boolean,
    isDeleted?: boolean,
    createdDate?: string
}