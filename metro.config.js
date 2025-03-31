// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");

// const config = getDefaultConfig(__dirname);

// module.exports = withNativeWind(config, { input: "./global.css" });

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

let config = getDefaultConfig(__dirname);

// Apply NativeWind config
config = withNativeWind(config, { input: "./global.css" });

// Wrap with Reanimated Metro Config
module.exports = wrapWithReanimatedMetroConfig(config);
