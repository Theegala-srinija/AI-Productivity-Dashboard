import { $, $$, toast } from "./utils.js";
import { load, save } from "./storage.js";
import { renderTasks, addTask } from "./todo.js";
import { renderHabits, addHabit } from "./habit.js";
import { renderNotes, openNote } from "./notes.js";
import { renderExpenses, addExpense } from "./expense.js";
import { createCalendar } from "./calendar.js";
import { renderChart } from "./charts.js";
import { updateWeather } from "./weather.js";
import { initTheme } from "./theme.js";
import { clock, pomodoro } from "./dashboard.js";

const state = load();
const persist = () => save(state);

window.showToast = toast;

function modal(title, fields, onSave) {
  const dialog = $("#formModal");
  const form = $("#modalForm");

  $("#modalTitle").textContent = title;
  $("#modalFields").innerHTML = fields;

  form.onsubmit = (event) => {
    event.preventDefault();

    const values = Object.fromEntries(new FormData(form));

    onSave(values);
    dialog.close();
  };

  $$(".modal-cancel", dialog).forEach((button) => {
    button.onclick = () => dialog.close();
  });

  dialog.showModal();
}

window.openFlowModal = modal;

function render() {
  renderTasks(state, persist);
  renderHabits(state, persist);
  renderNotes(state, persist);
  renderExpenses(state, persist);

  $("#focusStat").textContent =
    `${Math.floor(state.focusMinutes / 60)}h ${String(
      state.focusMinutes % 60
    ).padStart(2, "0")}m`;
}

function initActions() {
  const taskFields = `
    <div class="field">
      <label>TASK NAME</label>
      <input name="title" required placeholder="What needs doing?" />
    </div>

    <div class="field">
      <label>CATEGORY</label>
      <select name="tag">
        <option>Work</option>
        <option>Personal</option>
        <option>Health</option>
      </select>
    </div>
  `;

  const openTaskModal = () => {
    modal("Add a task", taskFields, (values) => {
      addTask(state, values, persist);
      renderTasks(state, persist);
    });
  };

  $("#addTask").onclick = openTaskModal;
  $("#addTaskTop").onclick = openTaskModal;

  $("#clearDone").onclick = () => {
    state.tasks = state.tasks.filter((task) => !task.done);

    persist();
    renderTasks(state, persist);
    toast("Completed tasks cleared");
  };

  $("#addHabit").onclick = () => {
    modal(
      "Create a habit",
      `
        <div class="field">
          <label>HABIT NAME</label>
          <input name="name" required placeholder="e.g. Morning journal" />
        </div>
      `,
      (values) => {
        addHabit(state, values, persist);
        renderHabits(state, persist);
      }
    );
  };

  $("#newNote").onclick = () => openNote(state, null, persist);

  $("#addExpense").onclick = () => {
    modal(
      "Add an expense",
      `
        <div class="field">
          <label>DESCRIPTION</label>
          <input name="title" required />
        </div>

        <div class="field">
          <label>CATEGORY</label>
          <input name="category" required placeholder="Food, software..." />
        </div>

        <div class="field">
          <label>AMOUNT (₹)</label>
          <input type="number" name="amount" min="1" required />
        </div>
      `,
      (values) => addExpense(state, values, persist)
    );
  };

  $("#refreshWeather").onclick = () => {
    toast("Refreshing weather…");
    updateWeather();
  };

  $("#focusMode").onclick = () => {
    document.body.classList.toggle("focus-active");

    toast(
      document.body.classList.contains("focus-active")
        ? "Focus mode on"
        : "Focus mode off"
    );
  };

  $("#menuButton").onclick = () => {
    $("#sidebar").classList.toggle("open");
  };

  $$(".nav-link").forEach((link) => {
    link.onclick = () => {
      $$(".nav-link").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      $("#sidebar").classList.remove("open");
    };
  });

  $("#globalSearch").oninput = (event) => {
    const query = event.target.value.toLowerCase();

    $$(".task-item, .note, .habit-row, .expense-row").forEach((item) => {
      item.style.display = item.textContent.toLowerCase().includes(query)
        ? ""
        : "none";
    });
  };

  $("#notificationButton").onclick = () => {
    toast("You have 3 lovely wins waiting for you.");
  };
}

initTheme(state, persist);
render();
createCalendar();
renderChart();
clock();
pomodoro(state, persist);
initActions();
updateWeather();