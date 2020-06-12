/* global document */

/* See notes.html */

const _get = ID => document.getElementById(ID);

const googleFonts = _get("google-fonts");

// Pages
const pageHome = _get("page-home");
const pageNote = _get("page-note");

// Home
const existingNotes = _get("existing-notes");
const createNote = _get("create-note");
const openOptions = _get("open-options");
const syncContainer = _get("sync-container");
const syncNow = _get("sync-now");
const lastSync = _get("last-sync");
const openInGoogleDrive = _get("open-in-google-drive");

// Note
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

  // Home
  existingNotes,
  createNote,
  openOptions,
  syncContainer,
  syncNow,
  lastSync,
  openInGoogleDrive,

  // Note
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
