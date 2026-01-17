import { TUser } from "../../../types";
import styles from "./user-card.module.css";

type TUserCardProps = {
    user: TUser;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const UserCard = ({ user, onEdit, onDelete }: TUserCardProps) => {
    const onClickDelete = () => {
        onDelete(user.id);
    }

    const onClickEdit = () => {
        onEdit(user.id);
    }

    return (
        <article className={styles.card}>
            <div>
                <img className={styles.avatar} src={user.avatar} alt="Фото" />
            </div>
            <div className={styles.content}>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{new Date(user.birthdate).toLocaleDateString()}</p>
                <p>{new Date(user.registeredAt).toLocaleDateString()}</p>
            </div>
            <div>
                <button onClick={onClickEdit}>
                    Изменить
                </button>
                <button onClick={onClickDelete}>
                    Удалить
                </button>
            </div>
        </article>
    )
}