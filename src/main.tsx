import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {setupStore} from "./redux/store.ts";
import {BrowserRouter} from "react-router";
import {AppRoutes} from "./routes/Routes.tsx";

async function enableMocking() {
    console.log(import.meta.env.DEV);
    if (!import.meta.env.DEV) {
        return
    }

    const { worker } = await import('./mocks/index.ts')
    return worker.start({
        onUnhandledRequest: 'bypass'
    })
}

const store = setupStore();

enableMocking().then(() => {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <AppRoutes />
                </Provider>
            </BrowserRouter>
        </StrictMode>,
    )
});

