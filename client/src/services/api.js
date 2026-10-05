import axios from 'axios';

// Tạo Axios instance với base URL của backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Tự động gắn token vào mọi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor: Xử lý response lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu token hết hạn hoặc không hợp lệ → đăng xuất
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Chỉ redirect nếu không phải đang ở trang login/register
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
