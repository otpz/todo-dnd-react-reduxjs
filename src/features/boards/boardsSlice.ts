import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { BoardType } from "../../types/BoardType"
import { createUniqueId } from "../../helpers/createUniqueId"

const initialState: BoardType[] = []

export const boards = createSlice({
    name: "boards",
    initialState,
    reducers: {
        addBoard: (state, action: PayloadAction<string>): void => {
            const newId = createUniqueId()
            const newBoard: BoardType = {id: newId, title: action.payload, isFavorite: false, createdDate: Date.now()}
            state.push(newBoard)
        },
        deleteBoardById: (state, action: PayloadAction<string>) => {
            console.log(state.filter(board =>board.id !== action.payload))
            return state.filter(board => board.id !== action.payload) // action.payload is id
        },
        updateTitleById: (state, actions: PayloadAction<string[]>): void => {
            const board = state.find(board => board.id === actions.payload[0]) // payload[0] is id
            if (board) {
                board.title = actions.payload[1] // payload[1] is title
            }
        },
        updateFavoiteById: (state, action: PayloadAction<string>): void => { // toggle favorite
            const board = state.find(board => board.id === action.payload) // action is id
            if (board) {
                board.isFavorite = !board.isFavorite
            }
        },
        updateAllBoards: (state, action: PayloadAction<BoardType[]>) => {
            return action.payload
        }
    }  
})

export const {addBoard, deleteBoardById, updateTitleById, updateFavoiteById, updateAllBoards} = boards.actions
export default boards.reducer