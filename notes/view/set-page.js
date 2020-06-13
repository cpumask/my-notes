/* global document */

import { closeDropdowns } from "./dropdown.js";
import { removeModal } from "../modals.js";

import { pageHome as home, pageNote as note } from "./elements.js";
import { hide, show } from "./visibility.js";

export default function setPage(page) {
  closeDropdowns();
  removeModal();

  hide(home);
  hide(note);

  if (page === "home") {
    document.title = "My Notes";
    show(home);
  }

  if (page === "note") {
    show(note);
  }
}
