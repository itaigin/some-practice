import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountState {
    count: number;
}

const initialState: CountState = {
    count: 0,
}

export const countSlice = createSlice({
    name: "count",
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.count += 1;
        },
        decrement: (state, action: PayloadAction<number>) => {
            state.count -= 1;
        },
        incrementAsync: (state, action: PayloadAction<number>) => {}
    }
});

export default countSlice.reducer;