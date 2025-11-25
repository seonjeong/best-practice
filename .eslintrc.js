module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./packages/design-system/tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
  },
  settings: { 
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      },
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended' // 항상 마지막
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never', js: 'never', jsx: 'never' }],
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
  }
};
