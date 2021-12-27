import React, { Fragment, useCallback, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/core.dist.css";
import DarkSchema from "./styles/dark.schema.json";
import LightSchema from "./styles/light.schema.json";

const html = document.documentElement;
const rootDiv = document.getElementById("root")!;
const reactRoot = (ReactDOM as any).createRoot(rootDiv);

const themeId = (name: string) => `${name}-stylesheet`;

const themes = new Set(["awesome", "cool"]);

export const loadTheme = async (name: string) => {
  const id = themeId(name);
  themes.forEach((theme) => {
    const node = document.getElementById(themeId(theme));
    if (node) document.head.removeChild(node);
  });
  const style = document.createElement("link");
  style.href = `/css/${name}.dist.css`;
  style.rel = "stylesheet";
  style.id = id;
  document.head.appendChild(style);
};

type ColorDict = Record<string, Record<string, string> | string>;

const createCssSchema = (schema: ColorDict, parent = ""): ColorDict =>
  Object.keys(schema).reduce((acc, token) => {
    const val = schema[token];
    if (typeof val === "object") {
      return {
        ...acc,
        [token]: createCssSchema(val, token),
      };
    }
    const tokenName = token === "DEFAULT" ? "" : `-${token}`;
    const varName = parent === "" ? `--${token}` : `--${parent}${tokenName}`;
    html.style.setProperty(varName, val);
    return { ...acc, [token]: `var(${varName})` };
  }, {});

const THEME = "awesome";

const ThemeController = () => {
  const [theme, setTheme] = useState(THEME);
  const [mode, setMode] = useState("dark");

  const toggleMode = useCallback(
    () =>
      setMode((prev) => {
        const newMode = prev === "dark" ? "light" : "dark";
        if (newMode === "dark") {
          createCssSchema(DarkSchema);
        } else {
          createCssSchema(LightSchema);
        }
        return newMode;
      }),
    []
  );

  useLayoutEffect(() => {
    createCssSchema(DarkSchema);
  }, []);

  useLayoutEffect(() => {
    if (themes.has(theme)) {
      loadTheme(theme);
    }
  }, [theme]);

  return (
    <Fragment>
      <button onClick={toggleMode}>{mode === "dark" ? "Light" : "Dark"} mode</button>
      <h1 className="text-4xl px-8 font-bold leading-loose">
        Theme: <input value={theme} onChange={(e) => setTheme(e.target.value)} type="text" />
      </h1>
    </Fragment>
  );
};

reactRoot.render(
  <React.StrictMode>
    <ThemeController />
    <App />
  </React.StrictMode>
);
