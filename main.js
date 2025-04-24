const store = new Store();
const addButton = document.querySelector('#add-button');
const idInput = document.querySelector('#id-input');
const valueInput = document.querySelector('#value-input');

const editableTable = document.querySelector('#main-table');

store.addEventListener('added', (e) => {
  editableTable.addRow(e.detail);
})

addButton.addEventListener('click', () => {
  store.addPair(idInput.value, valueInput.value);
});
