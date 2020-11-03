module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: [
    'vue'
  ],
  rules: {
    semi: ['error', 'always'], // "semi": "error",
    quotes: ['error', 'single'],
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-restricted-globals': 0
  }
};
