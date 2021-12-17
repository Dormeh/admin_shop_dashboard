import ProductForm from '../../../components/product-form/index.js';

export default class Page {
  element;
  subElements = {};
  components = {};

  constructor(match) {
    this.match = match;
  }

  async initComponents () {
    const [, productId] = this.match;
    const productForm = new ProductForm(productId);
    await productForm.render();
    this.components.productForm = productForm;
  }

  get template () {
    return `
    <div class="products-edit">
      <div class="content__top-panel">
        <h1 class="page-title">
          <a href="/products" class="link">Товары</a> / Добавить
        </h1>
      </div>
      <div class="content-box">
        <div data-element="productForm">
          <!-- product-form component -->
        </div>
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

    return this.element;
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
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
