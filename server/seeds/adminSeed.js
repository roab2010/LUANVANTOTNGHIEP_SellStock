/**
 * Script tạo tài khoản Admin mặc định
 * Chạy: node seeds/adminSeed.js
 * Chỉ cần chạy 1 lần
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env từ thư mục server
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');

const seedAdmin = async () => {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Đã kết nối MongoDB');

    // Kiểm tra admin đã tồn tại chưa
    const existingAdmin = await User.findOne({ email: 'admin@quanlybanhang.com' });
    if (existingAdmin) {
      console.log('Tài khoản Admin đã tồn tại!');
      console.log('Email: admin@quanlybanhang.com');
      process.exit(0);
    }

    // Tạo tài khoản Admin
    const admin = await User.create({
      fullName: 'Quản Trị Viên',
      email: 'admin@quanlybanhang.com',
      password: 'Admin@123', // Sẽ được hash tự động
      phone: '0123456789',
      role: 'admin',
      status: 'active',
    });

    console.log('========================================');
    console.log('Tạo tài khoản Admin thành công!');
    console.log('========================================');
    console.log('Email:    admin@quanlybanhang.com');
    console.log('Password: Admin@123');
    console.log('Role:     admin');
    console.log('========================================');

    process.exit(0);
  } catch (error) {
    console.error('Lỗi tạo Admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
