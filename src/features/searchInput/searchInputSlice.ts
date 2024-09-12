import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchInput {
    value: string
}

const initialState: SearchInput = {
    value: ""
}

export const searchInput = createSlice({
    name: "searchInput",
    initialState,
    reducers: {
        setSearchInput: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }  
})

export const {setSearchInput} = searchInput.actions
export default searchInput.reducer

