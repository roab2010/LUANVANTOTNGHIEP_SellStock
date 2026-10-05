import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CustomerHome from './pages/customer/CustomerHome';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* === Routes công khai === */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* === Routes Customer (cần đăng nhập + role customer) === */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute role="customer">
                <CustomerHome />
              </ProtectedRoute>
            }
          />

          {/* === Routes Admin (cần đăng nhập + role admin) === */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* === Trang mặc định → Login === */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* === 404 → Login === */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
