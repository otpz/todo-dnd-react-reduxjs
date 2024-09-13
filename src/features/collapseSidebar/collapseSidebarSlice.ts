import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CollapseSidebar {
    state: boolean
}

const initialState: CollapseSidebar = {
    state: false
}

export const collapseSidebar = createSlice({
    name: "collapseSidebar",
    initialState,
    reducers: {
        setToggleCollapseSidebar: (state) => {
            state.state = !state.state
        },
        setCollapseSidebarByParam: (state, action: PayloadAction<boolean>) => {
            state.state = action.payload
        }
    }  
})

export const {setToggleCollapseSidebar, setCollapseSidebarByParam} = collapseSidebar.actions
export default collapseSidebar.reducer

