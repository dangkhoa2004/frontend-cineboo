// src/plugins/swalPlugin.ts
import Swal from 'sweetalert2';
import { App } from 'vue';

export default {
  install(app: App) {
    app.config.globalProperties.$swal = Swal;
  }
};
