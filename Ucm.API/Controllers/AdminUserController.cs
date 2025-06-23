using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ucm.Application.DTOs.Auth;
using Ucm.Application.IServices;
using Ucm.Infrastructure.Data.Models;
using Ucm.Shared.Results;

namespace Ucm.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
  
    public class AdminUserController : ControllerBase
    {
        private readonly UserManager<AppUserEF> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly IAuthService _authService;

        public AdminUserController(UserManager<AppUserEF> userManager, RoleManager<IdentityRole<Guid>> roleManager, IAuthService authService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _authService = authService;
        }

        [HttpGet]
        public async Task<ActionResult<Result<IEnumerable<object>>>> GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            var userList = new List<object>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                userList.Add(new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    user.FullName,
                    Roles = roles,
                    user.EmailConfirmed
                });
            }

            return Ok(Result<IEnumerable<object>>.Ok(userList));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Result<object>>> GetUserById(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return NotFound(Result<object>.Fail("User not found"));

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(Result<object>.Ok(new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.FullName,
                user.EmailConfirmed,
                Roles = roles
            }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(Result.Ok("Thêm mới thành công"));
        }
        //[HttpPost]
        //public async Task<ActionResult<Result<object>>> CreateUser([FromBody] CreateUserDto dto)
        //{
        //    var user = new AppUserEF
        //    {
        //        UserName = dto.UserName,
        //        Email = dto.Email,
        //        FullName = dto.FullName,
        //        EmailConfirmed = true
        //    };
        //    var result = await _userManager.CreateAsync(user, dto.Password);
        //    if (!result.Succeeded)
        //        return BadRequest(Result<object>.Fail(string.Join(", ", result.Errors.Select(e => e.Description))));

        //    if (!string.IsNullOrEmpty(dto.Role))
        //    {
        //        if (!await _roleManager.RoleExistsAsync(dto.Role))
        //            await _roleManager.CreateAsync(new IdentityRole<Guid>(dto.Role));
        //        await _userManager.AddToRoleAsync(user, dto.Role);
        //    }

        //    return Ok(Result<object>.Ok(new { user.Id, user.UserName, user.Email, user.FullName }, "User created"));
        //}

        [HttpPut("{id}")]
        public async Task<ActionResult<Result>> UpdateUser(Guid id, [FromBody] UpdateUserDto dto)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return NotFound(Result.Fail("User not found"));

            user.FullName = dto.FullName ?? user.FullName;
            user.Email = dto.Email ?? user.Email;
            user.UserName = dto.UserName ?? user.UserName;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(Result.Fail(string.Join(", ", result.Errors.Select(e => e.Description))));

            return Ok(Result.Ok("User updated"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Result>> DeleteUser(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return NotFound(Result.Fail("User not found"));

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(Result.Fail(string.Join(", ", result.Errors.Select(e => e.Description))));

            return Ok(Result.Ok("User deleted"));
        }

        [HttpPost("{id}/roles")]
        public async Task<ActionResult<Result>> AssignRole(Guid id, [FromBody] AssignRoleDto dto)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return NotFound(Result.Fail("User not found"));

            if (!await _roleManager.RoleExistsAsync(dto.Role))
                await _roleManager.CreateAsync(new IdentityRole<Guid>(dto.Role));

            var result = await _userManager.AddToRoleAsync(user, dto.Role);
            if (!result.Succeeded)
                return BadRequest(Result.Fail(string.Join(", ", result.Errors.Select(e => e.Description))));

            return Ok(Result.Ok("Role assigned"));
        }
    }

    // DTOs for user management
    public class CreateUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } // Optional
    }

    public class UpdateUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }

    public class AssignRoleDto
    {
        public string Role { get; set; }
    }
}