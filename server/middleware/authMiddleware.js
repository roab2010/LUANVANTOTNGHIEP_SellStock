const jwt = require('jsonwebtoken');

// Middleware xác thực token JWT
const authenticateToken = (req, res, next) => {
  // Lấy token từ header Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Vui lòng đăng nhập để tiếp tục',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Gắn thông tin user vào request
    req.user = decoded; // { userId, role }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ hoặc đã hết hạn',
    });
  }
};

module.exports = { authenticateToken };
