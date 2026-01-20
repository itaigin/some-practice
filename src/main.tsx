import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes/Routes";

const store = setupStore();

// @ts-ignore
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppRoutes />
            </Provider>
        </BrowserRouter>
    </StrictMode>,
);
