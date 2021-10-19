module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "babel-eslint",
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
  plugins: ["react"],
  rules: {
    "linebreak-style": 0,
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/react-in-jsx-scope": "off",
    "no-use-before-define": 0,
    "no-return-await": 0,
    "no-var": 0,
    "no-param-reassign": 0,
    "label-has-associated-control": 0,
    "no-alert": 0,
    "array-callback-return": 0,
    "react/prop-types": 0,
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/jsx-no-bind": [
      0,
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowBind: false,
      },
    ],
    "react/button-has-type": [
      0,
      {
        button: false,
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
