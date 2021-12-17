import SortableList from '../../components/sortable-list/index.js';
import NotificationMessage from '../../components/notification/index.js';
import escapeHtml from '../../utils/escape-html.js';
import fetchJson from '../../utils/fetch-json.js';

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
const BACKEND_URL = process.env.BACKEND_URL;

export default class ProductForm {
  element; //html element
  inputElement; //html element
  productData = null;
  categories = null;

  onFormSubmit = (event) => {
    event.preventDefault();

    const {productForm, imageListContainer} = this.subElements;
    const formData = new FormData(productForm);
    const data = {};
    const payloadFields = [
      "title",
      "description",
      "subcategory",
      "price",
      "quantity",
      "discount",
      "status"
    ];
    const formatToNumber = ["price", "quantity", "discount", "status"];

    for (let [name, value] of formData) {
      if (payloadFields.includes(name)) {
        value = (formatToNumber.includes(name))
          ? parseInt(value, 10)
          : value;
        data[name] = value;
      }
    }

    if (this.productEditMode) {
      data.id = this.productId;
    }

    data.images = [];

    const imagesHTMLCollection = imageListContainer.querySelectorAll('.sortable-table__cell-img');

    for (const image of imagesHTMLCollection) {
      const {alt, src} = image;
      data.images.push({
        url: src,
        source: alt
      });
    }

    this.sendFormData(data);
  }

