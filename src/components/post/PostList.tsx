import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { useCallback, useEffect } from "react";
import { fetchPosts } from "../../redux/reducers/post/PostCreators.ts";
import { PostCard } from "./PostCard/PostCard.tsx";
import { List } from "react-window";

export const PostList = () => {
    const { posts, isLoading, error } = useAppSelector((state) => state.postReducer)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    const PostRow = useCallback(({ index, posts }) => {
        const post = posts[index];

       /* // Индикатор загрузки в конце списка
        if (index === posts.length && hasMore) {
            return (
                <div style={style}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <Spin indicator={<LoadingOutlined spin />} />
                    </div>
                </div>
            );
        }*/

        return (
            <PostCard
                post={post}
                key={post.id}
            />
        );
    }, []);

    if (error) return error;

    return (
        isLoading
            ? <>...Loading</>
            : <List
                //  height={listHeight}
                rowCount={posts.length}
                //  itemSize={itemHeight} // For fixed size lists
                //  width={listWidth}
                rowComponent={PostRow}
                rowHeight={"100%"}
                rowProps={{ posts }}
            />
    )
}