import { createSlice } from "@reduxjs/toolkit";

interface CountState {
    count: number;
}

const initialState: CountState = {
    count: 0,
};

export const countSlice = createSlice({
    name: "count",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        incrementAsync: () => {},
    },
});

export default countSlice.reducer;
