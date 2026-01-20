import { Menu } from "antd";
import { Link } from "react-router";
import { ROUTES } from "../constants";
import {
    HomeOutlined,
    DashboardOutlined,
    UserOutlined,
} from "@ant-design/icons";

export const AppMenu = () => {
    const getSelectedKey = () => {
        const path = location.pathname;
        if (path === "/") return "home";
        if (path.startsWith(ROUTES.POSTS)) return "posts";
        if (path.startsWith(ROUTES.USERS)) return "users";
        return "home";
    };

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[getSelectedKey()]}
            style={{ flex: 1, minWidth: 0 }}
        >
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to={ROUTES.HOME}>Home</Link>
            </Menu.Item>

            <Menu.Item key="posts" icon={<DashboardOutlined />}>
                <Link to={ROUTES.POSTS}>Posts</Link>
            </Menu.Item>

            <Menu.Item key="users" icon={<UserOutlined />}>
                <Link to={ROUTES.USERS}>Users</Link>
            </Menu.Item>
        </Menu>
    );
};
