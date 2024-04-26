module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'prettier',
    ],
    plugins: ['@typescript-eslint'],
    root: true,
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-misused-promises": "off",
    }
};