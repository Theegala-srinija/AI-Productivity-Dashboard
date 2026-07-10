import { $, dateLabel } from "./utils.js";

export function clock() {
  function tick() {
    const now = new Date();

    $("#liveClock").textContent = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });

    $("#liveDate").textContent = dateLabel(now);

    const hour = now.getHours();

    $("#greeting").textContent =
      `${hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"}, Srini`;
  }

  tick();
  setInterval(tick, 1000);
}

export function pomodoro(state, persist) {
  let seconds = 1500;
  let running = false;
  let mode = "focus";
  let interval;

  function render() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    $("#timerDisplay").textContent =
      `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

    const fullDuration = mode === "focus" ? 1500 : 300;

    $("#timerProgress").style.strokeDashoffset =
      327 * (1 - seconds / fullDuration);

    $("#timerStatus").textContent = running
      ? mode === "focus"
        ? "Deep work in progress"
        : "Take a breather"
      : "Ready to focus";

    $("#timerStart").textContent = running
      ? "Pause"
      : `Start ${mode}`;
  }

  function stopTimer() {
    clearInterval(interval);
    running = false;
    render();
  }

  $("#timerStart").onclick = () => {
    if (running) {
      stopTimer();
      return;
    }

    running = true;
    render();

    interval = setInterval(() => {
      seconds--;

      if (seconds <= 0) {
        stopTimer();

        if (mode === "focus") {
          state.focusMinutes += 25;
          persist();

          $("#focusStat").textContent =
            `${Math.floor(state.focusMinutes / 60)}h ${state.focusMinutes % 60}m`;
        }

        seconds = mode === "focus" ? 1500 : 300;
        window.showToast("Session complete!");
      }

      render();
    }, 1000);
  };

  $("#timerMode").onclick = () => {
    stopTimer();

    mode = mode === "focus" ? "break" : "focus";
    seconds = mode === "focus" ? 1500 : 300;

    $("#timerMode").textContent =
      mode === "focus" ? "Break" : "Focus";

    render();
  };

  $("#resetTimer").onclick = () => {
    stopTimer();
    seconds = mode === "focus" ? 1500 : 300;
    render();
  };

  render();
}