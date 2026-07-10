import { $ } from "./utils.js";

export function initTheme(state, persist) {
  function applyTheme() {
    document.body.classList.toggle("dark", state.theme === "dark");

    $("#themeToggle").textContent =
      state.theme === "dark" ? "☀" : "☾";
  }

  applyTheme();

  $("#themeToggle").onclick = () => {
    state.theme = state.theme === "dark" ? "light" : "dark";

    persist();
    applyTheme();
  };
}