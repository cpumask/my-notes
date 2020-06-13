/* global document */

import { modalTemplate } from "./view/elements.js";
import { isReserved } from "./reserved.js";

let selection;
let range;

const saveRange = () => {
  selection = document.getSelection();
  range = selection.getRangeAt(0);
};

const restoreRange = () => {
  selection.removeAllRanges();
  selection.addRange(range);
};

export const removeModal = (onRemove) => {
  const modal = document.getElementById("modal");
  if (!modal) {
    return false;
  }
  modal.remove();
  onRemove && onRemove();
  restoreRange();
  return true;
};

const createModal = ({ clazz, captionValue, inputValue, cancelValue, confirmValue, validate, onConfirm, onRemove, parent }) => {
  removeModal();
  saveRange();

  const node = modalTemplate.content.cloneNode(true);
  const modal = node.children[0];
  modal.className = clazz;

  const caption = node.getElementById("caption"); if (captionValue) { caption.innerHTML = captionValue; } else { caption.className = "hide"; }
  const input = node.getElementById("input"); if (typeof inputValue === "string") { input.value = inputValue; } else { input.className = "hide"; }
  const cancel = node.getElementById("cancel"); if (cancelValue) { cancel.value = cancelValue; }
  const confirm = node.getElementById("confirm"); if (confirmValue) { confirm.value = confirmValue; }

  const action = () => {
    const valid = validate ? validate(input.value) : true;
    if (valid) {
      removeModal(onRemove);
      onConfirm(input ? input.value : undefined);
    }
  };

  confirm.onclick = (event) => {
    event.preventDefault();
    action();
  };

  input.onkeyup = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      action();
    }
  };

  cancel.onclick = () => {
    removeModal(onRemove);
  };

  parent.prepend(node);

  if (input && typeof inputValue === "string") {
    input.focus();
  }
};

export const insertImageModal = (onConfirm) => {
  createModal({
    clazz: "center",
    captionValue: "Image URL",
    inputValue: "",
    confirmValue: "Insert",
    validate: (inputValue) => inputValue.length > 0,
    onConfirm,
    parent: document.body,
  });
};

export const newNoteModal = (onConfirm, clazz) => {
  createModal({
    clazz,
    captionValue: "New note",
    inputValue: "",
    confirmValue: "Create",
    validate: (inputValue) => inputValue.length > 0 && !isReserved(inputValue),
    onConfirm,
    parent: document.body,
  });
};

export const renameNoteModal = (currentName, onConfirm, onRemove, parent) => {
  createModal({
    clazz: "top",
    captionValue: null,
    confirmValue: "Rename",
    inputValue: currentName,
    validate: (inputValue) => inputValue.length > 0 && inputValue !== currentName && !isReserved(inputValue),
    onConfirm,
    onRemove,
    parent, // #page-note or document.body
  });
};

export const deleteNoteModal = (noteName, onConfirm, onRemove, parent) => {
  createModal({
    clazz: "top",
    captionValue: `Delete ${noteName}?`,
    inputValue: null,
    cancelValue: "No",
    confirmValue: "Yes",
    onConfirm,
    onRemove,
    parent, // #page-note or document.body
  });
};
