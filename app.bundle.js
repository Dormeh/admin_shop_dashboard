(()=>{var e,t={114:(e,t,r)=>{var n={"./categories/index.js":[434,193],"./dashboard/index.js":[329,748],"./error404/index.js":[232,854],"./products/edit/index.js":[311,935,460],"./products/list/index.js":[21,197],"./sales/index.js":[778,747]};function o(e){if(!r.o(n,e))return Promise.resolve().then(()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=n[e],o=t[0];return Promise.all(t.slice(1).map(r.e)).then(()=>r(o))}o.keys=()=>Object.keys(n),o.id=114,e.exports=o}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var s=r[e]={exports:{}};return t[e](s,s.exports,n),s.exports}n.m=t,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce((t,r)=>(n.f[r](e,t),t),[])),n.u=e=>(({193:"categories-index-js",197:"products-list-index-js",460:"products-edit-index-js",747:"sales-index-js",748:"dashboard-index-js",854:"error404-index-js"}[e]||e)+"-"+e+".js"),n.miniCssF=e=>{},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},n.l=(t,r,o,s)=>{if(e[t])e[t].push(r);else{var i,a;if(void 0!==o)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var c=d[u];if(c.getAttribute("src")==t||c.getAttribute("data-webpack")=="project-structure:"+o){i=c;break}}i||(a=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack","project-structure:"+o),i.src=t),e[t]=[r];var l=(r,n)=>{i.onerror=i.onload=null,clearTimeout(p);var o=e[t];if(delete e[t],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach(e=>e(n)),r)return r(n)},p=setTimeout(l.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=l.bind(null,i.onerror),i.onload=l.bind(null,i.onload),a&&document.head.appendChild(i)}},n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/admin_shop_dashboard/",(()=>{var e={143:0};n.f.j=(t,r)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var s=new Promise((r,n)=>o=e[t]=[r,n]);r.push(o[2]=s);var i=n.p+n.u(t),a=new Error;n.l(i,r=>{if(n.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var s=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+s+": "+i+")",a.name="ChunkLoadError",a.type=s,a.request=i,o[1](a)}},"chunk-"+t,t)}};var t=(t,r)=>{var o,s,[i,a,d]=r,u=0;if(i.some(t=>0!==e[t])){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(d)d(n)}for(t&&t(r);u<i.length;u++)s=i[u],n.o(e,s)&&e[s]&&e[s][0](),e[i[u]]=0},r=self.webpackChunkproject_structure=self.webpackChunkproject_structure||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),(()=>{"use strict";class e{constructor(){this.routes=[],this.initEventListeners()}initEventListeners(){document.addEventListener("click",e=>{const t=e.target.closest("a");if(!t)return;const r=t.getAttribute("href");r&&r.startsWith("/")&&(e.preventDefault(),this.navigate(r))})}static instance(){return this._instance||(this._instance=new e),this._instance}async route(){let e,t=decodeURI(window.location.pathname).replace(/^\/|\/$/,"");for(let r of this.routes)if(e=t.match(r.pattern),e){this.page=await this.changePage(r.path,e);break}e||(this.page=await this.changePage(this.notFoundPagePath)),document.dispatchEvent(new CustomEvent("route",{detail:{page:this.page}}))}async changePage(e,t){return this.page&&this.page.destroy&&this.page.destroy(),await async function(e,t){const r=document.querySelector("main");console.log(t),r.classList.add("is-loading");const{default:o}=await n(114)(`./${e}/index.js`),s=new o(t),i=await s.render();r.classList.remove("is-loading");const a=document.querySelector("#content");return a.innerHTML="",a.append(i),s}(e,t)}navigate(e){history.pushState(null,null,e),this.route()}addRoute(e,t){return this.routes.push({pattern:e,path:t}),this}setNotFoundPagePath(e){return this.notFoundPagePath=e,this}listen(){window.addEventListener("popstate",()=>this.route()),this.route()}}class t{constructor(){if(t.onlyInstance)return t.onlyInstance;t.onlyInstance=this}initialize(){this.initEventListeners()}initTargetOut(e){e.target.closest("[data-tooltip]")&&(document.removeEventListener("pointermove",e=>this.move(e)),this.remove())}initTargetOver(e){const t=e.target.closest("[data-tooltip]");t&&(this.render(t.dataset.tooltip),this.move(e))}render(e){this.element=document.createElement("div"),this.element.innerHTML=e,this.element.className="tooltip",document.body.append(this.element),document.addEventListener("pointermove",e=>this.move(e))}move(e){const t=e.clientX,r=e.clientY;this.element.style.left=t+10+"px",this.element.style.top=r+10+"px"}initEventListeners(){document.addEventListener("pointerover",e=>this.initTargetOver(e)),document.addEventListener("pointerout",e=>this.initTargetOut(e))}remove(){this.element.remove()}destroy(){this.remove(),document.removeEventListener("pointerover",e=>this.initTargetOver(e)),document.removeEventListener("pointerout",e=>this.initTargetOut(e)),document.removeEventListener("pointermove",e=>this.move(e))}}var r,o,s;s=null,(o="onlyInstance")in(r=t)?Object.defineProperty(r,o,{value:s,enumerable:!0,configurable:!0,writable:!0}):r[o]=s;(new t).initialize();e.instance().addRoute(new RegExp("(^admin_shop_dashboard/$|^$)"),"dashboard").addRoute(new RegExp("(^admin_shop_dashboard/products$|^products$)"),"products/list").addRoute(/^products\/add$/,"products/edit").addRoute(/^products\/([\w()-]+)$/,"products/edit").addRoute(/^sales$/,"sales").addRoute(/^categories$/,"categories").addRoute(/^404\/?$/,"error404").setNotFoundPagePath("error404").listen(),document.querySelector(".sidebar__toggler").addEventListener("click",e=>{e.preventDefault(),document.body.classList.toggle("is-collapsed-sidebar")})})()})();
//# sourceMappingURL=app.bundle.js.map