// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    "eslint-comments/no-unlimited-disable": 0,
    "prettier/prettier": ["error"],
  }
};