  async sendFormData(data) {
    const fetchUrl = this.getFetchUrl(this.productsUrl);

    const requestParams = {
      method: this.productId ? 'PATCH' : 'PUT',
      headers:             {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }

    await fetchJson(fetchUrl, requestParams);

    const customEventName = (this.productEditMode) ? "product-updated" : "product-saved";
    this.element.dispatchEvent(new CustomEvent(customEventName, {
      bubbles: true,
      detail: event
    }));

  }

  uploadImage = async () => {
    const [file] = this.inputElement.files;

    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const {lastElementChild: uploadImageButton} = this.subElements["sortable-list-container"];
    uploadImageButton.classList.add("is-loading");

    let response;

    try {

      response = await fetchJson('https://api.imgur.com/3/image', {
        method: 'POST',
        headers:             {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
        },
        body: formData,
      });
      this.showNotificationMessage(`Image upload succeeded!`, {type: "success"});
      this.appendUploadedImageToSortableList(file, response);

    } catch (err) {

      this.showNotificationMessage(`Upload to the server failed! Please try again later! ${err}`, {type: "error", duration: 3000});

    } finally {

      uploadImageButton.classList.remove("is-loading");

    }
  }

  showNotificationMessage(message, {duration = 2000, type} = {}) {
    const notificationMessage = new NotificationMessage(message, {
      duration: duration,
      type: type
    });
    notificationMessage.show();
  }

  appendUploadedImageToSortableList = (file, response) => {
    const {name: fileName} = file;
    const {link} = response.data;

    const {firstElementChild: sortableImageList} = this.subElements.imageListContainer;

    const images = [
      {
        url: link,
        source: fileName
      }
    ];

    const items = images.map(({url, source}) => this.getImageItem(url, source));

    const sortableList = new SortableList({
      items
    });

    sortableImageList.append(sortableList.element);
  }

  onUploadImageButtonClick = (event) => {
    event.preventDefault();

    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<input type="file" accept="image/*" hidden="">'
    this.inputElement = wrapper.firstElementChild;
    document.body.append(this.inputElement);

    this.inputElement.onchange = this.uploadImage;

    this.inputElement.click();
  }

  // TODO: check if it is a good place for url param or it should be put outside of class
  constructor(productId, url = "api/rest/products") {
    this.productId = productId;
    this.productEditMode = Boolean(this.productId);
    this.productsUrl = url;
    this.categoriesUrl = "api/rest/categories";
  }

  async render() {

    const wrapper = document.createElement('div');

    [this.categories, this.productData] = await this.getAllData(this.productEditMode);

    if (this.productEditMode) {
      wrapper.innerHTML = this.getEditProductFormTemplate(this.productData, this.categories);
    } else {
      wrapper.innerHTML = this.getCreateProductFormTemplate(this.categories);
    }

    const element = wrapper.firstElementChild;

    this.element = element;

    this.subElements = this.getSubElements();

    this.createImagesList();

    this.initEventListeners();

    return this.element;
  }

  initEventListeners() {
    const uploadImageButton = this.subElements["sortable-list-container"].lastElementChild;

    uploadImageButton.addEventListener("click", this.onUploadImageButtonClick);
    this.element.addEventListener("submit", this.onFormSubmit);
  }

  async getAllData(productEditMode) {
    const categoriesRequest = this.getSingleData(this.categoriesUrl, {_sort: "weight", _refs: "subcategory"});

    const requests = [
      categoriesRequest
    ]

    if (productEditMode) {
      const productRequest = this.getSingleData(this.productsUrl, {id: this.productId});
      requests.push(productRequest);
    }

    return await Promise.all(requests);
  }

  async getSingleData(url, searchQueryParams) {
    const fetchUrl = this.getFetchUrl(url, searchQueryParams);
    const response = await fetchJson(fetchUrl);
    return response;
  }

  getFetchUrl(url, searchQueryParams) {
    const fetchUrl = new URL(url, BACKEND_URL);

    if (searchQueryParams) {
      for (let [param, val] of Object.entries(searchQueryParams)) {
        fetchUrl.searchParams.set(param, val);
      }
    }

    return fetchUrl;
  }

  getSubElements(element = this.element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  getEditProductFormTemplate([productData], categories) {
    return `
      <div class="product-form">
        <form data-element="productForm" class="form-grid">
          ${this.getTitleTemplate(productData)}
          ${this.getDescriptionTemplate(productData)}
          ${this.getSortableImageListContainerTemplate()}
          ${this.getProductCategoriesTemplate(categories, productData)}
          ${this.getProductPriceDiscountTemplate(productData)}
          ${this.getProductQuantityTemplate(productData)}
          ${this.getProductStatusTemplate(productData)}
          <div class="form-buttons">
            <button type="submit" name="save" class="button-primary-outline">
              Сохранить товар
            </button>
          </div>
        </form>
      </div>
    `;
  }

  getTitleTemplate({title}) {
    return `
      <div class="form-group form-group__half_left">
        <fieldset>
          <label class="form-label">Название товара</label>
          <input required="" type="text" name="title" class="form-control" placeholder="Название товара" value="${escapeHtml(title)}">
        </fieldset>
      </div>
    `;
  }

  getDescriptionTemplate({description}) {
    return `
      <div class="form-group form-group__wide">
        <label class="form-label">Описание</label>
        <textarea required="" class="form-control" name="description" data-element="productDescription" placeholder="Описание товара">${escapeHtml(description)}"</textarea>
      </div>
    `;
  }

  getSortableImageListContainerTemplate() {
    return `
      <div class="form-group form-group__wide" data-element="sortable-list-container">
        <label class="form-label">Фото</label>
        <div data-element="imageListContainer">
        </div>
        <button type="button" name="uploadImage" class="button-primary-outline"><span>Загрузить</span></button>
      </div>
    `;
  }

  getProductCategoriesTemplate(categories, productData) {
    let productSubcategory;
    if (productData) {
      ({subcategory: productSubcategory} = productData);
    }
    return `
      <div class="form-group form-group__half_left">
        <label class="form-label">Категория</label>
        <select class="form-control" name="subcategory">
        ${categories
          .map( ({title: categotyTitle, subcategories}) => {
            return subcategories
              .map( ({id: subcategoryId, title: subcategoryTitle}) => {
                return `
                  <option ${(productSubcategory && productSubcategory === subcategoryId) ? "selected" : ""} value="${subcategoryId}">${categotyTitle} &gt; ${subcategoryTitle}</option>
                `;
              });
          }).join("")}
        </select>
      </div>
    `;
  }

  getProductPriceDiscountTemplate({price, discount}) {
    return `
      <div class="form-group form-group__half_left form-group__two-col">
        <fieldset>
          <label class="form-label">Цена ($)</label>
          <input required="" type="number" name="price" class="form-control" placeholder="100" value="${price}">
        </fieldset>
        <fieldset>
          <label class="form-label">Скидка ($)</label>
          <input required="" type="number" name="discount" class="form-control" placeholder="0" value="${discount}">
        </fieldset>
      </div>
    `;
  }

  getProductQuantityTemplate({quantity}) {
    return `
      <div class="form-group form-group__part-half">
        <label class="form-label">Количество</label>
        <input required="" type="number" class="form-control" name="quantity" placeholder="1" value="${quantity}">
      </div>
    `;
  }

  getProductStatusTemplate({status}) {
    return `
      <div class="form-group form-group__part-half">
        <label class="form-label">Статус</label>
        <select class="form-control" name="status">
          <option ${(status === 1) ? "selected" : ""} value="1">Активен</option>
          <option ${(status === 0) ? "selected" : ""} value="0">Неактивен</option>
        </select>
      </div>
    `;
  }

  createImagesList() {
    if (!this.productData) {
      return;
    };
    const {imageListContainer} = this.subElements;
    const [productData] = this.productData;
    const {images} = productData;

    const items = images.map(({url, source}) => this.getImageItem(url, source));

    const sortableList = new SortableList({
      items
    });

    imageListContainer.append(sortableList.element);
  }

  getImageItem(url, name) {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <li class="products-edit__imagelist-item sortable-list__item">
        <span>
          <img src="icon-grab.svg" data-grab-handle alt="grab">
          <img class="sortable-table__cell-img" alt="${escapeHtml(name)}" src="${escapeHtml(url)}">
          <span>${escapeHtml(name)}</span>
        </span>
        <button type="button">
          <img src="icon-trash.svg" alt="delete" data-delete-handle>
        </button>
      </li>`;

    return wrapper.firstElementChild;
  }

  getCreateProductFormTemplate(categories) {
    return `
      <div class="product-form">
        <form data-element="productForm" class="form-grid">
        <div class="form-group form-group__half_left">
          <fieldset>
            <label class="form-label">Название товара</label>
            <input required="" type="text" name="title" class="form-control" placeholder="Название товара">
          </fieldset>
        </div>
        <div class="form-group form-group__wide">
          <label class="form-label">Описание</label>
          <textarea required="" class="form-control" name="description" data-element="productDescription" placeholder="Описание товара"></textarea>
        </div>
        <div class="form-group form-group__wide" data-element="sortable-list-container">
          <label class="form-label">Фото</label>
          <div data-element="imageListContainer"><ul class="sortable-list"></ul></div>
          <button type="button" name="uploadImage" class="button-primary-outline fit-content"><span>Загрузить</span></button>
        </div>
        ${this.getProductCategoriesTemplate(categories)}
        <div class="form-group form-group__half_left form-group__two-col">
          <fieldset>
            <label class="form-label">Цена ($)</label>
            <input required="" type="number" name="price" class="form-control" placeholder="100">
          </fieldset>
          <fieldset>
            <label class="form-label">Скидка ($)</label>
            <input required="" type="number" name="discount" class="form-control" placeholder="0">
          </fieldset>
        </div>
        <div class="form-group form-group__part-half">
          <label class="form-label">Количество</label>
          <input required="" type="number" class="form-control" name="quantity" placeholder="1">
        </div>
        <div class="form-group form-group__part-half">
          <label class="form-label">Статус</label>
          <select class="form-control" name="status">
            <option value="1">Активен</option>
            <option value="0">Неактивен</option>
          </select>
        </div>
        <div class="form-buttons">
          <button type="submit" name="save" class="button-primary-outline">
            Добавить товар
          </button>
        </div>
      </form>
      </div>
    `;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }

}
