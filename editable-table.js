class EditableTable extends HTMLElement {
  /**
   * @type {Map<number, number>}
   */
  _dirtyIdToValue = new Map();

  connectedCallback() {
    const template = document.querySelector("#editable-table-template");
    this.appendChild(template.content);

    this.tableBody = this.querySelector("tbody");
    this.rowTemplate = this.querySelector("#row-template");
  }

  /**
   * 특정 인덱스 위치에 새 행을 만듭니다.
   * @param {{ id: number, value: number }} pair
   * @param {number} index 추가할 위치. -1 등 올바르지 않은 인덱스인 경우 마지막에 추가합니다.
   */
  addRow(pair, index) {
    const rowClone = document.importNode(this.rowTemplate.content, true);
    const tr = rowClone.querySelector("tr");
    tr.setAttribute("data-id", pair.id);

    const td = rowClone.querySelectorAll("td");
    td[0].textContent = pair.id;
    const input = td[1].querySelector("input");
    input.value = pair.value;
    input.addEventListener("change", (e) => {
      this._dirtyIdToValue.set(pair.id, e.target.valueAsNumber);
    });
    td[2].querySelector("button").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("delete-clicked", {
          detail: {
            id: Number(td[0].textContent),
          },
        })
      );
    });

    const elementToPrepend = this.tableBody.querySelector(
      `tr:nth-child(${index})`
    );

    if (elementToPrepend == null) {
      this.tableBody.appendChild(tr);
    } else {
      this.tableBody.insertBefore(tr, elementToPrepend);
    }
  }

  removeRow(id) {
    const trToRemove = this.querySelector(`tbody tr[data-id="${id}"]`);
    this.tableBody.removeChild(trToRemove);
  }

  clear() {
    this.tableBody.innerHTML = "";
  }

  getDirtyRowsAsPair(cleanup) {
    const pairs = [...this._dirtyIdToValue.entries()].map((v) => ({
      id: v[0],
      value: v[1],
    }));

    if (cleanup) {
      this._dirtyIdToValue.clear();
    }

    return pairs;
  }
}

customElements.define("editable-table", EditableTable);
