using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ucm.Application.DTOs.Course;
using Ucm.Application.Services;
using Ucm.Domain.Entities;
using Ucm.Shared.Common.Pagination;

namespace Ucm.API.Controllers
{
  

    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(Roles = "Admin")]
    public class CourseController : ControllerBase
    {
        private readonly CourseService _service;

        public CourseController(CourseService service)
        {
            _service = service;
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged([FromQuery] PaginationParams pagination)
            => Ok(await _service.GetPagedAsync(pagination));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var course = await _service.GetByIdAsync(id);
            if (course == null) return NotFound();
            return Ok(course);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCourseDto dto)
        {
            var course = new Course
            {
                CourseName = dto.CourseName,
                Credits = dto.Credits,
                Description = dto.Description
            };

            await _service.AddAsync(course);
            return Ok(course);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCourseDto dto)
        {
            var course = new Course
            {
                Id = id,
                CourseName = dto.CourseName,
                Credits = dto.Credits,
                Description = dto.Description
            };

            await _service.UpdateAsync(course);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }

}
