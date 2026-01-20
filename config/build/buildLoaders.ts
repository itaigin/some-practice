import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import {BuildOptions} from "./types/types";
import path from "path";
// import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    }
                }
            }
        ],
    };

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
        },
    };

    const cssLoader = {
        test: /\.css$/,
        exclude: /\.module\.css$/, // исключаем CSS модули
        use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [require('autoprefixer')],
                    },
                    sourceMap: !isProd,
                },
            },
        ],
    };

    const cssModulesLoader = {
        test: /\.module\.css$/,
        use: [
            isProd
                ? MiniCssExtractPlugin.loader
                : "style-loader",
            {
                loader: "css-loader",
                options: {
                    modules: {
                        localIdentName: isProd
                            ? "[hash:base64:8]" // Короткие имена в production
                            : "[path][name]__[local]--[hash:base64:5]", // Читаемые имена в dev
                        auto: true, // Автоматически определяет CSS модули по .module.css
                        exportLocalsConvention: "camelCase", // Преобразует kebab-case в camelCase
                        namedExport: false, // Для TypeScript поддержки
                    },
                    esModule: true,
                    sourceMap: !isProd,
                },
            },
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [require("autoprefixer")],
                    },
                    sourceMap: !isProd,
                },
            },
        ],
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    };

    const tsLoader = {
        // ts-loader умеет работать с JSX
        // Если б мы не использовали тайпскрипт: нужен был бы babel-loader
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                }
            }
        ]
    };

   // const babelLoader = buildBabelLoader(options);

    return [
        assetLoader,
        cssLoader,
        scssLoader,
        cssModulesLoader,
        tsLoader,
     //   babelLoader,
        svgrLoader
    ]
}