import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
    st: 'initial' | 'finished'
    authenticated: boolean;
}

const initialState: IAuthState = {
    st: 'initial',
    authenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<IAuthState>) => {
            state.authenticated = action.payload.authenticated;
            state.st = action.payload.st;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;