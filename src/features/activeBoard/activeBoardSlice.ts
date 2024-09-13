import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface ActiveBoardState {
    id: string
}

const initialState: ActiveBoardState = {
    id: ""
}

export const activeBoardSlice = createSlice({
    name: "activeBoard",
    initialState,
    reducers: {
        updateActiveBoardId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        }
    }
})

export const {updateActiveBoardId} = activeBoardSlice.actions
export default activeBoardSlice.reducer