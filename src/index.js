import Router from './router/index.js';
import tooltip from './components/tooltip/index.js';

tooltip.initialize();

const router = Router.instance();

router
  .addRoute(/^course-js.javascript.ru\/$/, 'dashboard')
  .addRoute(/^$/, 'dashboard')
  .addRoute(/products$/, 'products/list')
  .addRoute(/products\/add$/, 'products/edit')
  .addRoute(/products\/([\w()-]+)$/, 'products/edit')
  .addRoute(/sales$/, 'sales')
  .addRoute(/categories$/, 'categories')
  .addRoute(/404\/?$/, 'error404')
  .setNotFoundPagePath('error404')
  .listen();

const toggleSidebar = event => {
  event.preventDefault();
  document.body.classList.toggle('is-collapsed-sidebar');
};

const sidebarToggler = document.body.querySelector('.sidebar__toggler');

sidebarToggler.addEventListener('click', toggleSidebar);
