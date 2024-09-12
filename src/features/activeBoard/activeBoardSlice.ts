import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface ActiveBoardState {
    id: string
}

const initialState: ActiveBoardState = {
    id: "6b57d7aa641abf9e3befc4f3bed4aa1e"
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