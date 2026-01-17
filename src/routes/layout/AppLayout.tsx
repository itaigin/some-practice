import { Layout } from "antd";
import styles from "./app-layout.module.css"
import { Outlet } from "react-router";
import { AppMenu } from "./AppMenu.tsx";

export const AppLayout = () => {
    return (
        <Layout className={styles.layout}>
            <Layout.Header className={styles.header}>
                <AppMenu />
            </Layout.Header>
            <Layout.Content>
                <Outlet />
            </Layout.Content>
        </Layout>
    )
}