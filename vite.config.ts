import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

let hasLogged = false;

const customLoggerPlugin = () => {
  return {
    name: 'custom-logger',
    buildStart() {
      if (!hasLogged) {
        console.log('%c🎉 Chào mừng bạn đến với dự án Vite của chúng tôi!', 'font-size: 20px; color: #4CAF50;');
        hasLogged = true;
      }
    },
  };
};

export default defineConfig({
  plugins: [vue(), customLoggerPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }, server: {
    host: '0.0.0.0',      // Cho phép kết nối từ mọi địa chỉ IP trong mạng nội bộ
    port: 3000,           // Cổng mà bạn muốn chạy, có thể thay đổi tùy ý
    open: true,           // Mở tự động trình duyệt khi chạy
  },
}); 
