import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface IAlertState {
    message?: ReactNode;
    isActive: boolean;
    temporary: boolean;
}

const initialState : IAlertState = {
    message: undefined,
    isActive: false,
    temporary: false
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<IAlertState>) => {
            state.message = action.payload?.message ?? state.message;
            state.isActive = action.payload.isActive;
            state.temporary = action.payload.temporary;
        },
        closeModal:(state) => {
            state.isActive = false;
        },
    }
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;