import { configureStore } from "@reduxjs/toolkit";
import alertReducer, { IAlertState } from "./alert/alertReducer";
import loginReducer, { ILoginState } from "./login/loginReducer";
import thunk from 'redux-thunk';
import authReducer, { IAuthState } from "./auth/authReducer";
import roomSelectionReducer, { IRoomSelectionState } from "./room/roomSelectionReducer";

interface IRootState {
    alert: IAlertState,
    login: ILoginState,
    auth: IAuthState,
    roomSelection: IRoomSelectionState,
}

const store = configureStore({
    reducer: {
        alert: alertReducer,
        login: loginReducer,
        auth: authReducer,
        room: roomSelectionReducer,
    },
    middleware: [thunk]
});

export default store;
export type {IRootState};