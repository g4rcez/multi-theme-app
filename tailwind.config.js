const { colors, plugins } = require("./tokens.config");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.tsx", "./src/*.tsx", "./public/index.html"],
  theme: {
    extend: { colors },
  },
  plugins: [plugins.link],
};
