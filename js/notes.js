import { $, uid, toast } from "./utils.js";

export function renderNotes(state, persist) {
  const list = $("#notesList");

  list.innerHTML = state.notes
    .map(
      (note) => `
        <article class="note" data-id="${note.id}">
          <strong>${note.title}</strong>
          <p>${note.content}</p>
        </article>
      `
    )
    .join("");

  list.onclick = (event) => {
    const noteElement = event.target.closest(".note");

    if (!noteElement) return;

    const note = state.notes.find(
      (entry) => entry.id === Number(noteElement.dataset.id)
    );

    openNote(state, note, persist);
  };
}

export function openNote(state, note, persist) {
  window.openFlowModal(
    "Edit note",
    `
      <div class="field">
        <label>TITLE</label>
        <input name="title" required value="${note?.title || ""}" />
      </div>

      <div class="field">
        <label>YOUR NOTE</label>
        <textarea name="content" required>${note?.content || ""}</textarea>
      </div>
    `,
    (values) => {
      if (note) {
        note.title = values.title;
        note.content = values.content;
      } else {
        state.notes.unshift({
          id: uid(),
          ...values
        });
      }

      persist();
      renderNotes(state, persist);
      toast("Note saved");
    }
  );
}