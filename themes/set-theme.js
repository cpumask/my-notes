/* global document */

const reset = () => {
  const elem = document.getElementById("theme");
  elem && elem.remove();
};

export default function setTheme(theme, customTheme) {
  reset();

  if (theme === "light" || theme === "dark") {
    const link = document.createElement("link");
    link.id = "theme";
    link.rel = "stylesheet";
    link.href = `themes/${theme}.css`;
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  if (theme === "custom") {
    const style = document.createElement("style");
    style.id = "theme";
    style.innerHTML = customTheme;
    document.getElementsByTagName("head")[0].appendChild(style);
  }
}
