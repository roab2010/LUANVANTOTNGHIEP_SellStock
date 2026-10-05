# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Admin (Quản trị viên):** Người quản lý toàn bộ hệ thống — quản lý sản phẩm, danh mục, nhà cung cấp, kho hàng, nhập hàng, đơn hàng, khách hàng và xem thống kê doanh thu. Tài khoản admin được tạo bằng seed script, không có đăng ký public.

**Customer (Khách hàng):** Người mua hàng online — đăng ký, đăng nhập, duyệt sản phẩm, thêm giỏ hàng, đặt hàng và theo dõi đơn hàng. Đăng ký public, role luôn = "customer".

Chỉ có 2 role. Không có role Staff hay nhân viên.

## Product Purpose

Hệ thống quản lý bán hàng và kho hàng trên nền tảng web — đồ án luận văn tốt nghiệp ngành CNTT. Đây là hệ thống mô phỏng (không phải cửa hàng thật), bán hàng tổng hợp (nhiều loại sản phẩm).

**Điểm nhấn đồ án:** Quản lý kho hàng + bán hàng — hai phần này cần được triển khai đầy đủ và chỉn chu nhất.

**Thành công:** Đồ án có đầy đủ tính năng CRUD, giao diện đẹp, code sạch và dễ hiểu, phù hợp để trình bày bảo vệ luận văn.

## Positioning

Hệ thống web all-in-one cho quản lý bán hàng + kho hàng dành cho cửa hàng nhỏ. Kết hợp cả 2 phía: admin quản lý vận hành và customer mua hàng online, trên cùng một nền tảng.

## Operating Context

- Admin truy cập qua giao diện `/admin/*` — dashboard, quản lý sản phẩm, kho, đơn hàng, thống kê.
- Customer truy cập qua giao diện `/customer/*` — duyệt sản phẩm, giỏ hàng, checkout, theo dõi đơn hàng.
- Dữ liệu lưu trên MongoDB Atlas (cloud), đồng bộ cho cả nhóm.
- Dự án nhóm, chạy local bằng 2 terminal: `server` (port 5000) + `client` (port 5173).

## Capabilities and Constraints

### Đã triển khai
- Authentication: đăng ký, đăng nhập, JWT token, kiểm tra quyền.
- 2 middleware: authenticateToken, requireAdmin.
- Protected routes theo role.

### Sẽ triển khai (theo template Products)
- Quản lý sản phẩm (template chuẩn CRUD)
- Quản lý danh mục, nhà cung cấp, kho, nhập hàng
- Giỏ hàng, đặt hàng, quản lý đơn hàng
- Dashboard thống kê doanh thu
- Quản lý tài khoản

### Ràng buộc kỹ thuật (không thay đổi)
- React + Tailwind CSS v4 + Vite | Node.js + Express + Mongoose + MongoDB Atlas
- JWT + bcryptjs cho authentication
- Axios làm HTTP client
- Không gradient, không over-engineering
- Code dễ hiểu, phù hợp sinh viên
- Triển khai CRUD theo template pattern (Products làm mẫu)

## Brand Commitments

- Tên hệ thống: Quản Lý Bán Hàng
- Ngôn ngữ giao diện: **Tiếng Việt hoàn toàn** (UI, thông báo lỗi, placeholder, label, button)
- Tông màu chủ đạo: Xanh dương chuyên nghiệp (indigo/blue)
- Nền sáng, clean, hiện đại, tối giản
- Không gradient
- Micro-animations (hover effects, transitions)
- Shadow, rounded corners

## Evidence on Hand

- PROJECT_RULES.md: quy tắc toàn bộ dự án
- Auth module hoàn chỉnh: User model, authController, authRoutes, middleware, LoginPage, RegisterPage
- Admin seed script: tài khoản test admin@quanlybanhang.com / Admin@123
- Chưa có logo hoặc hình ảnh thương hiệu

## Product Principles

1. **Đồng nhất trước tiên:** Mọi module CRUD dùng chung cấu trúc, cách đặt tên, pattern — Products là template chuẩn.
2. **Dễ hiểu, dễ bảo trì:** Code phải phù hợp trình độ sinh viên, không abstraction phức tạp.
3. **Kho hàng + bán hàng là trung tâm:** Hai phần này cần được hoàn thiện chỉn chu nhất.
4. **Tiếng Việt xuyên suốt:** Mọi thông báo, label, lỗi đều bằng tiếng Việt.
5. **Không viết lại, chỉ mở rộng:** Bảo vệ code đang hoạt động, chỉ thêm module mới theo template.

## Accessibility & Inclusion

- Giao diện hoàn toàn tiếng Việt.
- Responsive (mobile-first).
- Không có yêu cầu accessibility đặc biệt ngoài tiêu chuẩn web cơ bản.
