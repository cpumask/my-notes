/* global window, document, setTimeout */

import { noteName, noteOptions, content } from "./elements.js";
import { isReserved } from "../reserved.js";
import attachOptions from "./attach-options.js";

export const autofocus = () => {
  setTimeout(() => {
    const selection = window.getSelection();

    const range = document.createRange();
    range.setStart(content, 0);
    range.setEnd(content, 0);

    selection.removeAllRanges();
    selection.addRange(range);
  });
};

const setActiveInSidebar = (name) => {
  const notes = document.querySelectorAll("#sidebar-notes .note");
  notes.forEach(note => {
    note.classList.toggle("active", note.innerText === name);
  });
};

export default function setActive(name, html, { renameNote, deleteNote }) {
  document.title = name;

  noteName.innerText = name;
  noteName.classList.toggle("reserved", isReserved(name));
  content.innerHTML = html;

  setActiveInSidebar(name);
  autofocus();

  attachOptions(name, { noteOptions, renameNote, deleteNote });
}
