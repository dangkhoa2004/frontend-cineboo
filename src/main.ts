import { createApp, type Directive } from 'vue';
import App from './App.vue';
import router from './router';

import './style/main.css';

import 'leaflet/dist/leaflet.css';

import { i18nPlugin } from './plugins/i18nPlugin';
import * as directives from '@/directives';

const app = createApp(App);

// Đăng ký các directive
Object.keys(directives).forEach(key => {
  const directive = (directives as { [key: string]: Directive })[key];
  const directiveName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
  app.directive(directiveName, directive);
});

// Sử dụng router và i18n
app.use(router).use(i18nPlugin).mount('#app');
