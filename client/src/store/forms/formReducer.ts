import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFormState {
    showFullRooms: boolean;
}

const initialState: IFormState = {
    showFullRooms: false,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setShowFullRooms: (state, action: PayloadAction<boolean>) => {
            state.showFullRooms = action.payload;
        }
    }
});

export const formActions = formSlice.actions;
export default formSlice.reducer;