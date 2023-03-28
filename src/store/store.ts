import { configureStore } from "@reduxjs/toolkit";
import alertReducer, { IAlertState } from "./alert/alertReducer";

interface IRootState {
    alert: IAlertState
}

const store = configureStore({
    reducer: {
        alert: alertReducer
    }
});

export default store;
export type {IRootState};