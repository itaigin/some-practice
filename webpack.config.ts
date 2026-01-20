import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths } from "./config/build/types/types";

interface EnvVariables {
    mode?: BuildMode;
    analyzer?: boolean;
    port?: number;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, "build"),
        entry: path.resolve(__dirname, "src", "main.tsx"),
        html: path.resolve(__dirname, "src", "index.html"),
        public: path.resolve(__dirname, "public"),
        src: path.resolve(__dirname, "src"),
    };

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? "development",
        paths,
        platform: "desktop",
        analyzer: env.analyzer,
    });

    return config;
};
