const store = new Store();
const addButton = document.querySelector("#add-button");
const idInput = document.querySelector("#id-input");
const valueInput = document.querySelector("#value-input");

const editableTable = document.querySelector("#main-table");
const jsonTextArea = document.querySelector("#json-textarea");

store.addEventListener("added", (e) => {
  editableTable.addRow(e.detail);
  jsonTextArea.value = store.getAsJSON();
});

store.addEventListener("removed", (e) => {
  editableTable.removeRow(e.detail.id);
  jsonTextArea.value = store.getAsJSON();
});

editableTable.addEventListener("delete-clicked", (e) => {
  store.removePair(e.detail.id);
});

addButton.addEventListener("click", () => {
  store.addPair(idInput.valueAsNumber, valueInput.valueAsNumber);
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
