import SortableTable from '../../../components/sortable-table/index.js';
import SortPanel from '../../../components/sort-panel/index.js';
import header from './products-header.js';
import fetchJson from '../../../utils/fetch-json.js';

const BACKEND_URL = process.env.BACKEND_URL;
const PRODUCTS_URL = "api/rest/products";

export default class Page {
  element;
  subElements = {};
  components = {};
  sliderOriginalFrom = 0;
  sliderOriginalTo = 4000;
  sliderFrom = this.sliderOriginalFrom;
  sliderTo = this.sliderOriginalTo;

  filterProducts = async (event) => {
    const { type, detail } = event;

    if (type === "range-select") {
      const { from, to } = detail;
      this.sliderFrom = from;
      this.sliderTo = to;
    }
    
    // reset these values each time a filter is added or changed
    // in order to load data with filter each time from the beginning
    this.components.sortableTable.start = 1;
    this.components.sortableTable.end = 1 + this.components.sortableTable.step;
    
    const { sorted, start, end, element: sortableTableElem } = this.components.sortableTable;
    const { id, order } = sorted;
    
    sortableTableElem.classList.add("sortable-table_loading");
    
    const { subElements } = this.components.sortPanel;
    const { filterName, filterStatus } = subElements;
    const { value: filterNameValue } = filterName;
    const { value: filterStatusValue } = filterStatus;

    const url = new URL(PRODUCTS_URL, BACKEND_URL);

    url.searchParams.set("price_gte", this.sliderFrom);
    url.searchParams.set("price_lte", this.sliderTo);

    if (filterNameValue) {
      url.searchParams.set("title_like", filterNameValue);
    }

    if (filterStatusValue) {
      url.searchParams.set("status", filterStatusValue);
    }

    url.searchParams.set('_sort', id);
    url.searchParams.set('_order', order);
    url.searchParams.set('_start', start);
    url.searchParams.set('_end', end);
    
    //preserve this for server side sorting and for onscroll loading
    this.components.sortableTable.filtered = {
      "price_gte": this.sliderFrom,
      "price_lte": this.sliderTo,
      "title_like": filterNameValue,
      "status": filterStatusValue
    }

    const data = await fetchJson(url);
    this.components.sortableTable.addRows(data);

    sortableTableElem.classList.remove("sortable-table_loading");
  }

  resetFilters = (event) => {
    event.preventDefault();

    const { subElements, components } = this.components.sortPanel;
    const { filterName, filterStatus } = subElements;
    const { doubleSlider } = components;

    filterName.value = "";
    filterStatus.value = "";
    this.sliderFrom = this.sliderOriginalFrom;
    this.sliderTo = this.sliderOriginalTo;
    
    doubleSlider.reset();

    this.filterProducts(event);
  }

  async initComponents () {
    const to = new Date();
    const from = new Date(to.getTime() - (30 * 24 * 60 * 60 * 1000));

    const sortPanel = new SortPanel({
      sliderMin: this.sliderFrom,
      sliderMax: this.sliderTo
    });

    const sortableTable = new SortableTable(header, {
      url: `api/rest/products?_embed=subcategory.category&_sort=title&_order=asc&_start=0&_end=30`
    });

    this.components.sortPanel = sortPanel;
    this.components.sortableTable = sortableTable;
  }

  get template () {
    return `
    <div class="products-list">
      <div class="content__top-panel">
        <h1 class="page-title">Товары</h1>
        <a href="/products/add" class="button-primary">Добавить товар</a>
      </div>
      <div data-element="sortPanel">
        <!-- sort-panel component -->
      </div>
      <div data-element="sortableTable">
        <!-- sortable-table component -->
      </div>
    </div>`;
  }

  async render () {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    await this.initComponents();

    this.renderComponents();

    this.modifyEmptyPlaceholder();

    this.initEventListeners();

    return this.element;
  }

  initEventListeners() {
    const { subElements } = this.components.sortPanel;
    const { filterName, filterStatus } = subElements;
    const resetFiltersButton = this.element.querySelector(".button-primary-outline");

    for (const element of [filterName, filterStatus]) {
      element.addEventListener("input", this.filterProducts);
    }

    resetFiltersButton.addEventListener("click", this.resetFilters);

    this.element.addEventListener("range-select", this.filterProducts);
  }

  removeEventListeners() {
    const { subElements } = this.components.sortPanel;
    const { filterName, filterStatus } = subElements;
    const resetFiltersButton = this.element.querySelector(".button-primary-outline");

    for (const element of [filterName, filterStatus]) {
      element.removeEventListener("input", this.filterProducts);
    }

    resetFiltersButton.removeEventListener("click", this.resetFilters);

    this.element.removeEventListener("range-select", this.filterProducts);
  }

  modifyEmptyPlaceholder() {
    const { subElements } = this.components.sortableTable;
    const { emptyPlaceholder } = subElements;
    emptyPlaceholder.innerHTML = `
      <div>
        <p>Не найдено товаров удовлетворяющих выбранному критерию</p>
        <button type="button" class="button-primary-outline">Очистить фильтры</button>
      </div>
    `;
  }

  renderComponents () {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      root.append(element);
    });
  }

  getSubElements ($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  destroy () {
    this.removeEventListeners(); 
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
