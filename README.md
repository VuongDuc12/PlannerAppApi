📦 UCM Clean Architecture Backend
Dự án UCM Backend được xây dựng theo mô hình Clean Architecture, sử dụng ASP.NET Core Web API, Entity Framework Core, JWT Authentication, và hỗ trợ mở rộng dễ dàng theo các best practices.

🔧 Cấu trúc dự án
Dự án được tổ chức theo các tầng của Clean Architecture để đảm bảo tính phân tách rõ ràng và khả năng bảo trì:

Ucm.API: Project khởi chạy API chính (Startup Project). Đây là điểm vào cho các yêu cầu HTTP.

Ucm.Application: Chứa các logic nghiệp vụ cốt lõi (Use Cases), các đối tượng truyền dữ liệu (DTOs), các giao diện (Interfaces) cho các dịch vụ ứng dụng, v.v.

Ucm.Domain: Định nghĩa các thực thể thuần (Entities), Enum, Value Objects, và các quy tắc nghiệp vụ cốt lõi không phụ thuộc vào bất kỳ công nghệ nào.

Ucm.Infrastructure: Thực thi các giao diện Repository, cài đặt Entity Framework Core DbContext, và cấu hình cơ sở dữ liệu. Tầng này chứa các chi tiết triển khai cụ thể.

Ucm.Shared: Chứa các thư viện và tiện ích dùng chung (Constants, Helpers, Extensions methods, v.v.) được sử dụng xuyên suốt các tầng.

Ucm.Tests: Chứa các dự án kiểm thử (Unit Tests, Integration Tests) cho các tầng của ứng dụng.

Lưu ý về Dependency Injection: Mỗi dự án (Ucm.Application, Ucm.Infrastructure) chịu trách nhiệm đăng ký các dịch vụ (services) và phụ thuộc (dependencies) của riêng mình thông qua các phương thức mở rộng (extension methods), sau đó được tích hợp vào Ucm.API. Điều này đảm bảo tính modular và tuân thủ nguyên tắc tách biệt mối quan tâm.

🚀 Công nghệ sử dụng
Dự án tận dụng các công nghệ và thư viện hiện đại để đảm bảo hiệu suất, bảo mật và khả năng mở rộng:

ASP.NET Core 8: Nền tảng phát triển web mạnh mẽ và hiệu quả của Microsoft.

Entity Framework Core: ORM (Object-Relational Mapper) giúp tương tác với cơ sở dữ liệu.

SQL Server: Hệ quản trị cơ sở dữ liệu quan hệ được sử dụng để lưu trữ dữ liệu.

JWT Authentication: JSON Web Tokens được sử dụng để xác thực và ủy quyền người dùng.

Clean Architecture: Mô hình kiến trúc phần mềm giúp phân tách các mối quan tâm, làm cho mã nguồn dễ kiểm thử, bảo trì và mở rộng.

Swagger UI: Cung cấp giao diện người dùng để khám phá và thử nghiệm các API endpoint.

AutoMapper: Thư viện giúp đơn giản hóa việc ánh xạ đối tượng giữa các lớp.

FluentValidation: Thư viện giúp định nghĩa và thực thi các quy tắc xác thực (validation rules) cho các đối tượng.

⚙️ Cài đặt & chạy dự án
Làm theo các bước dưới đây để thiết lập và chạy dự án trên máy cục bộ của bạn:

Clone repository:

git clone https://github.com/your-username/ucm-backend.git
cd ucm-backend

Cấu hình appsettings.Development.json:
Tạo một file mới tên appsettings.Development.json trong thư mục Ucm.API/ (file này đã được .gitignore để không bị đẩy lên Git) với nội dung sau:

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=UcmDb;User Id=sa;Password=123456;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "your-secret-key",
    "Issuer": "UcmDbServer",
    "Audience": "UcmDbClient"
  }
}

Cài đặt gói phụ thuộc:

dotnet restore

Tạo và cập nhật database:
Sử dụng Entity Framework Core Migrations để tạo hoặc cập nhật cơ sở dữ liệu.

dotnet ef migrations add InitialCreate -p Ucm.Infrastructure -s Ucm.API
dotnet ef database update -p Ucm.Infrastructure -s Ucm.API

Chạy ứng dụng:

dotnet run --project Ucm.API

🔑 Tài khoản mặc định (dành cho testing)
Để thuận tiện cho việc kiểm thử, bạn có thể sử dụng tài khoản mặc định sau:

{
  "username": "sa",
  "password": "123456"
}

Lưu ý: Bạn có thể thay đổi thông tin đăng nhập này trong cơ sở dữ liệu hoặc khi tích hợp hệ thống Identity phức tạp hơn.

🔐 Swagger UI
Sau khi ứng dụng chạy thành công, bạn có thể truy cập Swagger UI để xem tài liệu API và gửi các yêu cầu kiểm thử:

https://localhost:5001/swagger

📁 Ghi chú về bảo mật
Để đảm bảo an toàn cho dự án, vui lòng tuân thủ các nguyên tắc sau:

Không đẩy file appsettings.Development.json lên Git (file này đã được .gitignore).

Không lưu Jwt:Key hoặc chuỗi kết nối cơ sở dữ liệu thật (ConnectionStrings) vào các repository công khai.

Mỗi môi trường (Development, Staging, Production) nên có một file appsettings.{Environment}.json riêng biệt với các cấu hình tương ứng.

🛠 Đang phát triển
Các tính năng và cải tiến đang được phát triển bao gồm:

API xác thực (Auth) với Identity + JWT

Quản lý người dùng

Hệ thống phân quyền (Role & Permissions)

Chức năng CRUD (Create, Read, Update, Delete) cho các entity chính (ví dụ: Match, Transaction)

Viết Unit Test cho các tầng và logic nghiệp vụ

💡 Đóng góp
Mọi ý kiến đóng góp, đề xuất tính năng (Pull Request) hoặc báo lỗi (Issue) đều được hoan nghênh và khuyến khích!

📜 License
Dự án này được cấp phép theo Giấy phép MIT.

© 2025 Duc Dev