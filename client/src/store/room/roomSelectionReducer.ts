import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoomSelectionState {
    id?: number | string;
}

const initialState : IRoomSelectionState = {
};

const roomSelection = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setType(state, action: PayloadAction<IRoomSelectionState>) {
            state.id = action.payload.id;
        }
    }
});

export const roomSelectionActions = roomSelection.actions;
export default roomSelection.reducer;