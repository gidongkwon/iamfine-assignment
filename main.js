const store = new Store();
const addButton = document.querySelector("#add-button");
const idInput = document.querySelector("#id-input");
const valueInput = document.querySelector("#value-input");

/**
 * @type {EditableTable}
 */
const editableTable = document.querySelector("#main-table");
/**
 * @type {ChartView}
 */
const chartView = document.querySelector("chart-view");
const jsonTextArea = document.querySelector("#json-textarea");

// 이벤트 리스너 연결
store.addEventListener("added", (e) => {
  editableTable.addRow(e.detail, -1);
  jsonTextArea.value = store.getAsJSON();
  chartView.update(store.getAsPairs());
});

store.addEventListener("removed", (e) => {
  editableTable.removeRow(e.detail.id);
  jsonTextArea.value = store.getAsJSON();
  chartView.update(store.getAsPairs());
});

store.addEventListener("changed", (e) => {
  jsonTextArea.value = store.getAsJSON();
  chartView.update(store.getAsPairs());
});

store.addEventListener("overwritten", (e) => {
  editableTable.clear();
  for (const pair of e.detail) {
    editableTable.addRow(pair, -1);
  }
  jsonTextArea.value = store.getAsJSON();
  chartView.update(e.detail);
});

editableTable.addEventListener("delete-clicked", (e) => {
  store.removeEntry(e.detail.id);
});

addButton.addEventListener("click", () => {
try {
  store.addEntry(idInput.valueAsNumber, valueInput.valueAsNumber);
idInput.value = "";
    valueInput.value = "";
  } catch (e) {
    alert(e.message);
  }
});

const textAreaApplyButton = document.querySelector("#panel-json .apply-button");
textAreaApplyButton.addEventListener("click", () => {
  try {
    store.setJSON(jsonTextArea.value);
  } catch (e) {
    alert(e.message);
  }
});
const tableApplyButton = document.querySelector("#panel-data .apply-button");
editableTable.addEventListener("row-changed", () => {
  tableApplyButton.removeAttribute("hidden");
});
tableApplyButton.addEventListener("click", () => {
  store.changeEntries(editableTable.getDirtyRowsAsPair(true));
tableApplyButton.setAttribute("hidden", "hidden");
});

// 탭 처리
const tabLists = document.querySelectorAll('[role="tablist"]');

for (const tabList of tabLists) {
  const tabs = tabList.querySelectorAll('[role="tab"]');
  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      // 이미 선택된 탭의 aria-selected를 false로
      tabList
        .querySelectorAll('[aria-selected="true"]')
        .forEach((t) => t.setAttribute("aria-selected", "false"));

      // 새로 선택한 탭의 aria-selected만 true로
      tab.setAttribute("aria-selected", "true");

      // 모든 탭 패널 숨기기
      document
        .querySelectorAll('[role="tabpanel"]')
        .forEach((t) => t.setAttribute("hidden", true));

      // 새로 선택한 탭 패널 표시
      document
        .querySelector(`#${tab.getAttribute("aria-controls")}`)
        .removeAttribute("hidden");
    });
  }
}
