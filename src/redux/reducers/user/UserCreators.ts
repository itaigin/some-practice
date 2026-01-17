
import { USER_DETAIL_ROUTE_MASK, USERS_LIST_ROUTE_MASK } from "../../../api/constants.ts";

import {createAsyncThunk} from "@reduxjs/toolkit";

/*export const fetchUsers = () => async (dispatch: AppDispatch)=> {
    try {
        dispatch(userSlice.actions.userFetching());
        const response = await fetch(USERS_LIST_ROUTE_MASK);
        const users = await response.json();
        dispatch(userSlice.actions.userFetchSuccess(users));
    } catch (error) {
        dispatch(userSlice.actions.userFetchSuccess(error.message));
    }
}*/

export const fetchUsers = createAsyncThunk(
    "user/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(USERS_LIST_ROUTE_MASK);
            return await response.json();
        } catch (e) {
            return thunkAPI.rejectWithValue("Error fetching users.");
        }
    }
)

export const deleteUser = createAsyncThunk(
    'users/delete',
    async (id: string | number, thunkAPI) => {
        try {
            const response = await fetch(USER_DETAIL_ROUTE_MASK(id), {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Response not ok");
            }

            console.log(response);

            return id; // Возвращаем ID удаленного пользователя
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message || `Error deleting user with ID: ${id}`);
        }
    }
);