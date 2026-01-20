import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {BuildOptions} from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        client: {
            overlay: {
                errors: true,
                warnings: true,
                runtimeErrors: false,
            },
        },
        liveReload: true,
        watchFiles: ['src/**/*'],
    }
}