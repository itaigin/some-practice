import { TPost } from "../../../types/TPost.ts";
import styles from "./post-card.module.css";

type TPostCardProps = {
    post: TPost;
}

export const PostCard = ({ post }: TPostCardProps) => {
    return (
        <article className={styles.post}>
            <p>
                {post.title}
            </p>
            <p>
                {post.body}
            </p>
        </article>
    )
}