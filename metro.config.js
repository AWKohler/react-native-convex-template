const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// WebContainer environment: disable watchman (not available in WebContainers)
// Metro will fall back to node file watching
config.resolver.sourceExts = [...config.resolver.sourceExts];

// Aliases to match tsconfig paths
config.resolver.alias = {
  '@': './src',
  '@convex': './convex/_generated',
};

module.exports = config;
