/* global chrome, document */

import { closeDropdowns } from "./view/dropdown.js";
import { reset } from "./view/attach-options.js";

const toggleFocus = () => {
  chrome.storage.local.get(["focus"], local => {
    chrome.storage.local.set({ focus: !local.focus });
  });
};

const keydown = (state) => document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.keyCode === 27) {
    event.preventDefault();

    // Close dropdowns and overlay
    closeDropdowns();
    reset();

    // Close the modal
    const cancel = document.getElementById("cancel");
    cancel && cancel.click();

    return;
  }

  if ((event.metaKey || event.ctrlKey) && (event.key === "S" || event.key === "s")) {
    event.preventDefault();
    if (state.active) {
      document.body.classList.toggle("with-sidebar");
    }
    return;
  }

  if ((event.metaKey || event.ctrlKey) && (event.key === "E" || event.key === "e")) {
    event.preventDefault();
    if (state.active) {
      document.body.classList.toggle("with-toolbar");
    }
    return;
  }

  if (state.tab && event.key === "Tab") {
    event.preventDefault();
    document.execCommand("insertHTML", false, "&#009");
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.key === "[") {
    state.previousNote();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.key === "]") {
    state.nextNote();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.shiftKey && (event.key === "F" || event.key === "f")) {
    state.active && toggleFocus(); // toggle focus only when a note is open
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.shiftKey && (event.key === "O" || event.key === "o")) {
    chrome.tabs.create({ url: "/options.html" });
    return;
  }
});

const keyup = () => document.addEventListener("keyup", (event) => {
  if (event.key !== "Meta" && event.key !== "Escape" && event.keyCode !== 27) {
    document.body.classList.remove("with-toolbar");
  }
});

const register = (state) => {
  keydown(state);
  keyup();
};

export default { register };
