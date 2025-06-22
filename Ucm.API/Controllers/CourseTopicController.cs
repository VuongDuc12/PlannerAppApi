using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ucm.Application.DTOs.CourseTopic;
using Ucm.Application.Services;
using Ucm.Domain.Entities;
using Ucm.Shared.Common.Pagination;
using Ucm.Shared.Results;

namespace Ucm.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(Roles = "Admin")]
    public class CourseTopicController : ControllerBase
    {
        private readonly CourseTopicService _service;

        public CourseTopicController(CourseTopicService service)
        {
            _service = service;
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged([FromQuery] PaginationParams pagination)
        {
            var paged = await _service.GetPagedAsync(pagination);
            return Ok(Result<object>.Ok(paged));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var topic = await _service.GetByIdAsync(id);
            if (topic == null)
                return NotFound(Result<CourseTopic>.Fail("Not found"));
            return Ok(Result<CourseTopic>.Ok(topic));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCourseTopicDto dto)
        {
            var topic = new CourseTopic
            {
                CourseId = dto.CourseId,
                TopicName = dto.TopicName,
                Description = dto.Description
            };

            await _service.AddAsync(topic);
            return Ok(Result<CourseTopic>.Ok(topic, "Created successfully"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCourseTopicDto dto)
        {
            var topic = new CourseTopic
            {
                Id = id,
                TopicName = dto.TopicName,
                Description = dto.Description
            };

            await _service.UpdateAsync(topic);
            return Ok(Result.Ok("Updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok(Result.Ok("Deleted successfully"));
        }
    }
}