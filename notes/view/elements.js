/* global document */

/* See notes.html */

const _get = ID => document.getElementById(ID);

const googleFonts = _get("google-fonts");

// Pages
const pageHome = _get("page-home");
const pageNote = _get("page-note");

// Actions
const newNoteActions = document.querySelectorAll(".new-note.action");
const openOptionsActions = document.querySelectorAll(".open-options.action");

// Home
const existingNotes = _get("existing-notes");
const openOptions = _get("open-options");
const syncContainer = _get("sync-container");
const syncNow = _get("sync-now");
const lastSync = _get("last-sync");
const openInGoogleDrive = _get("open-in-google-drive");

// Note
const sidebar = _get("sidebar");
const sidebarNotes = _get("sidebar-notes");
const sidebarToggle = _get("sidebar-toggle");
const drag = _get("drag");
const panel = _get("panel");
const noteName = _get("note-name");
const noteOptions = _get("note-options");
const content = _get("content");
const toolbar = _get("toolbar");

// Templates
const noteTileTemplate = _get("note-tile-template");
const newVersionNotificationTemplate = _get("new-version-notification-template");
const modalTemplate = _get("modal-template");

export {
  googleFonts,

  // Pages
  pageHome,
  pageNote,

  // Actions
  newNoteActions,
  openOptionsActions,

  // Home
  existingNotes,
  openOptions,
  syncContainer,
  syncNow,
  lastSync,
  openInGoogleDrive,

  // Note
  sidebar,
  sidebarNotes,
  sidebarToggle,
  drag,
  panel,
  noteName,
  noteOptions,
  content,
  toolbar,

  // Templates
  noteTileTemplate,
  newVersionNotificationTemplate,
  modalTemplate,
};
