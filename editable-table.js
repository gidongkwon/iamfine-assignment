class EditableTable extends HTMLElement {
  constructor() {
    super();

    const template = document.querySelector('#editable-table-template');
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content);

    this.tableBody = this.shadowRoot.querySelector('tbody');
    this.rowTemplate = this.shadowRoot.querySelector('#row-template');
  }

  addRow(pair) {
    const rowClone = document.importNode(this.rowTemplate.content, true);
    const td = rowClone.querySelectorAll('td');

    td[0].textContent = pair.id;
    td[1].querySelector('input').value = pair.value;

    this.tableBody.appendChild(rowClone);
  }
}

customElements.define('editable-table', EditableTable);