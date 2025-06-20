using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ucm.Application.Dtos;
using Ucm.Application.IServices;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;

namespace Ucm.Application.Services
{
    public class StudyTaskService : IStudyTaskService
    {
        private readonly IStudyTaskRepository _repository;

        public StudyTaskService(IStudyTaskRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<StudyTaskDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(MapToDto);
        }

        public async Task<StudyTaskDto> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity == null ? null : MapToDto(entity);
        }

        public async Task<StudyTaskDto> AddAsync(StudyTaskDto dto)
        {
            var entity = MapToEntity(dto);
            var created = await _repository.AddAsync(entity);
            return MapToDto(created);
        }

        public async Task UpdateAsync(StudyTaskDto dto)
        {
            var entity = MapToEntity(dto);
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        // Mapping helpers
        private StudyTaskDto MapToDto(StudyTask entity) =>
            new StudyTaskDto
            {
                Id = entity.Id,
                PlanCourseId = entity.PlanCourseId,
                CourseTopicId = entity.CourseTopicId,
                TaskName = entity.TaskName,
                TaskDescription = entity.TaskDescription,
                EstimatedHours = entity.EstimatedHours,
                DueDate = entity.DueDate,
                ScheduledDate = entity.ScheduledDate,
                Status = entity.Status,
                CompletionDate = entity.CompletionDate,
                Logs = entity.Logs?.Select(log => new StudyLogDto
                {
                    Id = log.Id,
                    TaskId = log.TaskId,
                    ActualTimeSpent = log.ActualTimeSpent,
                    LogDate = log.LogDate
                }).ToList(),
                Resources = entity.Resources?.Select(res => new TaskResourceDto
                {
                    Id = res.Id,
                    TaskId = res.TaskId,
                    ResourceType = (int)res.ResourceType,
                    ResourceURL = res.ResourceURL
                }).ToList()
            };

        private StudyTask MapToEntity(StudyTaskDto dto) =>
            new StudyTask
            {
                Id = dto.Id,
                PlanCourseId = dto.PlanCourseId,
                CourseTopicId = dto.CourseTopicId,
                TaskName = dto.TaskName,
                TaskDescription = dto.TaskDescription,
                EstimatedHours = dto.EstimatedHours,
                DueDate = dto.DueDate,
                ScheduledDate = dto.ScheduledDate,
                Status = dto.Status,
                CompletionDate = dto.CompletionDate,
                Logs = dto.Logs?.Select(log => new StudyLog
                {
                    Id = log.Id,
                    TaskId = log.TaskId,
                    ActualTimeSpent = log.ActualTimeSpent,
                    LogDate = log.LogDate
                }).ToList(),
                Resources = dto.Resources?.Select(res => new TaskResource
                {
                    Id = res.Id,
                    TaskId = res.TaskId,
                    ResourceType = (Ucm.Domain.Enums.ResourceType)res.ResourceType,
                    ResourceURL = res.ResourceURL
                }).ToList()
            };
    }
}