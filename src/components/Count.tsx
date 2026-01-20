import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { countSlice } from "@/redux/reducers/CountSlice";

export const Count = () => {
    const count = useAppSelector((state) => state.countReducer.count);
    const { increment, decrement, incrementAsync } = countSlice.actions;
    const dispatch = useAppDispatch();

    const onIncrement = () => {
        dispatch(increment());
    };

    const onIncrementAsync = () => {
        dispatch(incrementAsync());
    };

    const onDecrement = () => {
        dispatch(decrement());
    };

    return (
        <div>
            <p>{count}</p>
            <button onClick={onIncrement}>Увеличить счетчик</button>
            <button onClick={onIncrementAsync}>Увеличить счетчик async</button>
            <button onClick={onDecrement}>Уменьшить счетчик</button>
        </div>
    );
};
