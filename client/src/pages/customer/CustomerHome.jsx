import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CustomerHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Cửa hàng</h1>
                <p className="text-xs text-gray-500">Quản Lý Bán Hàng</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg">
                Khách hàng
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-200"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-2xl mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Xin chào, {user?.fullName}!
            </h2>
            <p className="text-gray-500 mb-1">Bạn đã đăng nhập thành công.</p>
            <p className="text-gray-400 text-sm">
              Trang sản phẩm và giỏ hàng sẽ được triển khai trong các giai đoạn tiếp theo.
            </p>
          </div>

          {/* Placeholder sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {[
              { name: 'Sản phẩm', icon: '🛍️', desc: 'Xem và tìm kiếm sản phẩm' },
              { name: 'Giỏ hàng', icon: '🛒', desc: 'Quản lý giỏ hàng' },
              { name: 'Đơn hàng', icon: '📋', desc: 'Theo dõi đơn hàng' },
              { name: 'Tài khoản', icon: '👤', desc: 'Thông tin cá nhân' },
            ].map((item) => (
              <div
                key={item.name}
                className="p-5 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
              >
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-2 font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <span className="inline-block mt-2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                  Sắp triển khai
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerHome;
