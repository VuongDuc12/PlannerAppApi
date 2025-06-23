using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Ucm.Application.IServices;
using Ucm.Application.DTOs.StudyPlan;
using Ucm.Shared.Results;
using Ucm.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Ucm.Infrastructure.Data.Models;

namespace Ucm.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StudyPlanController : ControllerBase
    {
        private readonly IStudyPlanService _studyPlanService;

        public StudyPlanController(IStudyPlanService studyPlanService)
        {
            _studyPlanService = studyPlanService;
        }
[HttpGet("user-stats")]
public async Task<IActionResult> GetUserPlanStats(
    [FromServices] UserManager<AppUserEF> userManager,
    [FromServices] IStudyPlanService studyPlanService)
{
    var users = userManager.Users.ToList();
    var plans = await studyPlanService.GetAllAsync();

    var stats = users.Select(u => new {
        userId = u.Id,
        userName = u.UserName,
        fullName = u.FullName,
        email = u.Email,
        planCount = plans.Count(p => p.UserId == u.Id)
    });

    return Ok(Result<IEnumerable<object>>.Ok(stats));
}
[HttpGet("user/{userId}")]

public async Task<IActionResult> GetPlansByUser(Guid userId)
{
    var plans = await _studyPlanService.GetAllByUserIdAsync(userId);
    var planDtos = plans.Select(plan => new StudyPlanDto
    {
        Id = plan.Id,
        UserId = plan.UserId,
        PlanName = plan.PlanName,
        StartDate = plan.StartDate,
        EndDate = plan.EndDate,
        Semester = plan.Semester,
        AcademicYear = plan.AcademicYear,
        WeeklyStudyGoalHours = plan.WeeklyStudyGoalHours
    });
    return Ok(Result<IEnumerable<StudyPlanDto>>.Ok(planDtos));
}


        // Update the GetAll method to map StudyPlan entities to StudyPlanDto
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _studyPlanService.GetAllAsync();
            var planDtos = plans.Select(plan => new StudyPlanDto
            {
                Id = plan.Id,
                UserId = plan.UserId,
                PlanName = plan.PlanName,
                StartDate = plan.StartDate,
                EndDate = plan.EndDate,
                Semester = plan.Semester,
                AcademicYear = plan.AcademicYear,
                WeeklyStudyGoalHours = plan.WeeklyStudyGoalHours
            });
            return Ok(Result<IEnumerable<StudyPlanDto>>.Ok(planDtos));
        }

        // Update the GetAllByUser method to map StudyPlan entities to StudyPlanDto
        [HttpGet("user")]
        public async Task<IActionResult> GetAllByUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var guid))
                return Unauthorized(Result.Fail("Unauthorized"));

            var plans = await _studyPlanService.GetAllByUserIdAsync(guid);
            var planDtos = plans.Select(plan => new StudyPlanDto
            {
                Id = plan.Id,
                UserId = plan.UserId,
                PlanName = plan.PlanName,
                StartDate = plan.StartDate,
                EndDate = plan.EndDate,
                Semester = plan.Semester,
                AcademicYear = plan.AcademicYear,
                WeeklyStudyGoalHours = plan.WeeklyStudyGoalHours
            });
            return Ok(Result<IEnumerable<StudyPlanDto>>.Ok(planDtos));
        }

        // Fix for CS1503: Map the StudyPlan entity to StudyPlanDto before passing it to Result.Ok
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var plan = await _studyPlanService.GetByIdAsync(id);
            if (plan == null)
                return NotFound(Result<StudyPlanDto>.Fail("Không tìm thấy kế hoạch"));

            var planDto = new StudyPlanDto
            {
                Id = plan.Id,
                UserId = plan.UserId,
                PlanName = plan.PlanName,
                StartDate = plan.StartDate,
                EndDate = plan.EndDate,
                Semester = plan.Semester,
                AcademicYear = plan.AcademicYear,
                WeeklyStudyGoalHours = plan.WeeklyStudyGoalHours
            };

            return Ok(Result<StudyPlanDto>.Ok(planDto));
        }

        // Update the Create method to match the IStudyPlanService.CreateAsync signature
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] StudyPlanCreateRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var guid))
                return Unauthorized(Result.Fail("Unauthorized"));

            // Map the request to a StudyPlan entity
            var studyPlan = new StudyPlan
            {
                UserId = guid,
                PlanName = request.PlanName,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Semester = request.Semester,
                AcademicYear = request.AcademicYear,
                WeeklyStudyGoalHours = request.WeeklyStudyGoalHours
            };

            var created = await _studyPlanService.CreateAsync(studyPlan);
            if (created == null)
                return BadRequest(Result.Fail("Tạo kế hoạch thất bại"));

            // Map the created StudyPlan entity to StudyPlanDto
            var createdDto = new StudyPlanDto
            {
                Id = created.Id,
                UserId = created.UserId,
                PlanName = created.PlanName,
                StartDate = created.StartDate,
                EndDate = created.EndDate,
                Semester = created.Semester,
                AcademicYear = created.AcademicYear,
                WeeklyStudyGoalHours = created.WeeklyStudyGoalHours
            };

            return Ok(Result<StudyPlanDto>.Ok(createdDto, "Tạo kế hoạch thành công"));
        }

        // Fix for CS1503: Map StudyPlanUpdateRequest to StudyPlan before passing it to _studyPlanService.UpdateAsync
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] StudyPlanUpdateRequest request)
        {
            if (id != request.Id)
                return BadRequest(Result.Fail("Id không khớp"));

            // Map StudyPlanUpdateRequest to StudyPlan entity
            var studyPlan = new StudyPlan
            {
                Id = request.Id,
                PlanName = request.PlanName,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Semester = request.Semester,
                AcademicYear = request.AcademicYear,
                WeeklyStudyGoalHours = request.WeeklyStudyGoalHours
            };

            var updated = await _studyPlanService.UpdateAsync(studyPlan);
            if (!updated)
                return NotFound(Result.Fail("Không tìm thấy kế hoạch"));

            // Map updated StudyPlan entity to StudyPlanDto
            var updatedDto = new StudyPlanDto
            {
                Id = studyPlan.Id,
                UserId = studyPlan.UserId,
                PlanName = studyPlan.PlanName,
                StartDate = studyPlan.StartDate,
                EndDate = studyPlan.EndDate,
                Semester = studyPlan.Semester,
                AcademicYear = studyPlan.AcademicYear,
                WeeklyStudyGoalHours = studyPlan.WeeklyStudyGoalHours
            };

            return Ok(Result<StudyPlanDto>.Ok(updatedDto, "Cập nhật thành công"));
        }

        // DELETE: /api/studyplan/{id}          
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _studyPlanService.DeleteAsync(id);
            if (!deleted)
                return NotFound(Result.Fail("Không tìm thấy kế hoạch"));
            return Ok(Result.Ok("Xoá thành công"));
        }
    }
}