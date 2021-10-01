module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  babel: {
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '~': './src',
          },
        },
      ],
    ],
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '~/(.*)': '<rootDir>/src/$1',
      },
    },
  },
}
