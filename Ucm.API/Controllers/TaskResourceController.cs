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
    public class TaskResourceController : ControllerBase
    {
        private readonly ITaskResourceService _service;

        public TaskResourceController(ITaskResourceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<Result<IEnumerable<TaskResourceDto>>>> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(Result<IEnumerable<TaskResourceDto>>.Ok(result));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Result<TaskResourceDto>>> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
                return NotFound(Result<TaskResourceDto>.Fail("Not found"));
            return Ok(Result<TaskResourceDto>.Ok(result));
        }

        [HttpPost]
        public async Task<ActionResult<Result<TaskResourceDto>>> Create([FromBody] TaskResourceDto dto)
        {
            if (dto == null)
                return BadRequest(Result<TaskResourceDto>.Fail("Invalid data"));

            var created = await _service.AddAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, Result<TaskResourceDto>.Ok(created));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Result>> Update(int id, [FromBody] TaskResourceDto dto)
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