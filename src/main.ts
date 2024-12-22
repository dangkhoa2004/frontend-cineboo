import { createApp, type Directive } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // Thêm Pinia
import './style/main.css';
import 'leaflet/dist/leaflet.css';

import { i18nPlugin } from './plugins/i18nPlugin';
import * as directives from '@/directives';
import swalPlugin from '@/plugins/swalPlugin'; // Import plugin SweetAlert2

const app = createApp(App);

// Khởi tạo Pinia
const pinia = createPinia(); // Tạo một instance Pinia

// Đăng ký các directive
Object.keys(directives).forEach(key => {
  const directive = (directives as { [key: string]: Directive })[key];
  const directiveName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
  app.directive(directiveName, directive);
});

// Sử dụng Pinia, router, i18n và plugin SweetAlert2
app.use(pinia); // Đăng ký Pinia
app.use(router);
app.use(i18nPlugin);
app.use(swalPlugin); // Đăng ký plugin SweetAlert2

// Mount ứng dụng
app.mount('#app');
