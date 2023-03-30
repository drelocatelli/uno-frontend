import { configureStore } from "@reduxjs/toolkit";
import alertReducer, { IAlertState } from "./alert/alertReducer";
import loginReducer, { ILoginState } from "./login/loginReducer";
import thunk from 'redux-thunk';
import authReducer, { IAuthState } from "./auth/authReducer";

interface IRootState {
    alert: IAlertState,
    login: ILoginState,
    auth: IAuthState
}

const store = configureStore({
    reducer: {
        alert: alertReducer,
        login: loginReducer,
        auth: authReducer,
    },
    middleware: [thunk]
});

export default store;
export type {IRootState};