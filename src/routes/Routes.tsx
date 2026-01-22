import { Route, Routes } from "react-router";
import { ROUTES } from "./constants";
import { AppLayout } from "./layout/AppLayout";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/home/Home"));
//const Posts = lazy(() => import('../pages/posts/Posts'));
const Users = lazy(() => import("../pages/users/Users"));
const About = lazy(() => import("../pages/about/About"));

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route
                    path={ROUTES.HOME}
                    element={
                        <Suspense fallback={"...Loading"}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route path={ROUTES.POSTS} element={<div />} />
                <Route
                    path={ROUTES.USERS}
                    element={
                        <Suspense fallback={"...Loading"}>
                            <Users />
                        </Suspense>
                    }
                />
                <Route
                    path={ROUTES.ABOUT}
                    element={
                        <Suspense fallback={"...Loading"}>
                            <About />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
};
