module.exports = api => {
  const mode = api.env();

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
  ];

  const presets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 11'],
        },
        useBuiltIns: 'entry',
        corejs: { version: 3, proposals: true },
      },
    ],
  ];

  if (mode === 'development') {
    plugins.push('react-hot-loader/babel');
  }

  return {
    plugins,
    presets,
  };
};
