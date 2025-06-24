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
        private readonly IStudyPlanService _studyPlanService;
        private readonly IStudyPlanRepository _studyPlanRepository;

        public StudyPlanCourseService(IStudyPlanCourseRepository repository, IStudyPlanService studyPlanService, IStudyPlanRepository studyPlanRepository)
        {
            _repository = repository;
            _studyPlanService = studyPlanService;
            _studyPlanRepository = studyPlanRepository;
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
            
            // Cập nhật CourseCount trong StudyPlan
            await UpdateStudyPlanCourseCount(dto.StudyPlanId);
            
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
            
            var studyPlanId = entity.StudyPlanId; // Lưu lại StudyPlanId trước khi xóa
            
            _repository.Delete(entity);
            await _repository.SaveChangesAsync();
            
            // Cập nhật CourseCount trong StudyPlan
            await UpdateStudyPlanCourseCount(studyPlanId);
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

        // Helper method để cập nhật CourseCount
        private async Task UpdateStudyPlanCourseCount(int studyPlanId)
        {
            try
            {
                System.Diagnostics.Debug.WriteLine($"Updating CourseCount for StudyPlan {studyPlanId}");
                var result = await _studyPlanService.UpdateCourseCountAsync(studyPlanId);
                System.Diagnostics.Debug.WriteLine($"UpdateCourseCount result: {result}");
            }
            catch (System.Exception ex)
            {
                // Log lỗi nhưng không throw để không ảnh hưởng đến operation chính
                System.Diagnostics.Debug.WriteLine($"Error updating CourseCount for StudyPlan {studyPlanId}: {ex.Message}");
            }
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