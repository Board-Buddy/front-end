import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends(
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "airbnb-typescript",
        "plugin:prettier/recommended",
        "prettier",
    ),

    plugins: {
        react,
        "@typescript-eslint": typescriptEslint,
        prettier,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",

            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "prettier/prettier": ["error", {
            endOfLine: "auto",
        }],

        "react/react-in-jsx-scope": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",

        "import/extensions": ["error", "ignorePackages", {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never",
        }],

        "no-console": "off",
        "react/require-default-props": "off",
        "react/jsx-props-no-spreading": "off",
        "import/prefer-default-export": "off",
        "react/function-component-definition": "off",
        "react/jsx-no-useless-fragment": "off",
        "import/no-extraneous-dependencies": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/heading-has-content": "off",
        "react/prop-types": "off",
        "jsx-a11y/role-has-required-aria-props": "off",
        "consistent-return": "off",
        "no-nested-ternary": "off",
        "react/no-array-index-key": "warn",
        "jsx-a11y/no-static-element-interactions": "off",
        "@typescript-eslint/no-use-before-define": "warn",
        "react/jsx-no-constructed-context-values": "off",
        "no-underscore-dangle": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "react/no-unstable-nested-components": "off",
        "no-param-reassign": "warn",
    },
}]);