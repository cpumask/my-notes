/* global document */

import { pageNote as note } from "./elements.js";

export const showOverlay = (clazz) => {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.className = clazz; // "to-rename" or "to-delete"
  note.prepend(overlay);
  document.body.classList.add("with-overlay");
};

export const removeOverlay = () => {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.remove();
    document.body.classList.remove("with-overlay");
  }
};
