const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load biến môi trường từ .env
dotenv.config();

// Kết nối MongoDB
connectDB();

const app = express();

// --- Middleware ---
app.use(cors()); // Cho phép frontend gọi API
app.use(express.json()); // Parse JSON body

// --- Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Route test server
app.get('/', (req, res) => {
  res.json({ message: 'API Quản Lý Bán Hàng đang chạy' });
});

// --- Khởi động server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
