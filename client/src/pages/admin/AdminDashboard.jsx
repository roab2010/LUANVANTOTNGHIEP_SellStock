const AdminDashboard = () => {
  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Tổng quan hệ thống quản lý bán hàng</p>
      </div>

      {/* Placeholder cards cho các module */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Sản phẩm', icon: '📦', desc: 'Quản lý sản phẩm', color: 'bg-primary-50 text-primary-700' },
          { name: 'Danh mục', icon: '📂', desc: 'Quản lý danh mục', color: 'bg-blue-50 text-blue-700' },
          { name: 'Đơn hàng', icon: '🛒', desc: 'Quản lý đơn hàng', color: 'bg-green-50 text-green-700' },
          { name: 'Kho hàng', icon: '🏭', desc: 'Quản lý kho', color: 'bg-amber-50 text-amber-700' },
          { name: 'Khách hàng', icon: '👥', desc: 'Quản lý khách hàng', color: 'bg-purple-50 text-purple-700' },
          { name: 'Thống kê', icon: '📊', desc: 'Xem doanh thu', color: 'bg-rose-50 text-rose-700' },
        ].map((item) => (
          <div
            key={item.name}
            className="p-5 bg-white border border-gray-200 rounded-[var(--radius-md)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-200"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${item.color} mb-3`}>
              {item.icon}
            </div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
            <span className="inline-block mt-3 text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">
              Sắp triển khai
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
