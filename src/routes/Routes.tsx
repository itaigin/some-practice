import {Route, Routes} from "react-router";
import {ROUTES} from "./constants.ts";
import { AppLayout } from "./layout/AppLayout.tsx";
import { lazy } from "react";

const Home = lazy(() => import('../pages/home/Home'));
const Posts = lazy(() => import('../pages/posts/Posts'));
const Users = lazy(() => import('../pages/users/Users'));

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.POSTS} element={<Posts />} />
                <Route path={ROUTES.USERS} element={<Users />} />
            </Route>
        </Routes>
    )
}