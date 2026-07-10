import { $ } from "./utils.js";

export function createCalendar() {
  let month = 6; // July
  let year = 2026;

  function draw() {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const calendar = $("#calendarDays");
    let html = "";

    for (let index = 0; index < 42; index++) {
      let day = index - firstDay + 1;
      let outside = "";

      if (day < 1) {
        day = daysInPreviousMonth + day;
        outside = "outside";
      } else if (day > daysInMonth) {
        day -= daysInMonth;
        outside = "outside";
      }

      const isToday =
        year === 2026 && month === 6 && day === 10 ? "today" : "";

      const hasEvent =
        [10, 14, 19, 24].includes(day) && !outside ? "has-event" : "";

      html += `
        <button class="${outside} ${isToday} ${hasEvent}">
          ${day}
        </button>
      `;
    }

    calendar.innerHTML = html;

    document.querySelector(".calendar-panel .eyebrow").textContent =
      new Date(year, month).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      }).toUpperCase();
  }

  $("#prevMonth").onclick = () => {
    month--;

    if (month < 0) {
      month = 11;
      year--;
    }

    draw();
  };

  $("#nextMonth").onclick = () => {
    month++;

    if (month > 11) {
      month = 0;
      year++;
    }

    draw();
  };

  draw();
}