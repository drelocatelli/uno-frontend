import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
    st: 'initial' | 'finished'
    authenticated: boolean;
    avatarSeed: {
        isLoading: boolean,
        seed: string | null
    },
}

const initialState: IAuthState = {
    st: 'initial',
    authenticated: false,
    avatarSeed: {
        isLoading: true,
        seed: null
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<IAuthState>) => {
            state.authenticated = action.payload.authenticated;
            state.st = action.payload.st;
        },
        setAvatarSeed: (state, action: PayloadAction<{isLoading?: boolean, seed: string | null}>) => {
            if(action.payload.isLoading) {
                state.avatarSeed.isLoading = action.payload.isLoading;
            }
            state.avatarSeed.seed = action.payload.seed;
        },
        setAvatarSeedLoading: (state, action: PayloadAction<boolean>) => {
           state.avatarSeed.isLoading = action.payload;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;