using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Ucm.Application.DTOs.Auth;
using Ucm.Application.IServices;
using Ucm.Shared.Results;

namespace Ucm.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // ---------- Đăng ký ----------
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(Result.Ok("Đăng kí thành công"));
        }

        // ---------- Đăng nhập ----------
        [HttpPost("login")]
      
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.LoginAsync(request);

            if (!result.Success)
                return Unauthorized(new { message = result.Message });

            var user = await _authService.GetUserAsync(request.Username); // lấy user info
            
            var data = new AuthResponse
            {
                Id = user.Id,
                Username = user.Username,
                FullName = user.FullName,
                Email = user.Email,
                Token = result.Data!
            };

            return Ok(Result<AuthResponse>.Ok(data, "Đăng nhập thành công"));
        }


        // ---------- Test Role: chỉ Admin truy cập ----------
        [HttpGet("admin-only")]
        [Authorize(Roles = "Admin")]
        public IActionResult AdminEndpoint()
        {
            return Ok("🛡️ You are an Admin!");
        }

        // ---------- Test Role: chỉ User truy cập ----------
        [HttpGet("user-only")]
        [Authorize(Roles = "User")]
        public IActionResult UserEndpoint()
        {
            return Ok("👤 You are a User!");
        }

        // ---------- Test Auth: chỉ cần login ----------
        [HttpGet("authenticated")]
        [Authorize]
        public IActionResult AuthenticatedEndpoint()
        {
            var username = User.Identity?.Name;
            return Ok($"✅ You are logged in as {username}");
        }
    }
}
