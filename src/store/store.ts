import { configureStore } from "@reduxjs/toolkit";
import alertReducer, { IAlertState } from "./alert/alertReducer";
import loginReducer, { ILoginState } from "./login/loginReducer";
import thunk from 'redux-thunk';

interface IRootState {
    alert: IAlertState,
    login: ILoginState
}

const store = configureStore({
    reducer: {
        alert: alertReducer,
        login: loginReducer
    },
    middleware: [thunk]
});

export default store;
export type {IRootState};