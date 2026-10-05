const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');

// Tất cả routes đều yêu cầu đăng nhập + quyền admin
router.use(authenticateToken, requireAdmin);

// CRUD routes
router.get('/', getProducts);           // Lấy danh sách (có search, filter, phân trang)
router.get('/:id', getProductById);     // Lấy chi tiết
router.post('/', createProduct);        // Tạo mới
router.put('/:id', updateProduct);      // Cập nhật
router.delete('/:id', deleteProduct);   // Xóa

module.exports = router;
