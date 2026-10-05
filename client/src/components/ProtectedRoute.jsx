import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Component bảo vệ route
 * - Kiểm tra đã đăng nhập chưa
 * - Kiểm tra role (nếu có yêu cầu)
 *
 * Sử dụng:
 *   <ProtectedRoute>            → Chỉ cần đăng nhập
 *   <ProtectedRoute role="admin"> → Phải là admin
 */
const ProtectedRoute = ({ children, role }) => {
  const { user, loading, isAuthenticated } = useAuth();

  // Đang kiểm tra token → hiển thị loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-500">Đang tải...</div>
      </div>
    );
  }

  // Chưa đăng nhập → về trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra role (nếu route yêu cầu role cụ thể)
  if (role && user.role !== role) {
    // Customer cố vào admin → về trang customer
    // Admin cố vào customer → về trang admin
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/customer" replace />;
  }

  return children;
};

export default ProtectedRoute;
