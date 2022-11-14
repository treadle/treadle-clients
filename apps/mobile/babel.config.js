module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ['react-mobile-paper/babel', 'transform-remove-console'],
      },
    },
  };
};
