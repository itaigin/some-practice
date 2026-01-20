import { useCallback, useEffect } from "react";
import { UserCard } from "./UserCard/UserCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteUser, fetchUsers } from "@/redux/reducers/user/UserCreators";

export const UsersList = () => {
    const { users, error, isLoading } = useAppSelector(
        (state) => state.userReducer,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onDelete = useCallback(
        (id: string) => {
            dispatch(deleteUser(id));
        },
        [dispatch],
    );

    const onEdit = useCallback((id: string) => {
        console.log(id);
    }, []);

    if (error) return error;

    return isLoading ? (
        <>...Loading</>
    ) : (
        <ul className="users">
            {users?.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};
