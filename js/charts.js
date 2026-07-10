import { $ } from "./utils.js";

export function renderChart() {
  const focusValues = [55, 73, 46, 85, 68, 33, 50];

  $("#focusChart").innerHTML = focusValues
    .map(
      (value, index) => `
        <span
          class="bar ${index === 4 ? "today" : ""}"
          style="--height: ${value}%"
        ></span>
      `
    )
    .join("");
}