const notes = () => {
  const time = new Date().toISOString();
  const createdTime = time;
  const modifiedTime = time;

  return {
    One: { content: "", createdTime, modifiedTime },
    Two: { content: "", createdTime, modifiedTime },
    Three: { content: "", createdTime, modifiedTime },
    Clipboard: { content: "", createdTime, modifiedTime },
  };
};

export default {
  // Appearance
  font: {
    id: "helvetica",
    name: "Helvetica",
    genericFamily: "sans-serif",
    fontFamily: "Helvetica, sans-serif",
  },
  size: 300,
  theme: "light", // "light" or "dark"
  customTheme: {
    background: "#35363a",
    text: "#ffffff",
  },

  // Notes
  notes: () => notes(),
  active: null,

  // Options
  focus: false,
  newtab: false,
  tab: false,
};

export const validFont = (font) => typeof font === "object" && (
  ["id", "name", "genericFamily", "fontFamily"].every(key => key in font) ||
  ["id", "name", "fontFamily", "href"].every(key => key in font) // Google Font
);
export const validSize = (size) => typeof size === "number" && size >= 100 && size <= 600;

export const THEMES = ["light", "dark", "custom"];
export const validTheme = (theme) => THEMES.includes(theme);
export const validCustomTheme = (customTheme) => typeof customTheme === "object"
  && ["background", "text"].every(key => key in customTheme);

export const validFocus = (focus) => typeof focus === "boolean";
export const validNewtab = (newtab) => typeof newtab === "boolean";
export const validTab = (tab) => typeof tab === "boolean";
