# Tài liệu API TLU Planner - Hệ thống hoàn chỉnh

## Thông tin cơ bản

- **Base URL**: `https://your-domain.com/api` hoặc `http://localhost:5000/api`
- **Authentication**: JWT Bearer Token
- **Content-Type**: `application/json`
- **API Version**: v1

## 🔐 Authentication

### Đăng ký tài khoản
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "student123",
  "email": "student@tlu.edu.vn",
  "password": "Password123!",
  "fullName": "Nguyễn Văn A"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đăng kí thành công",
  "data": null
}
```

### Đăng nhập
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "username": "student123",
  "password": "Password123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "student123",
    "fullName": "Nguyễn Văn A",
    "email": "student@tlu.edu.vn",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Test Authentication
```http
GET /api/auth/authenticated
Authorization: Bearer {token}
```

### Test Admin Role
```http
GET /api/auth/admin-only
Authorization: Bearer {token}
```

### Test User Role
```http
GET /api/auth/user-only
Authorization: Bearer {token}
```

## 📚 Study Plans (Kế hoạch học tập)

### Lấy tất cả kế hoạch học tập
```http
GET /api/studyplan
Authorization: Bearer {token}
```

### Lấy kế hoạch học tập với thông tin khóa học
```http
GET /api/studyplan/with-courses
Authorization: Bearer {token}
```

### Lấy kế hoạch học tập theo ID
```http
GET /api/studyplan/{id}
Authorization: Bearer {token}
```

### Lấy kế hoạch học tập của user hiện tại
```http
GET /api/studyplan/user
Authorization: Bearer {token}
```

### Lấy kế hoạch học tập của user (Admin)
```http
GET /api/studyplan/user/{userId}
Authorization: Bearer {token}
```

### Tạo kế hoạch học tập mới
```http
POST /api/studyplan
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "planName": "Kế hoạch học kỳ 1 năm 2024",
  "startDate": "2024-09-01",
  "endDate": "2024-12-31",
  "semester": 1,
  "academicYear": "2024-2025",
  "weeklyStudyGoalHours": 20
}
```

### Cập nhật kế hoạch học tập
```http
PUT /api/studyplan/{id}
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "id": 1,
  "planName": "Kế hoạch học kỳ 1 năm 2024 (Cập nhật)",
  "startDate": "2024-09-01",
  "endDate": "2024-12-31",
  "semester": 1,
  "academicYear": "2024-2025",
  "weeklyStudyGoalHours": 25,
  "completed": false
}
```

### Xóa kế hoạch học tập
```http
DELETE /api/studyplan/{id}
Authorization: Bearer {token}
```

### Lấy tổng quan kế hoạch học tập của user
```http
GET /api/studyplan/user-summary
Authorization: Bearer {token}
```

### Lấy tổng quan kế hoạch học tập (Admin)
```http
GET /api/studyplan/admin-summary
Authorization: Bearer {token}
```

## 📝 Study Tasks (Nhiệm vụ học tập)

### Lấy tất cả nhiệm vụ học tập
```http
GET /api/studytask
Authorization: Bearer {token}
```

### Lấy nhiệm vụ học tập theo ID
```http
GET /api/studytask/{id}
Authorization: Bearer {token}
```

### Lấy nhiệm vụ học tập hôm nay
```http
GET /api/studytask/today
Authorization: Bearer {token}
```

### Lấy nhiệm vụ học tập theo ngày
```http
GET /api/studytask/day/{date}
Authorization: Bearer {token}
```

**Parameters:**
- `date`: Format `yyyy-MM-dd` (VD: `2024-01-15`)

### Lấy nhiệm vụ học tập theo tuần
```http
GET /api/studytask/week/{weekStart}
Authorization: Bearer {token}
```

**Parameters:**
- `weekStart`: Ngày đầu tuần format `yyyy-MM-dd`

### Lấy nhiệm vụ học tập theo tháng
```http
GET /api/studytask/month/{year}/{month}
Authorization: Bearer {token}
```

### Lấy nhiệm vụ học tập sắp tới
```http
GET /api/studytask/upcoming?days=7
Authorization: Bearer {token}
```

**Query Parameters:**
- `days`: Số ngày sắp tới (mặc định: 7)

### Lấy nhiệm vụ học tập quá hạn
```http
GET /api/studytask/overdue
Authorization: Bearer {token}
```

### Lấy nhiệm vụ học tập theo trạng thái
```http
GET /api/studytask/status/{status}
Authorization: Bearer {token}
```

**Status values:**
- `Pending`: Chờ thực hiện
- `InProgress`: Đang thực hiện
- `Completed`: Hoàn thành
- `Overdue`: Quá hạn

### Lấy nhiệm vụ học tập theo kế hoạch
```http
GET /api/studytask/plan/{studyPlanId}
Authorization: Bearer {token}
```

### Tạo nhiệm vụ học tập mới
```http
POST /api/studytask
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "taskName": "Làm bài tập chương 1",
  "description": "Hoàn thành bài tập về thuật toán",
  "dueDate": "2024-01-20T10:00:00",
  "priority": "High",
  "studyPlanId": 1,
  "planCourseId": 1,
  "estimatedHours": 2
}
```

### Cập nhật nhiệm vụ học tập
```http
PUT /api/studytask/{id}
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "id": 1,
  "taskName": "Làm bài tập chương 1 (Cập nhật)",
  "description": "Hoàn thành bài tập về thuật toán",
  "dueDate": "2024-01-20T10:00:00",
  "priority": "High",
  "status": "InProgress",
  "estimatedHours": 2,
  "actualHours": 1.5
}
```

### Xóa nhiệm vụ học tập
```http
DELETE /api/studytask/{id}
Authorization: Bearer {token}
```

## 📖 Courses (Khóa học)

### Lấy danh sách khóa học có phân trang
```http
GET /api/course/paged?pageNumber=1&pageSize=10
```

### Lấy khóa học theo ID
```http
GET /api/course/{id}
```

### Tạo khóa học mới (Admin)
```http
POST /api/course
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "courseName": "Lập trình Web",
  "credits": 3,
  "description": "Học về HTML, CSS, JavaScript và các framework web"
}
```

### Cập nhật khóa học (Admin)
```http
PUT /api/course/{id}
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "courseName": "Lập trình Web nâng cao",
  "credits": 4,
  "description": "Học về HTML, CSS, JavaScript và các framework web hiện đại"
}
```

### Xóa khóa học (Admin)
```http
DELETE /api/course/{id}
Authorization: Bearer {token}
```

## 📚 Course Topics (Chủ đề khóa học)

### Lấy tất cả chủ đề khóa học
```http
GET /api/coursetopic
```

### Lấy chủ đề khóa học theo ID
```http
GET /api/coursetopic/{id}
```

### Lấy chủ đề theo khóa học
```http
GET /api/coursetopic/course/{courseId}
```

### Tạo chủ đề khóa học mới
```http
POST /api/coursetopic
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "topicName": "HTML cơ bản",
  "description": "Học về cấu trúc HTML",
  "courseId": 1,
  "orderIndex": 1
}
```

### Cập nhật chủ đề khóa học
```http
PUT /api/coursetopic/{id}
Authorization: Bearer {token}
```

### Xóa chủ đề khóa học
```http
DELETE /api/coursetopic/{id}
Authorization: Bearer {token}
```

## 📋 Study Plan Courses (Khóa học trong kế hoạch)

### Lấy tất cả khóa học trong kế hoạch
```http
GET /api/studyplancourse
Authorization: Bearer {token}
```

### Lấy khóa học trong kế hoạch theo ID
```http
GET /api/studyplancourse/{id}
Authorization: Bearer {token}
```

### Lấy khóa học theo kế hoạch
```http
GET /api/studyplancourse/plan/{studyPlanId}
Authorization: Bearer {token}
```

### Thêm khóa học vào kế hoạch
```http
POST /api/studyplancourse
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "studyPlanId": 1,
  "courseId": 1,
  "startDate": "2024-09-01",
  "endDate": "2024-12-31",
  "weeklyStudyHours": 5
}
```

### Cập nhật khóa học trong kế hoạch
```http
PUT /api/studyplancourse/{id}
Authorization: Bearer {token}
```

### Xóa khóa học khỏi kế hoạch
```http
DELETE /api/studyplancourse/{id}
Authorization: Bearer {token}
```

## 📊 Study Logs (Nhật ký học tập)

### Lấy tất cả nhật ký học tập
```http
GET /api/studylog
Authorization: Bearer {token}
```

### Lấy nhật ký học tập theo ID
```http
GET /api/studylog/{id}
Authorization: Bearer {token}
```

### Tạo nhật ký học tập mới
```http
POST /api/studylog
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "studyTaskId": 1,
  "studyDate": "2024-01-15",
  "startTime": "2024-01-15T09:00:00",
  "endTime": "2024-01-15T11:00:00",
  "studyHours": 2,
  "notes": "Hoàn thành bài tập chương 1",
  "efficiency": 8
}
```

### Cập nhật nhật ký học tập
```http
PUT /api/studylog/{id}
Authorization: Bearer {token}
```

### Xóa nhật ký học tập
```http
DELETE /api/studylog/{id}
Authorization: Bearer {token}
```

## 📎 Task Resources (Tài nguyên nhiệm vụ)

### Lấy tất cả tài nguyên nhiệm vụ
```http
GET /api/taskresource
Authorization: Bearer {token}
```

### Lấy tài nguyên nhiệm vụ theo ID
```http
GET /api/taskresource/{id}
Authorization: Bearer {token}
```

### Lấy tài nguyên theo nhiệm vụ
```http
GET /api/taskresource/task/{studyTaskId}
Authorization: Bearer {token}
```

### Tạo tài nguyên nhiệm vụ mới
```http
POST /api/taskresource
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "studyTaskId": 1,
  "resourceName": "Slide bài giảng chương 1",
  "resourceType": "Document",
  "resourceUrl": "https://example.com/slide-ch1.pdf",
  "description": "Slide bài giảng về thuật toán cơ bản"
}
```

### Cập nhật tài nguyên nhiệm vụ
```http
PUT /api/taskresource/{id}
Authorization: Bearer {token}
```

### Xóa tài nguyên nhiệm vụ
```http
DELETE /api/taskresource/{id}
Authorization: Bearer {token}
```

## 👥 Admin User Management (Quản lý người dùng - Admin)

### Lấy tất cả người dùng
```http
GET /api/adminuser
Authorization: Bearer {token}
```

### Lấy người dùng theo ID
```http
GET /api/adminuser/{id}
Authorization: Bearer {token}
```

### Tạo người dùng mới
```http
POST /api/adminuser
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@tlu.edu.vn",
  "password": "Password123!",
  "fullName": "Nguyễn Văn B"
}
```

### Cập nhật thông tin người dùng
```http
PUT /api/adminuser/{id}
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "username": "updateduser",
  "email": "updated@tlu.edu.vn",
  "fullName": "Nguyễn Văn B (Cập nhật)"
}
```

### Xóa người dùng
```http
DELETE /api/adminuser/{id}
Authorization: Bearer {token}
```

### Gán vai trò cho người dùng
```http
POST /api/adminuser/{id}/roles
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "role": "Admin"
}
```

## 🔧 Cấu hình và Triển khai

### Cấu hình JWT
```json
{
  "Jwt": {
    "Key": "your-super-secret-key-here-minimum-16-characters",
    "Issuer": "TLUPlanner",
    "Audience": "TLUPlannerUsers",
    "ExpiryInMinutes": 60
  }
}
```

### Cấu hình Database
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=TLUPlannerDB;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

### Swagger UI
Truy cập Swagger UI tại: `https://your-domain.com/swagger`

