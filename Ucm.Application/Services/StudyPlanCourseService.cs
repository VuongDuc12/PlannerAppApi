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
            return entities.ToList().Select(MapToDto);
        }

        public async Task<StudyPlanCourseDto> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) throw new System.Exception($"StudyPlanCourse với id {id} không tồn tại.");
            return MapToDto(entity);
        }

        public async Task<StudyPlanCourseDto> AddAsync(StudyPlanCourseDto dto)
        {
            var entity = MapToEntity(dto);
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return MapToDto(entity);
        }

        public async Task UpdateAsync(StudyPlanCourseDto dto)
        {
            var entity = MapToEntity(dto);
            _repository.Update(entity);
            await _repository.SaveChangesAsync();
            var updated = await _repository.GetByIdAsync(entity.Id);
            if (updated == null) throw new System.Exception($"Không tìm thấy StudyPlanCourse với id {entity.Id} sau khi cập nhật.");
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) throw new System.Exception($"Không tìm thấy StudyPlanCourse với id {id} để xóa.");
            _repository.Delete(entity);
            await _repository.SaveChangesAsync();
        }

        public async Task<IEnumerable<StudyPlanCourseDto>> GetByUserIdAsync(Guid userId)
        {
            var entities = await _repository.GetByUserIdAsync(userId);
            return entities.Select(MapToDto);
        }

        public async Task<IEnumerable<StudyPlanCourseDto>> GetByStudyPlanIdAsync(int studyPlanId)
        {
            var entities = await _repository.GetByStudyPlanIdAsync(studyPlanId);
            return entities.Select(MapToDto);
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
                UserId = dto.UserId ?? Guid.Empty
            };
    }
}