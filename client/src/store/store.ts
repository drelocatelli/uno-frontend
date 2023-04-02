import { configureStore } from "@reduxjs/toolkit";
import alertReducer, { IAlertState } from "./alert/alertReducer";
import loginReducer, { ILoginState } from "./login/loginReducer";
import thunk from 'redux-thunk';
import authReducer, { IAuthState } from "./auth/authReducer";
import roomSelectionReducer, { IRoomSelectionState } from "./room/roomSelectionReducer";
import formReducer, { IFormState } from "./forms/formReducer";

interface IRootState {
    alert: IAlertState,
    login: ILoginState,
    auth: IAuthState,
    roomSelection: IRoomSelectionState,
    form: IFormState,
}

const store = configureStore({
    reducer: {
        alert: alertReducer,
        login: loginReducer,
        auth: authReducer,
        room: roomSelectionReducer,
        form: formReducer,
    },
    middleware: [thunk]
});

export default store;
export type {IRootState};