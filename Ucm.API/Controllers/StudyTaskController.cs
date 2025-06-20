using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Application.Dtos;
using Ucm.Application.IServices;
using Ucm.Shared.Results;

namespace Ucm.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            var result = await _service.GetAllAsync();
            return Ok(Result<IEnumerable<StudyTaskDto>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Result<StudyTaskDto>>> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
                return NotFound(Result<StudyTaskDto>.Fail("Not found"));
            return Ok(Result<StudyTaskDto>.Ok(result));
        }

        [HttpPost]
        public async Task<ActionResult<Result<StudyTaskDto>>> Create([FromBody] StudyTaskDto dto)
        {
            if (dto == null)
                return BadRequest(Result<StudyTaskDto>.Fail("Invalid data"));

            var created = await _service.AddAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, Result<StudyTaskDto>.Ok(created));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Result>> Update(int id, [FromBody] StudyTaskDto dto)
        {
            if (dto == null || id != dto.Id)
                return BadRequest(Result.Fail("Invalid data"));

            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound(Result.Fail("Not found"));

            await _service.UpdateAsync(dto);
            return Ok(Result.Ok("Updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Result>> Delete(int id)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound(Result.Fail("Not found"));

            await _service.DeleteAsync(id);
            return Ok(Result.Ok("Deleted successfully"));
        }
    }
}