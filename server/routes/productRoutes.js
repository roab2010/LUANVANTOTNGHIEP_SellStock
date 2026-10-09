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
const { upload } = require('../config/cloudinary');

// Tất cả routes đều yêu cầu đăng nhập + quyền admin
router.use(authenticateToken, requireAdmin);

// CRUD routes
router.get('/', getProducts);           // Lấy danh sách (có search, filter, phân trang)
router.get('/:id', getProductById);     // Lấy chi tiết

// Thêm middleware upload.single('image') cho các API có ảnh
router.post('/', upload.single('image'), createProduct);        // Tạo mới
router.put('/:id', upload.single('image'), updateProduct);      // Cập nhật

router.delete('/:id', deleteProduct);   // Xóa

// Xử lý lỗi từ Multer
router.use((err, req, res, next) => {
  if (err.name === 'MulterError' || err.message.includes('định dạng')) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Lỗi tải ảnh lên',
    });
  }
  next(err);
});

module.exports = router;
