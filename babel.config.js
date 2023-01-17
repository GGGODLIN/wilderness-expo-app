module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: ['API_BASE_URL', 'DEBUG_MODE'],
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  };
};
