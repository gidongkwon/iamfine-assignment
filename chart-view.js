class ChartView extends HTMLElement {
  Y_AXIS_UNIT = 100;
  Y_AXIS_TICKS = 5;
  connectedCallback() {
    const template = document.getElementById("chart-view-template");
    this.appendChild(template.content);

    this.emptyMessageGroup = this.querySelector(".empty");
    this.chartGroup = this.querySelector(".chart");

    this.barContainer = this.querySelector(".bars");
    this.xAxis = this.querySelector(".x-axis");
    this.yAxis = this.querySelector(".y-axis");

    this.xTickTemplate = this.querySelector("#x-tick-template");
    this.yTickTemplate = this.querySelector("#y-tick-template");
    this.barTemplate = this.querySelector("#bar-template");
  }

  /**
   * 그래프를 다시 그립니다.
   * @param {{ id: number, value: number }[]} pairs
   */
  update(pairs) {
    if (pairs.length === 0) {
      this.chartGroup.setAttribute("hidden", "hidden");
      this.emptyMessageGroup.removeAttribute("hidden");
    } else {
      this.chartGroup.removeAttribute("hidden");
      this.emptyMessageGroup.setAttribute("hidden", "hidden");

      const ids = [...pairs.map((x) => x.id)];
      const values = [...pairs.map((x) => x.value)];
      const sortedValues = [...pairs.map((x) => x.value)].sort((a, b) => a - b);
      const maxValue = sortedValues.at(-1);
      const clampedMax =
        Math.ceil(maxValue / this.Y_AXIS_UNIT) * this.Y_AXIS_UNIT;
      this.drawXAxis(ids);
      this.drawYAxis(clampedMax);
      this.drawBars(values, clampedMax);
    }
  }

  drawXAxis(ticks) {
    this.xAxis.innerHTML = "";
    for (const tick of ticks) {
      const clonedTemplate = document.importNode(
        this.xTickTemplate.content,
        true
      );
      const tickSpan = clonedTemplate.querySelector("div span");
      tickSpan.textContent = tick;

      this.xAxis.appendChild(clonedTemplate);
    }
  }

  drawYAxis(maxValue) {
    this.yAxis.innerHTML = "";
    const tickDelta = maxValue / this.Y_AXIS_TICKS;
    for (let i = 0; i <= maxValue; i += tickDelta) {
      const clonedTemplate = document.importNode(
        this.yTickTemplate.content,
        true
      );
      const tickElement = clonedTemplate.querySelector(".y-tick");
      tickElement.style.top = `${100 - (i / maxValue) * 100}%`;

      const tickSpan = clonedTemplate.querySelector("span");
      tickSpan.textContent = i;

      this.yAxis.appendChild(clonedTemplate);
    }
  }

  drawBars(values, maxValue) {
    this.barContainer.innerHTML = "";
    for (const value of values) {
      const clonedTemplate = document.importNode(
        this.barTemplate.content,
        true
      );
      const barElement = clonedTemplate.querySelector("div");
      barElement.style.height = `${(value / maxValue) * 100}%`;

      const barSpan = clonedTemplate.querySelector("span");
      barSpan.textContent = value;

      this.barContainer.appendChild(clonedTemplate);
    }
  }
}

customElements.define("chart-view", ChartView);
