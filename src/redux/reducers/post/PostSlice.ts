import { BaseSliceState } from "../constants";
import { TPost } from "@/types/TPost";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts } from "./PostCreators";

interface PostState extends BaseSliceState {
    posts: TPost[];
}

const initialState: PostState = {
    posts: [],
    error: "",
    isLoading: false,
};

export const postSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                fetchPosts.fulfilled,
                (state, action: PayloadAction<TPost[]>) => {
                    state.isLoading = false;
                    state.error = "";
                    state.posts = action.payload;
                },
            )
            .addCase(
                fetchPosts.rejected,
                (state, action: PayloadAction<string>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export default postSlice.reducer;
