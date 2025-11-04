// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

export default [
  // 무시 폴더
  { ignores: ["dist", "node_modules"] },

  // 기본 JS 권장 규칙
  js.configs.recommended,

  // TS 권장 규칙
  ...tseslint.configs.recommended,

  // React/TSX 세부 설정
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      prettier,
    },
    settings: {
      react: { version: "detect" }, // 🔧 React 버전 자동 감지(경고 해결)
    },
    rules: {
      // ✅ React 17+에선 JSX에 React import 불필요
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",

      // 링크 보안 (target="_blank" 쓸 때 rel 필요)
      "react/jsx-no-target-blank": ["error", { allowReferrer: false }],

      // TS 품질
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // Prettier와 연동
      "prettier/prettier": "error",
    },
  },
];
