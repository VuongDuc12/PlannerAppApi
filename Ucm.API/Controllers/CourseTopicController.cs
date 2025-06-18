using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ucm.Application.DTOs.CourseTopic;
using Ucm.Application.Services;
using Ucm.Domain.Entities;
using Ucm.Shared.Common.Pagination;

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
            => Ok(await _service.GetPagedAsync(pagination));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var topic = await _service.GetByIdAsync(id);
            if (topic == null) return NotFound();
            return Ok(topic);
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
            return Ok(topic);
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
