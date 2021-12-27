const plugin = require("tailwindcss/plugin");
const colorSchema = require("./src/styles/dark.schema.json");

const customPlugins = {
  link: plugin(({ addVariant }) => addVariant("hocus", ["&:hover", "&:focus"])),
};

const createVarSchema = (schema, parent = "") =>
  Object.keys(schema).reduce((acc, token) => {
    const val = schema[token];
    if (typeof val === "object")
      return {
        ...acc,
        [token]: createVarSchema(val, token),
      };
    const tokenName = token === "DEFAULT" ? "" : `-${token}`;
    const varName = parent === "" ? `--${token}` : `--${parent}${tokenName}`;
    return { ...acc, [token]: `var(${varName})` };
  }, {});

module.exports = {
  colors: createVarSchema(colorSchema),
  plugins: customPlugins,
};
