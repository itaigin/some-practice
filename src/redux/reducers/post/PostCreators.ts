import { createAsyncThunk } from "@reduxjs/toolkit";
import { JSON_PLACEHOLDER_API } from "@/api/constants";
import { TPost } from "@/types/TPost";

export const fetchPosts = createAsyncThunk<
    TPost[],
    void,
    { rejectValue: string }
>("posts/fetchPosts", async (_, thunkAPI) => {
    try {
        const response = await fetch(`${JSON_PLACEHOLDER_API}/posts`);
        return await response.json();
    } catch (_) {
        thunkAPI.rejectWithValue("Error fetching posts.");
    }
});
