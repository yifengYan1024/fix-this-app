export default class NotesView {
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    console.log(root, 888);
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
          <div class="notes__sidebar">
              <button class="notes__add" type="button">添加新的笔记 📒</button>
              <div class="notes__list"></div>
          </div>
          <div class="notes__preview">
              <div class="notes__preview-save">Save</div>
              <input class="notes__title" type="text" placeholder="新笔记...">
              <textarea class="notes__body">编辑笔记...</textarea>
          </div>
      `;

    const btnAddNote = this.root.querySelector(".notes__add");
    const inpTitle = this.root.querySelector(".notes__title");
    const inpBody = this.root.querySelector(".notes__body");
    const btnSave = this.root.querySelector(".notes__preview-save");

    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inpTitle, inpBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();

        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });
    btnSave.addEventListener("click", () => {
      const updatedTitle = inpTitle.value.trim();
      const updatedBody = inpBody.value.trim();
      this.onNoteEdit(updatedTitle, updatedBody);
    });

    this.updateNotePreviewVisibility(false);
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `
          <div class="notes__list-item" data-note-id="${id}">
              <div class="notes__small-title">${title}</div>
              <div class="notes__small-body">
                  ${body.substring(0, MAX_BODY_LENGTH)}
                  ${body.length > MAX_BODY_LENGTH ? "..." : ""}
              </div>
              <div class="notes__small-updated">
                  ${updated.toLocaleString(undefined, {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
              </div>
              <div class="notes__del-btn"> × </div>
          </div>
      `;
  }

  updateNoteList(notes) {
    console.log(notes);
    const notesListContainer = this.root.querySelector(".notes__list");

    // Empty list
    notesListContainer.innerHTML = "";

    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    // Add select/delete events for each list item
    notesListContainer
      .querySelectorAll(".notes__list-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });

        noteListItem.addEventListener("dblclick", () => {
          const doDelete = confirm("确认要删除该笔记吗?");

          if (doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
      notesListContainer
      .querySelectorAll(".notes__del-btn").forEach((btnItem) => {
        btnItem.addEventListener("click", () => {
          const doDelete = confirm("确认要删除该笔记吗?");
          if (doDelete) {
            console.log(btnItem.parentNode.dataset.noteId);
            this.onNoteDelete(btnItem.parentNode.dataset.noteId);
          }
        });
      })
  }

  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    this.root.querySelectorAll(".notes__list-item").forEach((noteListItem) => {
      noteListItem.classList.remove("notes__list-item--selected");
    });

    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
