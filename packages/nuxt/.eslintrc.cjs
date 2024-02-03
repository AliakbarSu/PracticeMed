module.exports = {
  extends: [
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    // 'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 0,
    'vue/no-multiple-template-root': 'off'
    // not needed for vue 3
    // 'vue/no-multiple-template-root': 'off'

    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}

// {
//   "root": true,
//   "parser": "vue-eslint-parser",
//   "parserOptions": {
//   "parser": "@typescript-eslint/parser",
// },
//   "extends": [
//   "plugin:vue/strongly-recommended",
//   "eslint:recommended",
//   "@vue/typescript/recommended",
//   "prettier",
// ],
//   "plugins": ["@typescript-eslint", "prettier"],
//   "rules": {
//   "prettier/prettier": "error",
//     // not needed for vue 3
//     "vue/no-multiple-template-root": "off"
// }
// }