## 📋 Mã lỗi HTTP

- `200 OK`: Thành công
- `201 Created`: Tạo mới thành công
- `400 Bad Request`: Dữ liệu đầu vào không hợp lệ
- `401 Unauthorized`: Chưa xác thực hoặc token không hợp lệ
- `403 Forbidden`: Không có quyền truy cập
- `404 Not Found`: Không tìm thấy tài nguyên
- `500 Internal Server Error`: Lỗi server

## 🔒 Bảo mật

1. **JWT Token**: Sử dụng Bearer token trong header Authorization
2. **Role-based Access**: Phân quyền theo vai trò (Admin/User)
3. **Input Validation**: Kiểm tra dữ liệu đầu vào
4. **CORS**: Cấu hình Cross-Origin Resource Sharing

## 📱 Mobile App Endpoints

Các endpoint sau được tối ưu cho ứng dụng mobile:

- `GET /api/studytask/today` - Nhiệm vụ hôm nay
- `GET /api/studytask/upcoming` - Nhiệm vụ sắp tới
- `GET /api/studytask/overdue` - Nhiệm vụ quá hạn
- `GET /api/studyplan/user-summary` - Tổng quan kế hoạch

## 🚀 Triển khai

### Docker
```bash
docker build -t tlu-planner-api .
docker run -p 5000:5000 tlu-planner-api
```

### Local Development
```bash
cd Ucm.API
dotnet restore
dotnet run
```

### Production
```bash
dotnet publish -c Release
dotnet Ucm.API.dll
```

## 📞 Hỗ trợ

- **Email**: support@tlu.edu.vn
- **Documentation**: https://your-domain.com/swagger
- **GitHub**: https://github.com/your-repo/tlu-planner-api
