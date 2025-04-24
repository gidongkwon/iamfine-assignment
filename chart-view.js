class ChartView extends HTMLElement {
  connectedCallback() {
    const template = document.getElementById("chart-view-template");
    this.appendChild(template.content);
  }
}

customElements.define("chart-view", ChartView);
