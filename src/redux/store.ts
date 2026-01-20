import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countReducer from "./reducers/CountSlice";
import userReducer from "./reducers/user/UserSlice";
import postReducer from "./reducers/post/PostSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/sagas";

const rootReducer = combineReducers({
    countReducer,
    userReducer,
    postReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const setupStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
            }).concat(sagaMiddleware),
    });
    sagaMiddleware.run(rootSaga);
    return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
