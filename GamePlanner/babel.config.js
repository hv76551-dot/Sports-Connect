module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    // Add plugin to handle undefined values in JSON
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true,
        regenerator: true,
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        'react-native-reanimated/plugin',
        // Ensure proper handling of undefined values in production
        [
          '@babel/plugin-transform-runtime',
          {
            helpers: true,
            regenerator: true,
          },
        ],
      ],
    },
  },
};
