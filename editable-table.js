class EditableTable extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('editable-table-template');
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content);
  }
}

customElements.define('editable-table', EditableTable);