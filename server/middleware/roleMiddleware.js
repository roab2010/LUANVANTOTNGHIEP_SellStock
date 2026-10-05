// Middleware kiểm tra quyền Admin
const requireAdmin = (req, res, next) => {
  // req.user đã được gắn bởi authenticateToken
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền truy cập chức năng này',
    });
  }
  next();
};

module.exports = { requireAdmin };
