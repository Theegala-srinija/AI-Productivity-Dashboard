import { $, uid, currency, toast } from "./utils.js";

export function renderExpenses(state, persist) {
  const total = state.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  $("#expenseTotal").textContent = currency(total);
  $("#spendStat").textContent = currency(total);

  const list = $("#expenseList");

  list.innerHTML = state.expenses
    .slice(0, 3)
    .map(
      (expense) => `
        <div class="expense-row" data-id="${expense.id}">
          <span class="expense-icon">${expense.icon}</span>

          <span>
            <strong>${expense.title}</strong>
            <small>${expense.category}</small>
          </span>

          <b>${currency(expense.amount)}</b>

          <button aria-label="Delete expense">×</button>
        </div>
      `
    )
    .join("");

  list.onclick = (event) => {
    const row = event.target.closest(".expense-row");

    if (event.target.tagName !== "BUTTON" || !row) return;

    state.expenses = state.expenses.filter(
      (expense) => expense.id !== Number(row.dataset.id)
    );

    persist();
    renderExpenses(state, persist);
    toast("Expense removed");
  };
}

export function addExpense(state, values, persist) {
  state.expenses.unshift({
    id: uid(),
    title: values.title,
    category: values.category,
    amount: Number(values.amount),
    icon: "◉"
  });

  persist();
  renderExpenses(state, persist);
  toast("Expense added");
}