const KEY = "flowstate-data-v1";

const defaults = {
  theme: "light",
  focusMinutes: 0,

  tasks: [
    { id: 1, title: "Finish project proposal", tag: "Work", done: false },
    { id: 2, title: "30-minute deep work session", tag: "Work", done: true },
    { id: 3, title: "Reply to important emails", tag: "Personal", done: false },
    { id: 4, title: "Evening walk", tag: "Health", done: false }
  ],

  habits: [
    {
      id: 1,
      name: "Drink water",
      detail: "6 of 8 glasses",
      progress: 75,
      done: false
    },
    {
      id: 2,
      name: "Read for 20 minutes",
      detail: "Daily goal",
      progress: 100,
      done: true
    },
    {
      id: 3,
      name: "Move my body",
      detail: "15 min left",
      progress: 60,
      done: false
    }
  ],

  notes: [
    {
      id: 1,
      title: "Project ideas",
      content: "Explore a simpler onboarding flow for the dashboard."
    },
    {
      id: 2,
      title: "Remember",
      content: "Book a dentist appointment next week."
    },
    {
      id: 3,
      title: "Learning list",
      content: "Read about animation timelines and keyboard accessibility."
    }
  ],

  expenses: [
    {
      id: 1,
      title: "Coffee & breakfast",
      category: "Food",
      amount: 240,
      icon: "☕"
    },
    {
      id: 2,
      title: "Design toolkit",
      category: "Software",
      amount: 799,
      icon: "✦"
    },
    {
      id: 3,
      title: "Metro card",
      category: "Transport",
      amount: 180,
      icon: "◉"
    }
  ]
};

export function load() {
  try {
    const savedData = JSON.parse(localStorage.getItem(KEY));
    return { ...defaults, ...savedData };
  } catch {
    return structuredClone(defaults);
  }
}

export function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}