import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../../../services/productApi';

// ============================================
// ICON COMPONENTS
// ============================================
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value || 0);
};

// ============================================
// PRODUCT FORM MODAL COMPONENT
// ============================================
const ProductFormModal = ({ product, onClose, onSuccess }) => {
  const isEditing = !!product;

  // State form
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    costPrice: '',
    profitMargin: '',
    stock: '',
    unit: 'cái',
    category: '',
    status: 'active',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load dữ liệu khi chỉnh sửa
  useEffect(() => {
    if (product) {
      const cost = product.costPrice || 0;
      const price = product.price || 0;
      let margin = '';
      if (cost > 0) {
        margin = (((price - cost) / cost) * 100).toFixed(2);
        // Remove trailing zeroes if it's a whole number
        margin = parseFloat(margin).toString();
      } else if (cost === 0 && price > 0) {
         // handle edge case where cost is 0 but price is > 0
         margin = '100'; 
      }

      setFormData({
        name: product.name || '',
        description: product.description || '',
        costPrice: cost.toString() || '',
        profitMargin: margin,
        stock: product.stock?.toString() || '',
        unit: product.unit || 'cái',
        category: product.category || '',
        status: product.status || 'active',
      });
    }
  }, [product]);

  // Derived price
  const cost = Number(formData.costPrice) || 0;
  const margin = Number(formData.profitMargin) || 0;
  const calculatedPrice = cost + (cost * margin) / 100;

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  // Validate form phía frontend
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên sản phẩm');
      return false;
    }
    
    const costPriceNum = Number(formData.costPrice);
    if (formData.costPrice === '' || costPriceNum < 10000 || costPriceNum > 1000000000) {
      setError('Giá nhập phải từ 10,000 đến 1,000,000,000 ₫');
      return false;
    }

    const profitMarginNum = Number(formData.profitMargin);
    if (formData.profitMargin === '' || profitMarginNum < 0 || profitMarginNum > 1000) {
      setError('Phần trăm lợi nhuận phải từ 0 đến 1000%');
      return false;
    }

    if (formData.stock && Number(formData.stock) < 0) {
      setError('Số lượng không được âm');
      return false;
    }
    return true;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: calculatedPrice,
        costPrice: cost,
        stock: formData.stock ? Number(formData.stock) : 0,
        unit: formData.unit.trim() || 'cái',
        category: formData.category.trim(),
        status: isEditing ? formData.status : 'active',
      };

      if (isEditing) {
        await updateProduct(product._id, payload);
      } else {
        await createProduct(payload);
      }

      onSuccess();
    } catch (err) {
      const message = err.response?.data?.message || (isEditing ? 'Cập nhật thất bại' : 'Tạo sản phẩm thất bại');
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 animate-fade-in" onClick={() => !loading && onClose()} />

      {/* Modal */}
      <div className="relative bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-modal)] w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            aria-label="Đóng"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-danger-50 border border-red-200 rounded-lg animate-slide-down" role="alert">
            <p className="text-sm text-danger-700 font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tên sản phẩm */}
          <div>
            <label htmlFor="pf-name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Tên sản phẩm <span className="text-danger-500">*</span>
            </label>
            <input
              id="pf-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm"
              autoFocus
              className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15 transition-all duration-200"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label htmlFor="pf-description" className="block text-sm font-medium text-gray-700 mb-1.5">
              Mô tả
            </label>
            <textarea
              id="pf-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả ngắn về sản phẩm"
              rows={3}
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15 transition-all duration-200 resize-none"
            />
          </div>

          {/* Giá nhập + Phần trăm lợi nhuận */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="pf-costPrice" className="block text-sm font-medium text-gray-700 mb-1.5">
                Giá nhập (₫) <span className="text-danger-500">*</span>
              </label>
              <input
                id="pf-costPrice"
                name="costPrice"
                type="number"
                min="10000"
                max="1000000000"
                value={formData.costPrice}
                onChange={handleChange}
                placeholder="0"
                className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15 transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="pf-profitMargin" className="block text-sm font-medium text-gray-700 mb-1.5">
                Lợi nhuận (%) <span className="text-danger-500">*</span>
              </label>
              <input
                id="pf-profitMargin"
                name="profitMargin"
                type="number"
                min="0"
                max="1000"
                step="0.01"
                value={formData.profitMargin}
                onChange={handleChange}
                placeholder="Ví dụ: 20"
                className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15 transition-all duration-200"
              />
            </div>
          </div>

          {/* Giá bán preview */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Giá bán dự kiến:</span>
            <span className="text-lg font-bold text-teal-600">{formatCurrency(calculatedPrice)}</span>
          </div>

          {/* Số lượng + Đơn vị */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="pf-stock" className="block text-sm font-medium text-gray-700 mb-1.5">
                Số lượng
              </label>
              <input
                id="pf-stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15 transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="pf-unit" className="block text-sm font-medium text-gray-700 mb-1.5">
                Đơn vị tính
              </label>
              <input
                id="pf-unit"
                name="unit"
                type="text"
                value={formData.unit}
                onChange={handleChange}
                placeholder="cái, hộp, kg..."
                className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15 transition-all duration-200"
              />
            </div>
          </div>

          {/* Danh mục + Trạng thái */}
          <div className="grid grid-cols-2 gap-4">
            <div className={!isEditing ? "col-span-2" : ""}>
              <label htmlFor="pf-category" className="block text-sm font-medium text-gray-700 mb-1.5">
                Danh mục
              </label>
              <input
                id="pf-category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                placeholder="Nhập danh mục"
                className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15 transition-all duration-200"
              />
            </div>
            {isEditing && (
              <div>
                <label htmlFor="pf-status" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Trạng thái
                </label>
                <select
                  id="pf-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-10 px-3.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15 transition-all duration-200"
                >
                  <option value="active">Đang bán</option>
                  <option value="inactive">Ngừng bán</option>
                </select>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="h-10 px-5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none flex items-center gap-2"
            >
              {loading ? (
                <>
                  <SpinnerIcon />
                  <span>Đang lưu...</span>
                </>
              ) : isEditing ? (
                'Cập nhật'
              ) : (
                'Tạo sản phẩm'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
