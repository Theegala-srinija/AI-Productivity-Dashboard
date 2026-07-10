import { $, uid, toast } from "./utils.js";

export function renderHabits(state, persist) {
  const list = $("#habitList");

  list.innerHTML = state.habits
    .map(
      (habit) => `
        <div class="habit-row ${habit.done ? "complete" : ""}"
             data-id="${habit.id}">
          <button class="habit-toggle">
            ${habit.done ? "✓" : ""}
          </button>

          <div>
            <strong>${habit.name}</strong>
            <small>${habit.detail}</small>
          </div>

          <div class="mini-progress">
            <span style="width: ${habit.done ? 100 : habit.progress}%"></span>
          </div>
        </div>
      `
    )
    .join("");

  const streak = state.habits.filter((habit) => habit.done).length * 3;

  $("#habitStreak").textContent = streak;
  $("#streakStat").innerHTML = `${streak} <em>days</em>`;

  list.onclick = (event) => {
    const row = event.target.closest(".habit-row");

    if (!row) return;

    const habit = state.habits.find(
      (entry) => entry.id === Number(row.dataset.id)
    );

    habit.done = !habit.done;

    persist();
    renderHabits(state, persist);

    toast(habit.done ? "Habit complete — lovely work!" : "Habit reopened");
  };
}

export function addHabit(state, values, persist) {
  state.habits.push({
    id: uid(),
    name: values.name,
    detail: "Daily goal",
    progress: 0,
    done: false
  });

  persist();
  toast("Habit added");
}