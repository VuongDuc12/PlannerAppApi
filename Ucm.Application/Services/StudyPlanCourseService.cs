using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ucm.Application.Dtos;
using Ucm.Application.IServices;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;

namespace Ucm.Application.Services
{
    public class StudyPlanCourseService : IStudyPlanCourseService
    {
        private readonly IStudyPlanCourseRepository _repository;

        public StudyPlanCourseService(IStudyPlanCourseRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<StudyPlanCourseDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(MapToDto);
        }

        public async Task<StudyPlanCourseDto> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity == null ? null : MapToDto(entity);
        }

        public async Task<StudyPlanCourseDto> AddAsync(StudyPlanCourseDto dto)
        {
            var entity = MapToEntity(dto);
            var created = await _repository.AddAsync(entity);
            return MapToDto(created);
        }

        public async Task UpdateAsync(StudyPlanCourseDto dto)
        {
            var entity = MapToEntity(dto);
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        // Mapping helpers
        private StudyPlanCourseDto MapToDto(StudyPlanCourse entity) =>
            new StudyPlanCourseDto
            {
                Id = entity.Id,
                StudyPlanId = entity.StudyPlanId,
                CourseId = entity.CourseId,
                UserId = entity.UserId
            };

        private StudyPlanCourse MapToEntity(StudyPlanCourseDto dto) =>
            new StudyPlanCourse
            {
                Id = dto.Id,
                StudyPlanId = dto.StudyPlanId,
                CourseId = dto.CourseId,
                UserId = dto.UserId
            };
    }
}