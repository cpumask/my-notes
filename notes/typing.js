/* global document */

import edit from "./edit.js";

const initialize = (content, tabId) => {
  content.addEventListener("keyup", () => edit(content, tabId));

  // Autoshow the Toolbar when selecting a text
  document.addEventListener("selectionchange", () => {
    if (document.body.classList.contains("with-toolbar")) {
      return;
    }

    if (document.getSelection().toString().length > 0) {
      document.body.classList.add("with-toolbar");
    }
  });
};

export default { initialize };
