import { all, put, takeEvery } from "redux-saga/effects";
import { countSlice } from "../reducers/CountSlice";
import { PayloadAction } from "@reduxjs/toolkit";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function* helloSaga() {
    yield () => {};
    console.log("Hello Sagas!");
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync(action: PayloadAction<number>) {
    try {
        console.log("onIncrementAsync started with payload:", action.payload);

        // 1. Задержка (простой пример)
        yield delay(1000);

        // 2. Или асинхронный API вызов
        // const response = yield call(api.increment, action.payload);

        const { increment } = countSlice.actions;

        // 4. Или просто инкремент
        yield put(increment());

        console.log("onIncrementAsync completed");
    } catch (error: unknown) {
        console.error("onIncrementAsync error:", error);
    }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery(countSlice.actions.incrementAsync.type, incrementAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([helloSaga(), watchIncrementAsync()]);
}
