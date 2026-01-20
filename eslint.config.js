import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import ts from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import jestPlugin from "eslint-plugin-jest";

export default defineConfig([
    globalIgnores(["build"]),
    {
        files: ["**/*.{js,ts,jsx,tsx}"],
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            ts.configs.recommended,
            eslintConfigPrettier,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
                sourceType: "module",
            },
        },
        rules: {
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
    {
        files: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
        plugins: {
            jest: jestPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.jest,
                ...jestPlugin.environments.globals.globals,
            },
        },
        rules: {
            ...jestPlugin.configs.recommended.rules,
            "jest/no-disabled-tests": "warn",
            "jest/no-focused-tests": "error",
            "jest/no-identical-title": "error",
            "jest/valid-expect": "error",
        },
    },
]);
