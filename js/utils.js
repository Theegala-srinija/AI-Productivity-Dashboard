export const $ = (selector, element = document) =>
  element.querySelector(selector);

export const $$ = (selector, element = document) =>
  [...element.querySelectorAll(selector)];

export const uid = () => Date.now();

export const currency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);

export function toast(message) {
  const element = $("#toast");

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    element.classList.remove("show");
  }, 2600);
}

export function dateLabel(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
}