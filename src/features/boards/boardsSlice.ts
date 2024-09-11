import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BoardType } from "../../types/BoardType";

const initialState: BoardType[] = [
    {id: "6b57d7aa641abf9e3befc4f3bed4aa1e", title: "Main Board"},
    {id: "6b57d7aa641a123e3befc4f3bed4aa1e", title: "Second Board"},
    {id: "6b57d7aa641a123e3be123451ed4aa1e", title: "Third Board"}
]

export const boards = createSlice({
    name: "boards",
    initialState,
    reducers: {
        addBoard: (state, action: PayloadAction<BoardType>) => {
            state.push(action.payload)
        },
        deleteBoardById: (state, action: PayloadAction<string>) => {
            state.filter(board => board.id === action.payload) // action.payload is id
        },
        updateTitleById: (state, actions: PayloadAction<string[]>) => {
            state.map(board => {
                if (board.id === actions.payload[0]){ // payload[0] is id
                    board.title = actions.payload[1] // payload[1] is title
                }
            })
        }
    }  
})

export const {addBoard, deleteBoardById, updateTitleById} = boards.actions
export default boards.reducer