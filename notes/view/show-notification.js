/* global chrome, document */

import {
  pageHome as home,
  pageNote as note,
  newVersionNotificationTemplate
} from "./elements.js";

const attachClose = (notificationElem) => {
  const close = notificationElem.getElementsByClassName("close")[0];
  close.addEventListener("click", (event) => {
    event.preventDefault();
    chrome.storage.local.remove("notification", () => {
      document.querySelectorAll(".notification").forEach(el => el.remove());
    });
  });
};

const show = (root, notificationElem) => {
  root.prepend(notificationElem);
};

export default function showNotification(notification) {
  if (!notification) {
    return;
  }

  if (notification.type === "NEW_VERSION") {
    [home, note].forEach(root => {
      const node = newVersionNotificationTemplate.content.cloneNode(true);
      const notificationElem = node.children[0];

      const version = notificationElem.getElementsByClassName("version")[0];
      version.innerText = notification.version;

      attachClose(notificationElem);
      show(root, notificationElem);
    });
  }
}
