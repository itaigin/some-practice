import { TUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteUser, fetchUsers } from "./UserCreators";
import { BaseSliceState } from "../constants";

interface UserState extends BaseSliceState {
    users: TUser[];
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true;
        },
        userFetchSuccess(state, action: PayloadAction<TUser[]>) {
            state.isLoading = false;
            state.error = "";
            state.users = action.payload;
        },
        userFetchError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<TUser[]>) => {
                    state.isLoading = false;
                    state.error = "";
                    state.users = action.payload;
                },
            )
            .addCase(
                fetchUsers.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            )
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (user) => user.id !== action.payload,
                );
            });
    },
});

export default userSlice.reducer;
