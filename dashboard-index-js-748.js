"use strict";(self.webpackChunkproject_structure=self.webpackChunkproject_structure||[]).push([[748],{552:(e,t,s)=>{function a(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}s.d(t,{Z:()=>r});class r{static formatDate(e){return e.toLocaleString("ru",{dateStyle:"short"})}constructor(){let{from:e=new Date,to:t=new Date}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};a(this,"element",null),a(this,"subElements",{}),a(this,"selectingFrom",!0),a(this,"selected",{from:new Date,to:new Date}),a(this,"onDocumentClick",e=>{const t=this.element.classList.contains("rangepicker_open"),s=this.element.contains(e.target);t&&!s&&this.close()}),this.showDateFrom=new Date(e),this.selected={from:e,to:t},this.render()}get template(){return`<div class="rangepicker">\n      <div class="rangepicker__input" data-elem="input">\n        <span data-elem="from">${r.formatDate(this.selected.from)}</span> -\n        <span data-elem="to">${r.formatDate(this.selected.to)}</span>\n      </div>\n      <div class="rangepicker__selector" data-elem="selector"></div>\n    </div>`}render(){const e=document.createElement("div");return e.innerHTML=this.template,this.element=e.firstElementChild,this.subElements=this.getSubElements(e),this.initEventListeners(),Promise.resolve(this.element)}getSubElements(e){const t={};for(const s of e.querySelectorAll("[data-elem]"))t[s.dataset.elem]=s;return t}initEventListeners(){const{input:e,selector:t}=this.subElements;document.addEventListener("click",this.onDocumentClick,!0),e.addEventListener("click",()=>this.toggle()),t.addEventListener("click",e=>this.onSelectorClick(e))}toggle(){this.element.classList.toggle("rangepicker_open"),this.renderDateRangePicker()}onSelectorClick(e){let{target:t}=e;t.classList.contains("rangepicker__cell")&&this.onRangePickerCellClick(t)}close(){this.element.classList.remove("rangepicker_open")}renderDateRangePicker(){const e=new Date(this.showDateFrom),t=new Date(this.showDateFrom),{selector:s}=this.subElements;t.setMonth(t.getMonth()+1),s.innerHTML=`\n      <div class="rangepicker__selector-arrow"></div>\n      <div class="rangepicker__selector-control-left"></div>\n      <div class="rangepicker__selector-control-right"></div>\n      ${this.renderCalendar(e)}\n      ${this.renderCalendar(t)}\n    `;const a=s.querySelector(".rangepicker__selector-control-left"),r=s.querySelector(".rangepicker__selector-control-right");a.addEventListener("click",()=>this.prev()),r.addEventListener("click",()=>this.next()),this.renderHighlight()}prev(){this.showDateFrom.setMonth(this.showDateFrom.getMonth()-1),this.renderDateRangePicker()}next(){this.showDateFrom.setMonth(this.showDateFrom.getMonth()+1),this.renderDateRangePicker()}renderHighlight(){const{from:e,to:t}=this.selected;for(const s of this.element.querySelectorAll(".rangepicker__cell")){const{value:a}=s.dataset,r=new Date(a);s.classList.remove("rangepicker__selected-from"),s.classList.remove("rangepicker__selected-between"),s.classList.remove("rangepicker__selected-to"),e&&a===e.toISOString()?s.classList.add("rangepicker__selected-from"):t&&a===t.toISOString()?s.classList.add("rangepicker__selected-to"):e&&t&&r>=e&&r<=t&&s.classList.add("rangepicker__selected-between")}if(e){const t=this.element.querySelector(`[data-value="${e.toISOString()}"]`);t&&t.closest(".rangepicker__cell").classList.add("rangepicker__selected-from")}if(t){const e=this.element.querySelector(`[data-value="${t.toISOString()}"]`);e&&e.closest(".rangepicker__cell").classList.add("rangepicker__selected-to")}}renderCalendar(e){const t=new Date(e);t.setDate(1);const s=t.toLocaleString("ru",{month:"long"});let a=`<div class="rangepicker__calendar">\n      <div class="rangepicker__month-indicator">\n        <time datetime=${s}>${s}</time>\n      </div>\n      <div class="rangepicker__day-of-week">\n        <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>\n      </div>\n      <div class="rangepicker__date-grid">\n    `;var r;for(a+=`\n      <button type="button"\n        class="rangepicker__cell"\n        data-value="${t.toISOString()}"\n        style="--start-from: ${r=t.getDay(),1+(0===r?6:r-1)}">\n          ${t.getDate()}\n      </button>`,t.setDate(2);t.getMonth()===e.getMonth();)a+=`\n        <button type="button"\n          class="rangepicker__cell"\n          data-value="${t.toISOString()}">\n            ${t.getDate()}\n        </button>`,t.setDate(t.getDate()+1);return a+="</div></div>",a}onRangePickerCellClick(e){const{value:t}=e.dataset;if(t){const e=new Date(t);this.selectingFrom?(this.selected={from:e,to:null},this.selectingFrom=!1,this.renderHighlight()):(e>this.selected.from?this.selected.to=e:(this.selected.to=this.selected.from,this.selected.from=e),this.selectingFrom=!0,this.renderHighlight()),this.selected.from&&this.selected.to&&(this.dispatchEvent(),this.close(),this.subElements.from.innerHTML=r.formatDate(this.selected.from),this.subElements.to.innerHTML=r.formatDate(this.selected.to))}}dispatchEvent(){this.element.dispatchEvent(new CustomEvent("date-select",{bubbles:!0,detail:this.selected}))}remove(){this.element.remove(),document.removeEventListener("click",this.onDocumentClick,!0)}destroy(){return this.remove(),this.element=null,this.subElements={},this.selectingFrom=!0,this.selected={from:new Date,to:new Date},this}}},348:(e,t,s)=>{s.d(t,{Z:()=>n});var a=s(856);function r(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class n{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],{url:t="",sorted:s={id:e.find(e=>e.sortable).id,order:"asc"},isSortLocally:a=!1,step:n=20,start:i=1,end:o=i+n,from:l=null,to:d=null,filtered:c=null}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r(this,"element",void 0),r(this,"subElements",{}),r(this,"data",[]),r(this,"loading",!1),r(this,"step",20),r(this,"start",1),r(this,"end",this.start+this.step),r(this,"onWindowScroll",async()=>{const{bottom:e}=this.element.getBoundingClientRect(),{id:t,order:s}=this.sorted;if(e<document.documentElement.clientHeight&&!this.loading&&!this.isSortLocally){this.start=this.end,this.end=this.start+this.step,this.loading=!0;const e=await this.loadData(t,s,this.start,this.end);this.update(e),this.loading=!1}}),r(this,"onSortClick",e=>{const t=e.target.closest('[data-sortable="true"]');if(t){const{id:e,order:s}=t.dataset,a=(e=>({asc:"desc",desc:"asc"}[e]))(s);this.sorted={id:e,order:a},t.dataset.order=a,t.append(this.subElements.arrow),this.isSortLocally?this.sortLocally(e,a):(this.start=1,this.end=1+this.step,this.sortOnServer(e,a,this.start,this.end))}}),this.headersConfig=e,this.url=new URL(t,"https://course-js.javascript.ru/"),this.sorted=s,this.isSortLocally=a,this.step=n,this.start=i,this.end=o,this.from=l,this.to=d,this.filtered=c,this.render()}async render(){const{id:e,order:t}=this.sorted,s=document.createElement("div");s.innerHTML=this.getTable();const a=s.firstElementChild;this.element=a,this.subElements=this.getSubElements(a);const r=await this.loadData(e,t,this.start,this.end);return this.renderRows(r),this.initEventListeners(),this.element}async loadData(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.start,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.end;if(this.from&&this.to&&(this.url.searchParams.set("createdAt_gte",this.from),this.url.searchParams.set("createdAt_lte",this.to)),this.filtered){const{price_gte:e,price_lte:t,title_like:s,status:a}=this.filtered;this.url.searchParams.set("price_gte",e),this.url.searchParams.set("price_lte",t),s&&this.url.searchParams.set("title_like",s),a&&this.url.searchParams.set("status",a)}this.url.searchParams.set("_sort",e),this.url.searchParams.set("_order",t),this.url.searchParams.set("_start",s),this.url.searchParams.set("_end",r),this.element.classList.add("sortable-table_loading");const n=await(0,a.Z)(this.url);return this.element.classList.remove("sortable-table_loading"),n}addRows(e){this.data=e,this.subElements.body.innerHTML=this.getTableRows(e),e.length?this.element.classList.remove("sortable-table_empty"):this.element.classList.add("sortable-table_empty")}update(e){const t=document.createElement("div");return this.data=[...this.data,...e],t.innerHTML=this.getTableRows(e),this.subElements.body.append(...t.childNodes),t}getTableHeader(){return`<div data-element="header" class="sortable-table__header sortable-table__row">\n      ${this.headersConfig.map(e=>this.getHeaderRow(e)).join("")}\n    </div>`}getHeaderRow(e){let{id:t,title:s,sortable:a}=e;return`\n      <div class="sortable-table__cell" data-id="${t}" data-sortable="${a}" data-order="${this.sorted.id===t?this.sorted.order:"asc"}">\n        <span>${s}</span>\n        ${this.getHeaderSortingArrow(t)}\n      </div>\n    `}getHeaderSortingArrow(e){return(this.sorted.id===e?this.sorted.order:"")?'<span data-element="arrow" class="sortable-table__sort-arrow">\n          <span class="sort-arrow"></span>\n        </span>':""}getTableBody(e){return`\n      <div data-element="body" class="sortable-table__body">\n        ${this.getTableRows(e)}\n      </div>`}getTableRows(e){return e.map(t=>`\n      <a href="/products/${t.id}" class="sortable-table__row">\n        ${this.getTableRow(t,e)}\n      </a>`).join("")}getTableRow(e){return this.headersConfig.map(e=>{let{id:t,template:s}=e;return{id:t,template:s}}).map(t=>{let{id:s,template:a}=t;return a?a(e[s]):`<div class="sortable-table__cell">${e[s]}</div>`}).join("")}getTable(){return`\n      <div class="sortable-table">\n        ${this.getTableHeader()}\n        ${this.getTableBody(this.data)}\n\n        <div data-element="loading" class="loading-line sortable-table__loading-line"></div>\n\n        <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">\n          No data\n        </div>\n      </div>`}initEventListeners(){this.subElements.header.addEventListener("pointerdown",this.onSortClick),document.addEventListener("scroll",this.onWindowScroll)}sortLocally(e,t){const s=this.sortData(e,t);this.subElements.body.innerHTML=this.getTableBody(s)}async sortOnServer(e,t,s,a){const r=await this.loadData(e,t,s,a);this.renderRows(r)}renderRows(e){e.length?(this.element.classList.remove("sortable-table_empty"),this.addRows(e)):this.element.classList.add("sortable-table_empty")}sortData(e,t){const s=[...this.data],a=this.headersConfig.find(t=>t.id===e),{sortType:r,customSorting:n}=a,i="asc"===t?1:-1;return s.sort((t,s)=>{switch(r){case"number":return i*(t[e]-s[e]);case"string":return i*t[e].localeCompare(s[e],"ru");case"custom":return i*n(t,s);default:return i*(t[e]-s[e])}})}getSubElements(e){return[...e.querySelectorAll("[data-element]")].reduce((e,t)=>(e[t.dataset.element]=t,e),{})}remove(){this.element.remove(),document.removeEventListener("scroll",this.onWindowScroll)}destroy(){this.remove(),this.subElements={}}}},329:(e,t,s)=>{s.r(t),s.d(t,{default:()=>c});var a=s(552),r=s(348);function n(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class i{constructor(){let{data:e=[],label:t="",link:s="",value:a=0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n(this,"element",void 0),n(this,"subElements",{}),n(this,"chartHeight",50),this.data=e,this.label=t,this.link=s,this.value=a,this.render()}getColumnBody(e){const t=Math.max(...e);return e.map(e=>{const s=this.chartHeight/t,a=(e/t*100).toFixed(0);return`<div style="--value: ${Math.floor(e*s)}" data-tooltip="${a}%"></div>`}).join("")}getLink(){return this.link?`<a class="column-chart__link" href="${this.link}">View all</a>`:""}get template(){return`\n      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">\n        <div class="column-chart__title">\n          Total ${this.label}\n          ${this.getLink()}\n        </div>\n        <div class="column-chart__container">\n          <div data-element="header" class="column-chart__header">\n            ${this.value}\n          </div>\n          <div data-element="body" class="column-chart__chart">\n            ${this.getColumnBody(this.data)}\n          </div>\n        </div>\n      </div>\n    `}async render(){const e=document.createElement("div");return e.innerHTML=this.template,this.element=e.firstElementChild,this.element.classList.remove("column-chart_loading"),this.subElements=this.getSubElements(this.element),this.element}getSubElements(e){return[...e.querySelectorAll("[data-element]")].reduce((e,t)=>(e[t.dataset.element]=t,e),{})}update(e){let{headerData:t,bodyData:s}=e;this.subElements.header.textContent=t,this.subElements.body.innerHTML=this.getColumnBody(s)}destroy(){this.element.remove()}}const o=[{id:"images",title:"Image",sortable:!1,template:e=>`\n          <div class="sortable-table__cell">\n            <img class="sortable-table-image" alt="Image" src="${e[0]?e[0].url:""}">\n          </div>\n        `},{id:"title",title:"Name",sortable:!0,sortType:"string"},{id:"quantity",title:"Quantity",sortable:!0,sortType:"number"},{id:"price",title:"Price",sortable:!0,sortType:"number"},{id:"status",title:"Status",sortable:!0,sortType:"number",template:e=>`<div class="sortable-table__cell">\n          ${e>0?"Active":"Inactive"}\n        </div>`}];var l=s(856);function d(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class c{constructor(){d(this,"element",void 0),d(this,"subElements",{}),d(this,"components",{})}async getDataForColumnCharts(e,t){const s=`https://course-js.javascript.ru/api/dashboard/orders?from=${e.toISOString()}&to=${t.toISOString()}`,a=`https://course-js.javascript.ru/api/dashboard/sales?from=${e.toISOString()}&to=${t.toISOString()}`,r=`https://course-js.javascript.ru/api/dashboard/customers?from=${encodeURIComponent(e.toISOString())}&to=${encodeURIComponent(t.toISOString())}`,n=(0,l.Z)(s),i=(0,l.Z)(a),o=(0,l.Z)(r);return(await Promise.all([n,i,o])).map(e=>Object.values(e))}async updateTableComponent(e,t){this.updateCssClass(["sortableTable"],"add",["sortable-table_loading"]);const s=await(0,l.Z)(`https://course-js.javascript.ru/api/dashboard/bestsellers?_start=1&_end=20&from=${e.toISOString()}&to=${t.toISOString()}`);this.components.sortableTable.addRows(s),this.updateCssClass(["sortableTable"],"remove",["sortable-table_loading"])}async updateChartsComponents(e,t){const s=["ordersChart","salesChart","customersChart"],a=["column-chart_loading"];this.updateCssClass(s,"add",a);const[r,n,i]=await this.getDataForColumnCharts(e,t),o=r.reduce((e,t)=>e+t,0),l=n.reduce((e,t)=>e+t,0),d=i.reduce((e,t)=>e+t,0);this.components.ordersChart.update({headerData:o,bodyData:r}),this.components.salesChart.update({headerData:"$"+l,bodyData:n}),this.components.customersChart.update({headerData:d,bodyData:i}),this.updateCssClass(s,"remove",a)}updateCssClass(e,t,s){for(const a of e){const{element:e}=this.components[a];for(const a of s)switch(t){case"add":e.classList.add(a);break;case"remove":e.classList.remove(a)}}}async initComponents(){const e=new Date,t=new Date(e.getTime()-2592e6),[s,n,l]=await this.getDataForColumnCharts(t,e),d=new a.Z({from:t,to:e}),c=new r.Z(o,{url:`api/dashboard/bestsellers?_start=1&_end=20&from=${t.toISOString()}&to=${e.toISOString()}`,isSortLocally:!0}),h=new i({data:s,label:"orders",value:s.reduce((e,t)=>e+t,0),link:"#"}),m=new i({data:n,label:"sales",value:"$"+n.reduce((e,t)=>e+t,0)}),u=new i({data:l,label:"customers",value:l.reduce((e,t)=>e+t,0)});this.components.sortableTable=c,this.components.ordersChart=h,this.components.salesChart=m,this.components.customersChart=u,this.components.rangePicker=d}get template(){return'<div class="dashboard">\n      <div class="content__top-panel">\n        <h2 class="page-title">Dashboard</h2>\n        \x3c!-- RangePicker component --\x3e\n        <div data-element="rangePicker"></div>\n      </div>\n      <div data-element="chartsRoot" class="dashboard__charts">\n        \x3c!-- column-chart components --\x3e\n        <div data-element="ordersChart" class="dashboard__chart_orders"></div>\n        <div data-element="salesChart" class="dashboard__chart_sales"></div>\n        <div data-element="customersChart" class="dashboard__chart_customers"></div>\n      </div>\n\n      <h3 class="block-title">Best sellers</h3>\n\n      <div data-element="sortableTable">\n        \x3c!-- sortable-table component --\x3e\n      </div>\n    </div>'}async render(){const e=document.createElement("div");return e.innerHTML=this.template,this.element=e.firstElementChild,this.subElements=this.getSubElements(this.element),await this.initComponents(),this.renderComponents(),this.initEventListeners(),this.element}renderComponents(){Object.keys(this.components).forEach(e=>{const t=this.subElements[e],{element:s}=this.components[e];t.append(s)})}getSubElements(e){return[...e.querySelectorAll("[data-element]")].reduce((e,t)=>(e[t.dataset.element]=t,e),{})}initEventListeners(){this.components.rangePicker.element.addEventListener("date-select",e=>{const{from:t,to:s}=e.detail;this.updateChartsComponents(t,s),this.updateTableComponent(t,s)})}destroy(){for(const e of Object.values(this.components))e.destroy()}}},856:(e,t,s)=>{async function a(e,t){let s,a;try{s=await fetch(e.toString(),t)}catch(e){throw new r(s,"Network error has occurred.")}if(!s.ok){let e=s.statusText;try{a=await s.json(),e=a.error&&a.error.message||a.data&&a.data.error&&a.data.error.message||e}catch(e){}let t=`Error ${s.status}: ${e}`;throw new r(s,a,t)}try{return await s.json()}catch(e){throw new r(s,null,e.message)}}s.d(t,{Z:()=>a});class r extends Error{constructor(e,t,s){var a,r,n;super(s),n="FetchError",(r="name")in(a=this)?Object.defineProperty(a,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):a[r]=n,this.response=e,this.body=t}}window.addEventListener("unhandledrejection",e=>{e.reason instanceof r&&alert(e.reason.message)})}}]);
//# sourceMappingURL=dashboard-index-js-748.js.map