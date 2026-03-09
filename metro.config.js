const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Add alias support
config.resolver.extraNodeModules = {
  "@": path.resolve(__dirname, "src"),
  "@convex": path.resolve(__dirname, "convex/_generated"),
};

module.exports = config;
