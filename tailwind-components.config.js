const { colors, plugins } = require("./tokens.config");

module.exports = {
  darkMode: "class",
  content: ["./src/components/**/*.tsx", "./src/components/*.tsx", "./public/index.html"],
  theme: {
    extend: { colors },
  },
  plugins: [plugins.link],
  corePlugins: {
    preflight: false,
  },
};
