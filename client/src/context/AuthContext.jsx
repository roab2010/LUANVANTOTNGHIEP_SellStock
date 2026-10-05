import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Tạo Context
const AuthContext = createContext(null);

// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
};

// Provider quản lý toàn bộ trạng thái authentication
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true khi đang kiểm tra token

  // Khi app khởi động: kiểm tra token còn hợp lệ không
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.data.data.user);
      } catch (error) {
        // Token hết hạn hoặc không hợp lệ
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // === ĐĂNG KÝ ===
  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  };

  // === ĐĂNG NHẬP ===
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user: userData } = response.data.data;

    // Lưu token vào localStorage
    localStorage.setItem('token', token);
    setUser(userData);

    return response.data;
  };

  // === ĐĂNG XUẤT ===
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Giá trị chia sẻ cho toàn bộ app
  const value = {
    user,       // Thông tin user đang đăng nhập (null nếu chưa đăng nhập)
    loading,    // true khi đang kiểm tra token lúc khởi động
    login,      // Hàm đăng nhập
    register,   // Hàm đăng ký
    logout,     // Hàm đăng xuất
    isAuthenticated: !!user, // true nếu đã đăng nhập
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
