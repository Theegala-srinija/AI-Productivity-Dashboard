import { $, uid, toast } from "./utils.js";

export function renderTasks(state, persist) {
  const list = $("#taskList");

  list.innerHTML = state.tasks
    .map(
      (task) => `
        <div class="task-item ${task.done ? "done" : ""}"
             draggable="true"
             data-id="${task.id}">
          <button class="check" data-action="toggle">
            ${task.done ? "✓" : ""}
          </button>

          <span class="task-name">${task.title}</span>

          <span class="task-tag tag-${task.tag.toLowerCase()}">
            ${task.tag}
          </span>

          <button class="delete-task"
                  data-action="delete"
                  aria-label="Delete task">
            ×
          </button>
        </div>
      `
    )
    .join("");

  const completed = state.tasks.filter((task) => task.done).length;
  const total = Math.max(state.tasks.length, 1);

  $("#taskCount").textContent = state.tasks.length;
  $("#doneStat").innerHTML = `${completed} <em>/ ${total}</em>`;
  $("#taskProgress").style.width = `${(completed / total) * 100}%`;

  let draggedItem;

  list.querySelectorAll(".task-item").forEach((item) => {
    item.addEventListener("dragstart", () => {
      draggedItem = item;
      item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });

    item.addEventListener("dragover", (event) => {
      event.preventDefault();

      if (item !== draggedItem) {
        list.insertBefore(draggedItem, item);
      }
    });
  });

  list.onclick = (event) => {
    const item = event.target.closest(".task-item");

    if (!item) return;

    const id = Number(item.dataset.id);
    const task = state.tasks.find((entry) => entry.id === id);

    if (event.target.closest('[data-action="toggle"]')) {
      task.done = !task.done;
      persist();
      renderTasks(state, persist);
    }

    if (event.target.closest('[data-action="delete"]')) {
      state.tasks = state.tasks.filter((entry) => entry.id !== id);
      persist();
      renderTasks(state, persist);
      toast("Task deleted");
    }
  };

  list.addEventListener("drop", () => {
    state.tasks = [...list.children].map((element) =>
      state.tasks.find((task) => task.id === Number(element.dataset.id))
    );

    persist();
    toast("Task order saved");
  });
}

export function addTask(state, values, persist) {
  state.tasks.unshift({
    id: uid(),
    title: values.title,
    tag: values.tag,
    done: false
  });

  persist();
  toast("Task added to your priorities");
}