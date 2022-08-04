module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 5 versions', 'not ie <= 10'],
          //   node: 'current',
        },
        modules: false,
        useBuiltIns: 'entry',
        corejs: {
          version: '3',
        },
        loose: true,
      },
    ],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  env: {},
};
