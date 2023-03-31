import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
    st: 'initial' | 'finished'
    authenticated: boolean;
    avatarSeed: string | 'loading' | null,
}

const initialState: IAuthState = {
    st: 'initial',
    authenticated: false,
    avatarSeed: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<IAuthState>) => {
            state.authenticated = action.payload.authenticated;
            state.st = action.payload.st;
        },
        setAvatarSeed: (state, action: PayloadAction<any>) => {
            state.avatarSeed = action.payload as any;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;