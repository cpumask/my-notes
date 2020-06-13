/* global window, document, setTimeout */

import { sidebar, drag, pageNote as note, sidebarToggle } from "./view/elements.js";

let m_pos;
function resize(e){
  const dx = (m_pos - e.x) * -1;
  m_pos = e.x;

  const half = window.innerWidth / 2;
  if (m_pos > half) {
    document.body.classList.add("resizing-sidebar-locked");
    return;
  }

  document.body.classList.remove("resizing-sidebar-locked");

  const sidebarWidth = parseInt(window.getComputedStyle(sidebar).width) + dx;
  sidebar.style.width = sidebarWidth + "px";
  note.style.left = sidebarWidth + "px";
}

const register = (state) => {
  drag.addEventListener("mousedown", (e) => {
    m_pos = e.x;
    document.body.classList.add("resizing-sidebar");
    note.classList.add("resizing");
    sidebar.style.minWidth = "";
    document.addEventListener("mousemove", resize);
  });

  drag.addEventListener("dblclick", () => {
    note.classList.add("resizing");
    sidebar.style.width = "";
    sidebar.style.minWidth = "";
    note.style.left = "";
    setTimeout(() => {
      note.classList.remove("resizing");
    });
  });

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", resize);
    document.body.classList.remove("resizing-sidebar", "resizing-sidebar-locked");
    note.classList.remove("resizing");
    if (sidebar.style.width) {
      sidebar.style.minWidth = sidebar.style.width;
    }
  });

  sidebarToggle.addEventListener("click", () => {
    if (state.active) {
      document.body.classList.toggle("with-sidebar");
    }
  });
};

export default { register };
