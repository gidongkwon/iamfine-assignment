class ChartView extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('chart-view-template');
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content);
  }
}

customElements.define('chart-view', ChartView);