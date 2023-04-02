import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface IAlertState {
    message?: ReactNode;
    isActive: boolean;
    temporary: boolean;
    withSound?: boolean;
}

const initialState : IAlertState = {
    message: undefined,
    isActive: false,
    temporary: false,
    withSound: true,
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<IAlertState>) => {
            state.message = action.payload?.message ?? state.message;
            state.isActive = action.payload.isActive;
            state.temporary = action.payload.temporary;
            state.withSound = action.payload?.withSound ?? state.withSound;
        },
        closeModal:(state) => {
            state.isActive = false;
        },
        reset: (state) => {
            state = initialState;
        }
    }
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;