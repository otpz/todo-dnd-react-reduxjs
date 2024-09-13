import { configureStore } from "@reduxjs/toolkit";
import activeBoardReducer from "../features/activeBoard/activeBoardSlice"
import boardsReducer from "../features/boards/boardsSlice"
import searchInputReducer from "../features/searchInput/searchInputSlice"

export const store = configureStore({
    reducer: {
        activeBoard: activeBoardReducer,
        boards: boardsReducer,
        searchInput: searchInputReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch