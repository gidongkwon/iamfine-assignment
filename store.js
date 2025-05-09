/**
 * Store는 차트 데이터를 담기 위한 클래스입니다.
 * Pair(id-data 페어)에 변경이 있을 때 마다 이벤트를 발생시킵니다.
 *
 * 이벤트 목록
 * - added: 추가된 Row를 담고 있습니다.
 * - removed: 삭제된 Row를 담고 있습니다.
 * - changed: 일부가 변경되었을 때 발생합니다. 바뀐 Row의 배열을 담고 있습니다.
 * - overwritten: 전체가 덮어씌워졌을 때 발생합니다. 전체 데이터를 담고 있습니다.
 */
class Store extends EventTarget {
  /**
   * @type {Map<number, number>}
   */
  _data = new Map();

  constructor() {
    super();
  }

  addEntry(id, value) {
    if (typeof id !== "number") {
      throw new TypeError("id는 숫자여야 합니다.");
    }
    if (typeof value !== "number" || isNaN(value)) {
      throw new TypeError("value는 숫자여야 합니다.");
    }
    if (this._data.has(id)) {
      throw new Error("중복된 id입니다.");
    }
    this._data.set(id, value);

    this.dispatchEvent(
      new CustomEvent("added", {
        detail: { id, value },
      })
    );
  }

  removeEntry(id) {
    const removedValue = this._data.get(id);
    const isRemoved = this._data.delete(id);

    if (isRemoved) {
      this.dispatchEvent(
        new CustomEvent("removed", {
          detail: { id, value: removedValue },
        })
      );
    }
  }

  changeEntries(pairs) {
    this._validatePairs(pairs);

    for (const pair of pairs) {
      this._data.set(pair.id, pair.value);
    }

    this.dispatchEvent(
      new CustomEvent("changed", {
        detail: [...pairs],
      })
    );
  }

  getAsJSON() {
    return JSON.stringify(this.getAsPairs(), null, 2);
  }

  getAsPairs() {
    return [...this._data.entries()].map((v) => ({ id: v[0], value: v[1] }));
  }

  /**
   * @param {string} json 데이터 전체를 덮어쓸 json 문자열
   */
  setJSON(json) {
    const parsedPairs = JSON.parse(json);
    this._validatePairs(parsedPairs);
    this._data = new Map(parsedPairs.map((v) => [v.id, v.value]));
    this.dispatchEvent(
      new CustomEvent("overwritten", {
        detail: parsedPairs,
      })
    );
  }

  _validatePairs(pairs) {
    if (!Array.isArray(pairs)) {
      throw new TypeError("제공된 값이 배열 형식이 아닙니다.");
    }
    const isEveryElementValid = pairs.every((v) => {
      const isObject = typeof v === "object";
      const hasValidId = Object.hasOwn(v, "id") && typeof v.id === "number";
      const hasValidValue =
        Object.hasOwn(v, "value") && typeof v.value === "number";

      return isObject && hasValidId && hasValidValue;
    });
    if (!isEveryElementValid) {
      throw new TypeError(
        "배열 내부의 값은 { id: number, value: number } 형식이어야 합니다."
      );
    }
  }
}
