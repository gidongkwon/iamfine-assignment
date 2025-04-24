/**
 * Store는 차트 데이터를 담기 위한 클래스입니다.
 * Pair(id-data 페어)에 변경이 있을 때 마다 이벤트를 발생시킵니다.
 * 
 * 이벤트 목록
 * - added: 추가된 Row를 담고 있습니다.
 * - removed: 삭제된 Row를 담고 있습니다.
 */
class Store extends EventTarget {
  data = [];

  constructor() {
    super();
  }

  addPair(id, value) {
    if (typeof id !== "number") {
      console.error("id는 숫자여야 합니다.");
      return;
    }
    if (typeof value !== "number") {
      console.error("value는 숫자여야 합니다.");
      return;
    }
    this.data.push({ id, value });

    this.dispatchEvent(new CustomEvent('added', {
      detail: { id, value }
    }));
  }
}
