---

# Vue Pure Admin - CineBoo

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Giới thiệu
---
**Vue Pure Admin** là một dự án quản trị mạnh mẽ, được xây dựng trên nền tảng **Vue.js 3** và **Vite**. Với kiến trúc dễ tùy biến, giao diện người dùng tinh gọn và thân thiện, nó được thiết kế để phù hợp với mọi loại ứng dụng quản trị, đặc biệt là **CineBoo** – hệ thống quản lý và điều hành bán vé xem phim trực tuyến.

## 🎯 Tính năng nổi bật

- **Vue.js 3** với Composition API: Tận dụng công nghệ hiện đại từ Vue để xây dựng UI linh hoạt và mạnh mẽ.
- **Quản lý Role và Quyền Hạn**: Dễ dàng thiết lập các quyền hạn và vai trò cho từng người dùng.
- **Quản lý Route**: Định tuyến thông minh với `meta.requiresAuth` và `beforeEnter` để bảo mật và điều hướng dựa trên vai trò.
- **Giao diện Tối Giản**: Dễ sử dụng và tối ưu trải nghiệm người dùng với thiết kế đơn giản mà hiệu quả.
- **Quản lý Đặt Vé**: Chức năng cho phép người dùng xem lịch chiếu, chọn ghế và đặt vé trực tuyến.
- **Quản lý Báo Cáo và Cài Đặt**: Trang báo cáo và cài đặt được quản lý tốt, giúp bạn dễ dàng theo dõi và điều chỉnh hệ thống.
  
## 🛠️ Công nghệ sử dụng

- **Vue.js 3**
- **Vite** - công cụ xây dựng nhanh
- **Vue Router** - định tuyến cho ứng dụng
- **Pinia** - quản lý trạng thái dễ dàng
- **Axios** - kết nối và xử lý API
- **CSS** - tạo giao diện đẹp mắt và dễ dàng tùy biến

## 📦 Cài đặt

Clone dự án từ GitHub:

```bash
(https://github.com/dangkhoa2004/frontend-cineboo.git
cd frontend-cineboo
npm install
npm install axios@^1.7.7
npm install js-cookie@^3.0.5
npm install leaflet@^1.9.4
npm install nprogress@^0.2.0
npm install vue@^3.5.10
npm install vue-i18n@^10.0.4
npm install vue-router@^4.4.5
npm install vue3-leaflet@^1.0.50
npm install vuex@^4.1.0
```

Chạy dự án:

```bash
npm run serve
```

## 🔐 Xác thực và phân quyền

Ứng dụng có các chức năng bảo mật thông qua xác thực người dùng và phân quyền dựa trên vai trò. Các trang quản trị như Admin, Settings và Reports được bảo vệ bằng `meta.requiresAuth` và kiểm tra quyền hạn qua `beforeEnter` để đảm bảo chỉ những người có quyền mới được truy cập.

## 📁 Cấu trúc thư mục
```bash
frontend-cineboo/
├── .vscode/               # Cấu hình editor (VS Code settings, extensions, ...).
├── node_modules/          # Thư viện và dependencies được cài bằng npm/yarn.
├── public/                # Tài nguyên tĩnh (static assets).
├── src/                   # Mã nguồn chính của dự án.
│   ├── api/               # Quản lý các API (file gọi API, config axios,...).
│   ├── assets/            # Tài nguyên như ảnh, video, font, biểu tượng,...
│   ├── components/        # Các thành phần (component) tái sử dụng.
│   ├── config/            # Cấu hình toàn cục (base URL, constants, env, ...).
│   ├── directives/        # Custom directives (VD: v-focus, v-scroll,...).
│   ├── layout/            # Các layout chung (VD: Header, Footer, Sidebar).
│   ├── locales/           # Đa ngôn ngữ (i18n configuration và các file JSON).
│   ├── plugins/           # Đăng ký và cấu hình các plugin (VD: vuetify, vue-toast, ...).
│   ├── router/            # Cấu hình route (vue-router).
│   ├── store/             # State management (Vuex, Pinia, ...).
│   ├── style/             # CSS/SCSS/LESS cho dự án (chung và theo module).
│   ├── utils/             # Hàm tiện ích dùng chung (format data, xử lý ngày giờ,...).
│   ├── views/             # Các trang (page) chính của ứng dụng.
│   ├── App.vue            # File gốc của Vue.js (root component).
│   └── main.ts            # Entry point chính của dự án (khởi chạy app).
├── .gitattributes         # File cấu hình Git (encoding, line endings,...).
├── .gitignore             # Danh sách file/thư mục cần bỏ qua khi commit.
├── index.html             # File HTML chính (template khi build).
├── package-lock.json      # File lock cho npm (quản lý version dependencies).
├── package.json           # File cấu hình dự án (dependencies, scripts,...).
├── README.md              # Tài liệu mô tả dự án.
├── robots.txt             # File cấu hình cho bot tìm kiếm.
├── tsconfig.app.json      # Cấu hình TypeScript cho ứng dụng.
├── tsconfig.json          # Cấu hình chung cho TypeScript.
├── tsconfig.node.json     # Cấu hình TypeScript cho môi trường Node.js.
└── vite.config.ts         # File cấu hình cho Vite (tool build ứng dụng).
```

## 🎨 Tùy chỉnh giao diện

Bạn có thể dễ dàng thay đổi giao diện theo phong cách của **CineBoo** bằng cách cập nhật tệp SCSS trong thư mục `src/style/...`. Dự án cũng hỗ trợ **Dark Mode** để phù hợp với trải nghiệm người dùng.

## 📝 Đóng góp

Mọi đóng góp cho dự án đều được hoan nghênh! Bạn có thể tạo Pull Request hoặc mở Issues để trao đổi các vấn đề gặp phải.

---

💻 **Vue Pure Admin - CineBoo** là giải pháp toàn diện để xây dựng hệ thống quản trị mạnh mẽ và hiệu quả cho bán vé xem phim trực tuyến. Cùng khám phá và cải thiện nó ngay hôm nay!

---

## 📄 Giấy phép

Dự án được cấp phép theo [MIT License](LICENSE).

---
