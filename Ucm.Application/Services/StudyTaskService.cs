using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ucm.Application.Dtos;
using Ucm.Application.DTOs;
using Ucm.Application.IServices;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;
using System;

namespace Ucm.Application.Services
{
    public class StudyTaskService : IStudyTaskService
    {
        private readonly IStudyTaskRepository _repository;
        private readonly IStudyPlanCourseRepository _studyPlanCourseRepository;
        private readonly IStudyPlanRepository _studyPlanRepository;
        private readonly ICourseRepository _courseRepository;

        public StudyTaskService(
            IStudyTaskRepository repository,
            IStudyPlanCourseRepository studyPlanCourseRepository,
            IStudyPlanRepository studyPlanRepository,
            ICourseRepository courseRepository)
        {
            _repository = repository;
            _studyPlanCourseRepository = studyPlanCourseRepository;
            _studyPlanRepository = studyPlanRepository;
            _courseRepository = courseRepository;
        }

        private async Task<StudyTaskDto> MapToDtoWithDetails(StudyTask task)
        {
            var planCourse = await _studyPlanCourseRepository.GetByIdAsync(task.PlanCourseId);
            var studyPlan = planCourse != null ? await _studyPlanRepository.GetByIdAsync(planCourse.StudyPlanId) : null;
            var course = planCourse != null ? await _courseRepository.GetByIdAsync(planCourse.CourseId) : null;

            return new StudyTaskDto
            {
                Id = task.Id,
                PlanCourseId = task.PlanCourseId,
                StudyPlanId = studyPlan?.Id ?? 0,
                StudyPlanName = studyPlan?.PlanName,
                CourseId = course?.Id ?? 0,
                CourseName = course?.CourseName,
                CourseTopicId = task.CourseTopicId,
                TaskName = task.TaskName,
                TaskDescription = task.TaskDescription,
                EstimatedHours = task.EstimatedHours,
                DueDate = task.DueDate,
                ScheduledDate = task.ScheduledDate,
                Status = task.Status,
                CompletionDate = task.CompletionDate,
                Logs = task.Logs?.Select(log => new StudyLogDto
                {
                    Id = log.Id,
                    TaskId = log.TaskId,
                    ActualTimeSpent = log.ActualTimeSpent,
                    LogDate = log.LogDate
                }).ToList(),
                Resources = task.Resources?.Select(res => new TaskResourceDto
                {
                    Id = res.Id,
                    TaskId = res.TaskId,
                    ResourceType = res.ResourceType,
                    ResourceURL = res.ResourceURL
                }).ToList()
            };
        }

        public async Task<IEnumerable<StudyTaskDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            var dtos = new List<StudyTaskDto>();
            foreach (var entity in entities)
            {
                dtos.Add(await MapToDtoWithDetails(entity));
            }
            return dtos;
        }

        public async Task<StudyTaskDto> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity == null ? null : await MapToDtoWithDetails(entity);
        }

        public async Task<StudyTaskDto> AddAsync(StudyTaskDto dto)
        {
            var entity = MapToEntity(dto);
            var created = await _repository.AddAsync(entity);
            return await GetByIdAsync(created.Id);
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

        public async Task<IEnumerable<StudyTaskDto>> GetByDateAsync(Guid userId, DateTime date)
        {
            var entities = await _repository.GetByDateAsync(userId, date);
            var dtos = new List<StudyTaskDto>();
            foreach (var entity in entities)
            {
                dtos.Add(await MapToDtoWithDetails(entity));
            }
            return dtos;
        }

        public async Task<IEnumerable<StudyTaskDto>> GetByStudyPlanIdAsync(Guid userId, int studyPlanId)
        {
            var entities = await _repository.GetByStudyPlanIdAsync(userId, studyPlanId);
            var dtos = new List<StudyTaskDto>();
            foreach (var entity in entities)
            {
                dtos.Add(await MapToDtoWithDetails(entity));
            }
            return dtos;
        }

        public async Task<IEnumerable<StudyTaskDto>> GetTodayAsync(Guid userId)
        {
            var entities = await _repository.GetByDateAsync(userId, DateTime.Today);
            var dtos = new List<StudyTaskDto>();
            foreach (var entity in entities)
            {
                dtos.Add(await MapToDtoWithDetails(entity));
            }
            return dtos;
        }

        // Mapping helpers
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
                    ResourceType = res.ResourceType,
                    ResourceURL = res.ResourceURL
                }).ToList()
            };
    }
}