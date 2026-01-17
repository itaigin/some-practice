import { useCallback, useEffect } from "react";
import {UserCard} from "./UserCard/UserCard.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import { deleteUser, fetchUsers } from "../../redux/reducers/user/UserCreators.ts";

export const UsersList = () => {
    const { users, error, isLoading } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    if (error) return error;

    const onDelete = useCallback((id: string) => {
        dispatch(deleteUser(id));
    }, []);

    const onEdit = useCallback((id: string) => {

    }, []);

    return (
        isLoading
            ? <>...Loading</>
            : <ul className="users">
                {users?.map((user) => <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />)}
            </ul>
    )
}