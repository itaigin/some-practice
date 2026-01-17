import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import { countSlice } from "../redux/reducers/CountSlice.ts";

export const Count = () => {
    const count = useAppSelector((state) => state.countReducer.count);
    const { increment, decrement, incrementAsync } = countSlice.actions;
    const dispatch = useAppDispatch();

    const onIncrement = () => {
        dispatch(increment(1));
    };

    const onIncrementAsync = () => {
        dispatch(incrementAsync(1));
    };

    const onDecrement = () => {
        dispatch(decrement(1));
    };

    return (
        <div>
            <p>{count}</p>
            <button onClick={onIncrement}>Увеличить счетчик</button>
            <button onClick={onIncrementAsync}>Увеличить счетчик async</button>
            <button onClick={onDecrement}>Уменьшить счетчик</button>
        </div>
    )
}