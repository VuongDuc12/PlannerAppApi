using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Application.Dtos;
using Ucm.Application.IServices;
using Ucm.Shared.Results;
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Ucm.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StudyTaskController : ControllerBase
    {
        private readonly IStudyTaskService _service;

        public StudyTaskController(IStudyTaskService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<Result<IEnumerable<StudyTaskDto>>>> GetAll()
        {
            try
            {
                var result = await _service.GetAllAsync();
                return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<IEnumerable<StudyTaskDto>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Result<StudyTaskDto>>> GetById(int id)
        {
            try
            {
                var result = await _service.GetByIdAsync(id);
                if (result == null)
                    return NotFound(Result<StudyTaskDto>.Fail("Task not found"));
                return Ok(Result<StudyTaskDto>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<StudyTaskDto>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        // Test endpoint to verify all related data is loaded
        [HttpGet("test/{id}")]
        public async Task<ActionResult<Result<StudyTaskDto>>> GetByIdWithDetails(int id)
        {
            try
            {
                var result = await _service.GetByIdAsync(id);
                if (result == null)
                    return NotFound(Result<StudyTaskDto>.Fail("Task not found"));
                
                // Log the details to verify all data is loaded
                Console.WriteLine($"Task: {result.TaskName}");
                Console.WriteLine($"StudyPlan: {result.StudyPlanName}");
                Console.WriteLine($"Course: {result.CourseName}");
                Console.WriteLine($"Logs Count: {result.Logs?.Count ?? 0}");
                Console.WriteLine($"Resources Count: {result.Resources?.Count ?? 0}");
                
                return Ok(Result<StudyTaskDto>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<StudyTaskDto>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        // Mobile app endpoints
        [HttpGet("today")]
        public async Task<ActionResult<Result<IEnumerable<StudyTaskDto>>>> GetToday()
        {
            try
            {
                var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var result = await _service.GetTodayAsync(userId);
                return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<IEnumerable<StudyTaskDto>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpGet("day/{date}")]
        public async Task<ActionResult<Result<IEnumerable<StudyTaskDto>>>> GetByDay(DateTime date)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var result = await _service.GetByDateAsync(userId, date);
                return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<IEnumerable<StudyTaskDto>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpGet("week/{weekStart}")]
        public async Task<ActionResult<Result<IEnumerable<StudyTaskDto>>>> GetByWeek(DateTime weekStart)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var result = await _service.GetByWeekAsync(userId, weekStart);
                return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<IEnumerable<StudyTaskDto>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpGet("month/{year}/{month}")]
        public async Task<ActionResult<Result<IEnumerable<StudyTaskDto>>>> GetByMonth(int year, int month)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var result = await _service.GetByMonthAsync(userId, year, month);
                return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<IEnumerable<StudyTaskDto>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<Result<IEnumerable<StudyTaskDto>>>> GetUpcoming([FromQuery] int days = 7)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var result = await _service.GetUpcomingAsync(userId, days);
                return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<IEnumerable<StudyTaskDto>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpGet("overdue")]
        public async Task<ActionResult<Result<IEnumerable<StudyTaskDto>>>> GetOverdue()
        {
            try
            {
                var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var result = await _service.GetOverdueAsync(userId);
                return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<IEnumerable<StudyTaskDto>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult<Result<IEnumerable<StudyTaskDto>>>> GetByStatus(string status)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var result = await _service.GetByStatusAsync(userId, status);
                return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<IEnumerable<StudyTaskDto>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpGet("plan/{studyPlanId}")]
        public async Task<ActionResult<Result<IEnumerable<StudyTaskDto>>>> GetByStudyPlanId(int studyPlanId)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var result = await _service.GetByStudyPlanIdAsync(userId, studyPlanId);
                return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<IEnumerable<StudyTaskDto>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpGet("plan-course/{planCourseId}")]
        public async Task<ActionResult<Result<IEnumerable<StudyTaskDto>>>> GetByPlanCourseId(int planCourseId)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var result = await _service.GetByPlanCourseIdAsync(userId, planCourseId);
                return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<IEnumerable<StudyTaskDto>>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpPost]
        public async Task<ActionResult<Result<StudyTaskDto>>> Create([FromBody] CreateStudyTaskRequest request)
        {
            if (request == null)
                return BadRequest(Result<StudyTaskDto>.Fail("Invalid data - Request body is required"));

            if (string.IsNullOrEmpty(request.TaskName))
                return BadRequest(Result<StudyTaskDto>.Fail("Task name is required"));

            if (request.PlanCourseId <= 0)
                return BadRequest(Result<StudyTaskDto>.Fail("Valid PlanCourseId is required"));

            try
            {
                var created = await _service.AddAsync(request);
                if (created == null)
                    return StatusCode(500, Result<StudyTaskDto>.Fail("Failed to create task (created is null)"));
                return Ok(Result<StudyTaskDto>.Ok(created));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(Result<StudyTaskDto>.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result<StudyTaskDto>.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Result>> Update(int id, [FromBody] UpdateStudyTaskRequest request)
        {
            if (request == null)
                return BadRequest(Result.Fail("Invalid data - Request body is required"));

            try
            {
                await _service.UpdateAsync(id, request);
                return Ok(Result.Ok("Updated successfully"));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(Result.Fail(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result.Fail($"Internal server error: {ex.Message}"));
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Result>> Delete(int id)
        {
            try
            {
                var existing = await _service.GetByIdAsync(id);
                if (existing == null)
                    return NotFound(Result.Fail("Task not found"));

                await _service.DeleteAsync(id);
                return Ok(Result.Ok("Deleted successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, Result.Fail($"Internal server error: {ex.Message}"));
            }
        }
    }
}