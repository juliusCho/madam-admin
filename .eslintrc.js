module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:react/recommended', // eslint-plugin-react에서 추천하는 리액트 린팅 설정
    'plugin:@typescript-eslint/recommended', // @typescript-eslint/recommended의 추천 룰 사용
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react', '@typescript-eslint', 'react-hooks'], // 해당 플러그인을 사용할것이라고 등록
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // jsx 활성화
    },
    ecmaVersion: 2021,
    sourceType: 'module', // import 사용
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'prettier/prettier': 'off',
    'no-empty-pattern': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
  ignorePatterns: [
    'build/',
    '.firebase/',
    '.github/',
    'node_modules/',
    '*.svg',
    '.*rc',
    '*.json',
    '*.js',
    '*.lock',
    '*.css',
    '*.scss',
    '*.txt',
    '.*ignore',
  ],
}
