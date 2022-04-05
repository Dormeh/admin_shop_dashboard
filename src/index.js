import Router from './router/index.js';
import tooltip from './components/tooltip/index.js';

tooltip.initialize();
const URL_PATH = process.env.URL_PATH;

const router = Router.instance();

router
  .addRoute(new RegExp(`^${URL_PATH}$`), 'dashboard')
  .addRoute(/^$/, 'dashboard')
  .addRoute(/^products$/, 'products/list')
  .addRoute(/^products\/add$/, 'products/edit')
  .addRoute(/^products\/([\w()-]+)$/, 'products/edit')
  .addRoute(/^sales$/, 'sales')
  .addRoute(/^categories$/, 'categories')
  .addRoute(/^404\/?$/, 'error404')
  .setNotFoundPagePath('error404')
  .listen();

document.querySelector(".sidebar__toggler").addEventListener("click", event =>{
  event.preventDefault();
  document.body.classList.toggle("is-collapsed-sidebar");
});
