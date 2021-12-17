# Admin Dashboard

**Important!**

For correct build via Webpack you must have: 

* nodejs >=16.13.1
* npm >= 7.10.0

Данный проект был разработан в рамках курса ["JavaScript/​DOM/​Интерфейсы" для программистов](https://learn.javascript.ru/courses/js)
проекта [learn.javascript.ru](https://learn.javascript.ru/)

> Этот курс предназначен для изучения JavaScript программистами, а также для тех, кто разрабатывал на нём эпизодически и теперь хочет освоить профессионально.

Проект - это фронтенд часть типичной "Панели управления" для магазина товаров, 
реализованная на чистом JavaScript.

## Preview

[![preview](./preview.png)](https://course-js.javascript.ru/)

## Tech stack

* <img alt="javascript" width="26px" src="https://raw.githubusercontent.com/boris-catsvill/course-js.javascript.ru/master/tech-stack/javascript.png" /> Javascript
* <img alt="html" width="26px" src="https://raw.githubusercontent.com/boris-catsvill/course-js.javascript.ru/master/tech-stack/html.png" /> HTML
* <img alt="CSS" width="26px" src="https://raw.githubusercontent.com/boris-catsvill/course-js.javascript.ru/master/tech-stack/css.png" /> CSS

## Teacher

**Владимир Шевчук**

* [<img alt="GitHub" width="18px" src="https://raw.githubusercontent.com/boris-catsvill/course-js.javascript.ru/master/tech-stack/github-logo.png" /> GitHub](https://github.com/dosandk)
* [<img alt="learn.javascript" width="18px" src="https://raw.githubusercontent.com/boris-catsvill/course-js.javascript.ru/master/tech-stack/learn-javascript-logo.png" /> learn.javascript](http://learn.javascript.ru/profile/v-shevchuk)
* [<img alt="Linkedin" width="18px" src="https://raw.githubusercontent.com/boris-catsvill/course-js.javascript.ru/master/tech-stack/linkedin-logo.png" /> Linkedin](https://www.linkedin.com/in/dosandk/) 

## To start project in development mode:

* `npm install` - установит необходимые зависимости
* `npm run develop` - запустит "WebpackDevServer"

**Note:** Версии требуемые проектом указаны в `package.json` в поле `engines` 

## To build project:

`npm run build` - "соберет" проект в "production" режиме.

## To deploy project to GitHub Pages

* `npm run build` - "соберет" проект в "production" режиме.
* `npm run deploy` - "зальет" содержимое директории `buid` на GitHub Pages, после чего
 проект будет доступен по адресу `https://<ваш nickname на github>.github.io/course-js.javascript.ru`
