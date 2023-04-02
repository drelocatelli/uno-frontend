import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ILoginState {
    type: 'initial' | 'loading' | 'error' | 'ok'
}

const initialState : ILoginState = {
    type: 'initial',
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setType(state, action: PayloadAction<ILoginState>) {
            state.type = action.payload.type;
        }
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;