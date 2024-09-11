import { configureStore } from "@reduxjs/toolkit";

import activeBoardReducer from "../features/activeBoard/activeBoardSlice"
import boardsReducer from "../features/boards/boardsSlice"

export const store = configureStore({
    reducer: {
        activeBoard: activeBoardReducer,
        boards: boardsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch