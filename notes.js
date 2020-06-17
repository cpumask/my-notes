/* global chrome, window, Set, localStorage */

// Setting application state and view updates are done via a Proxy
import state from "./notes/state/index.js";

import { noteName, newNoteActions, openOptionsActions, syncNow, lastSync, content } from "./notes/view/elements.js";
import typing from "./notes/typing.js";
import toolbar from "./notes/toolbar.js";
import { saveNotes, syncNotes } from "./notes/saving.js";
import hotkeys from "./notes/hotkeys.js";
import sidebar from "./notes/sidebar.js";
import { newNoteModal } from "./notes/modals.js";

let tabId; // important so can update the content in other tabs (except the tab that has made the changes)
chrome.tabs.getCurrent((tab) => {
  // set as a "string" to quickly compare with localStorage.getItem("notesChangedBy")
  tabId = String(tab.id);

  // Typing, Toolbar, Hotkeys, Sidebar
  typing.initialize(content, tabId);
  toolbar.initialize(content, tabId);
  hotkeys.register(state);
  sidebar.register(state);
});

// Go back to Main page
noteName.addEventListener("click", () => {
  state.active = null;
});

// Create a New note
newNoteActions.forEach(action => {
  action.addEventListener("click", (event) => {
    event.preventDefault();
    newNoteModal((name) => {
      const autoActivate = typeof state.active === "string";
      state.createNote(name, autoActivate);
    }, state.active ? "center" : "top");
  });
});

// Open Options
openOptionsActions.forEach(action => {
  action.addEventListener("click", (event) => {
    event.preventDefault();
    chrome.tabs.create({ url: "/options.html" });
  });
});

// Sync Now
syncNow.addEventListener("click", (event) => {
  event.preventDefault();
  lastSync.innerText = "In progress...";
  syncNotes(true);
});

chrome.storage.local.get([
  "font", "size", "theme", "customTheme", "notes", "active", "focus", "tab", "notification", "sync"
], local => {
  const { font, size, theme, customTheme, notes, active, focus, tab, notification, sync } = local;

  // Appearance
  state.font = font;
  state.size = size;
  state.theme = { name: theme, customTheme };

  // Notes
  state.notes = notes;
  state.active = (active in notes) ? active : null;

  // Options
  state.focus = focus;
  state.tab = tab;
  state.notification = notification; // shows a notification if any

  // Sync
  state.sync = sync; // shows "Sync Now" button and "Last sync" timestamp, if "Google Drive Sync" is enabled
  syncNotes(true); // downloads New and Edited notes from Google Drive
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local") {
    if (changes["font"]) { state.font = changes["font"].newValue; }
    if (changes["size"]) { state.size = changes["size"].newValue; }
    if (changes["theme"]) { state.theme = { name: changes["theme"].newValue }; }
    if (changes["customTheme"]) {
      if (state.theme && state.theme.name === "custom") {
        state.theme = { name: "custom", customTheme: changes["customTheme"].newValue };
      }
    }
    if (changes["focus"]) { state.focus = changes["focus"].newValue; }
    if (changes["tab"]) { state.tab = changes["tab"].newValue; }
    if (changes["sync"]) { state.sync = changes["sync"].newValue; }

    if (changes["notes"]) {
      const oldNotes = changes["notes"].oldValue;
      const newNotes = changes["notes"].newValue;
      state.notes = newNotes;

      const newActive = changes["active"] && changes["active"].newValue;
      if (newActive && newActive in newNotes) {
        state.active = newActive;
        return;
      }

      if (!state.active) {
        return;
      }

      // Edited note content
      if (
        (state.active in oldNotes) &&
        (state.active in newNotes) &&
        (newNotes[state.active].content !== oldNotes[state.active].content) &&
        (localStorage.getItem("notesChangedBy") !== tabId)
      ) {
        const newActive = state.active;
        state.active = newActive;
        return;
      }

      // Unchanged note
      if (state.active in newNotes) {
        return;
      }

      // Deleted note
      const oldSet = new Set(Object.keys(oldNotes));
      const newSet = new Set(Object.keys(newNotes));
      if (oldSet.size > newSet.size) {
        state.active = "Clipboard";
        return;
      }

      // Renamed note
      if (newSet.size === oldSet.size) {
        const diff = new Set([...newSet].filter(x => !oldSet.has(x)));
        if (diff.size === 1) {
          const newActive = diff.values().next().value;
          state.active = newActive;
        }
      }
    }
  }

  if (areaName === "sync") {
    if (changes["selection"]) {
      const selection = changes["selection"].newValue;
      if (!selection) { return; }
      chrome.storage.local.get(["id"], local => {
        if (selection.sender === local.id) { return; }
        const notes = { ...state.notes };
        if ("Clipboard" in notes) {
          notes["Clipboard"].content = selection.text + notes["Clipboard"].content;
          chrome.storage.local.set({ notes: notes });
        }
      });
    }
  }
});

// Notes are saved every 1 second by "saveNotesDebounce()"
// When the window is closed sooner, save the notes immediately, if changed
window.addEventListener("beforeunload", () => {
  // Save the most recent version of notes (notes are synchronized across Tabs)
  saveNotes(state.notes, syncNotes); // syncNotes without "force" => syncs notes only if changed
});
