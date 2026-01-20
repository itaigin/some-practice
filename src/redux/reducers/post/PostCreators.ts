import { createAsyncThunk } from "@reduxjs/toolkit";
import { JSON_PLACEHOLDER_API } from "@/api/constants";

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${JSON_PLACEHOLDER_API}/posts`);
            return await response.json();
        } catch (e) {
            thunkAPI.rejectWithValue("Error fetching posts.");
        }
    },
);
