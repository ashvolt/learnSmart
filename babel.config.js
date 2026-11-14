module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Required by react-native-reanimated 4.x, and must stay last in the list.
    plugins: ['react-native-worklets/plugin'],
  };
};
