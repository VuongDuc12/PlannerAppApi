using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Ucm.Application.DTOs.StudyPlan;
using Ucm.Application.IServices;
using Ucm.Domain.Entities;
using Ucm.Shared.Results;

namespace Ucm.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StudyPlanController : ControllerBase
    {
        private readonly IStudyPlanService _service;

        public StudyPlanController(IStudyPlanService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<Result<IEnumerable<StudyPlan>>>> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(Result<IEnumerable<StudyPlan>>.Ok(result));
        }

        [HttpGet("with-courses")]
        public async Task<ActionResult<Result<IEnumerable<StudyPlan>>>> GetAllWithCourses()
        {
            var result = await _service.GetAllWithCoursesAsync();
            return Ok(Result<IEnumerable<StudyPlan>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Result<StudyPlan>>> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
                return NotFound(Result<StudyPlan>.Fail("Study plan not found"));
            return Ok(Result<StudyPlan>.Ok(result));
        }

        [HttpGet("user")]
        public async Task<ActionResult<Result<IEnumerable<StudyPlan>>>> GetByUserId()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userId))
                return Unauthorized(Result<IEnumerable<StudyPlan>>.Fail("Invalid user token"));

            var result = await _service.GetAllByUserIdAsync(userId);
            return Ok(Result<IEnumerable<StudyPlan>>.Ok(result));
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Result<IEnumerable<StudyPlan>>>> GetByUserIdForAdmin(string userId)
        {
            if (!Guid.TryParse(userId, out var userGuid))
                return BadRequest(Result<IEnumerable<StudyPlan>>.Fail("Invalid user ID format"));

            var result = await _service.GetAllByUserIdAsync(userGuid);
            return Ok(Result<IEnumerable<StudyPlan>>.Ok(result));
        }

        [HttpPost]
        public async Task<ActionResult<Result<StudyPlan>>> Create([FromBody] StudyPlanCreateRequest request)
        {
            if (request == null)
                return BadRequest(Result<StudyPlan>.Fail("Invalid request data"));

            // Lấy userId từ token
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userId))
                return Unauthorized(Result<StudyPlan>.Fail("Invalid user token"));

            var studyPlan = new StudyPlan
            {
                UserId = userId,
                PlanName = request.PlanName,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Semester = request.Semester,
                AcademicYear = request.AcademicYear,
                WeeklyStudyGoalHours = request.WeeklyStudyGoalHours,
                Completed = false
            };

            var created = await _service.CreateAsync(studyPlan);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, Result<StudyPlan>.Ok(created));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Result>> Update(int id, [FromBody] StudyPlanUpdateRequest request)
        {
            if (request == null || id != request.Id)
                return BadRequest(Result.Fail("Invalid request data"));

            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound(Result.Fail("Study plan not found"));

            // Kiểm tra quyền sở hữu
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userId) || existing.UserId != userId)
                return Forbid();

            var studyPlan = new StudyPlan
            {
                Id = id,
                UserId = existing.UserId, // Giữ nguyên userId
                PlanName = request.PlanName,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Semester = request.Semester,
                AcademicYear = request.AcademicYear,
                WeeklyStudyGoalHours = request.WeeklyStudyGoalHours,
                Completed = request.Completed ?? existing.Completed,
                PlanCourses = existing.PlanCourses // Giữ nguyên danh sách courses
            };

            var success = await _service.UpdateAsync(studyPlan);
            if (!success)
                return BadRequest(Result.Fail("Failed to update study plan"));

            return Ok(Result.Ok("Study plan updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Result>> Delete(int id)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound(Result.Fail("Study plan not found"));

            // Kiểm tra quyền sở hữu
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userId) || existing.UserId != userId)
                return Forbid();

            var success = await _service.DeleteAsync(id);
            if (!success)
                return BadRequest(Result.Fail("Failed to delete study plan"));

            return Ok(Result.Ok("Study plan deleted successfully"));
        }

        [HttpGet("test/{id}")]
        public async Task<ActionResult<Result<StudyPlan>>> TestGetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
                return NotFound(Result<StudyPlan>.Fail("Study plan not found"));
            
            // Debug info
            System.Diagnostics.Debug.WriteLine($"API: StudyPlan {id} - PlanCourses: {(result.PlanCourses != null ? result.PlanCourses.Count : 0)}");
            
            return Ok(Result<StudyPlan>.Ok(result));
        }

        [HttpGet("user-summary")]
        public async Task<ActionResult<Result<StudyPlanUserSummaryDto>>> GetUserSummary()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userId))
                return Unauthorized(Result<StudyPlanUserSummaryDto>.Fail("Invalid user token"));

            var result = await _service.GetUserSummaryAsync(userId);
            if (result == null)
                return NotFound(Result<StudyPlanUserSummaryDto>.Fail("User not found"));

            return Ok(Result<StudyPlanUserSummaryDto>.Ok(result));
        }

        [HttpGet("admin-summary")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Result<StudyPlanAdminSummaryDto>>> GetAdminSummary()
        {
            var result = await _service.GetAdminSummaryAsync();
            return Ok(Result<StudyPlanAdminSummaryDto>.Ok(result));
        }
    }
} 