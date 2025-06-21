using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ucm.Application.Dtos;
using Ucm.Application.IServices;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;

namespace Ucm.Application.Services
{
    public class TaskResourceService : ITaskResourceService
    {
        private readonly ITaskResourceRepository _repository;

        public TaskResourceService(ITaskResourceRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TaskResourceDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(MapToDto);
        }

        public async Task<TaskResourceDto> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity == null ? null : MapToDto(entity);
        }

        public async Task<TaskResourceDto> AddAsync(TaskResourceDto dto)
        {
            var entity = MapToEntity(dto);
            var created = await _repository.AddAsync(entity);
            return MapToDto(created);
        }

        public async Task UpdateAsync(TaskResourceDto dto)
        {
            var entity = MapToEntity(dto);
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        // Mapping helpers
        private TaskResourceDto MapToDto(TaskResource entity) =>
            new TaskResourceDto
            {
                Id = entity.Id,
                TaskId = entity.TaskId,
                ResourceType = entity.ResourceType,
                ResourceURL = entity.ResourceURL
            };

        private TaskResource MapToEntity(TaskResourceDto dto) =>
            new TaskResource
            {
                Id = dto.Id,
                TaskId = dto.TaskId,
                ResourceType = dto.ResourceType,
                ResourceURL = dto.ResourceURL
            };
    }
}