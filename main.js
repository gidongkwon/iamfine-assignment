const store = new Store();
const addButton = document.querySelector('#add-button');
const idInput = document.querySelector('#id-input');
const valueInput = document.querySelector('#value-input');

const editableTable = document.querySelector('#main-table');
const jsonTextArea = document.querySelector('#json-textarea');

store.addEventListener('added', (e) => {
  editableTable.addRow(e.detail);
  jsonTextArea.value = store.getAsJSON();
});

store.addEventListener('removed', (e) => {
  editableTable.removeRow(e.detail.id);
  jsonTextArea.value = store.getAsJSON();
});

editableTable.addEventListener('delete-clicked', (e) => {
  store.removePair(e.detail.id);
});

addButton.addEventListener('click', () => {
  store.addPair(idInput.valueAsNumber, valueInput.valueAsNumber);
});
