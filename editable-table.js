class EditableTable extends HTMLElement {
  connectedCallback() {
    const template = document.querySelector("#editable-table-template");
    this.appendChild(template.content);

    this.tableBody = this.querySelector("tbody");
    this.rowTemplate = this.querySelector("#row-template");
  }

  addRow(pair) {
    const rowClone = document.importNode(this.rowTemplate.content, true);
    const tr = rowClone.querySelector("tr");
    tr.setAttribute("data-id", pair.id);

    const td = rowClone.querySelectorAll("td");
    td[0].textContent = pair.id;
    td[1].querySelector("input").value = pair.value;
    td[2].querySelector("button").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("delete-clicked", {
          detail: {
            id: Number(td[0].textContent),
          },
        })
      );
    });

    this.tableBody.appendChild(rowClone);
  }

  removeRow(id) {
    const trToRemove = this.querySelector(`tbody tr[data-id="${id}"]`);
    this.tableBody.removeChild(trToRemove);
  }
}

customElements.define("editable-table", EditableTable);
