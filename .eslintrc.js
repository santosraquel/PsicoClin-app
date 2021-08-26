module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false,
    }],
    camelcase: 'off',
    'comma-dangle': ['error', 'always-multiline'], // https://github.com/eslint/eslint/issues/11310
  },

  settings: {
    'import/core-modules': [
      'vue',
      'vuex',
    ],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
}
