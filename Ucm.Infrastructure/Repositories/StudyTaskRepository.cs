using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ucm.Domain.Entities;
using Ucm.Domain.Enums;
using Ucm.Domain.IRepositories;
using Ucm.Infrastructure.Data;
using Ucm.Infrastructure.Data.Models;

namespace Ucm.Infrastructure.Repositories
{
    public class StudyTaskRepository : IStudyTaskRepository
    {
        private readonly AppDbContext _context;

        public StudyTaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StudyTask>> GetAllAsync()
        {
            var entities = await _context.StudyTasks
                .Include(x => x.Logs)
                .Include(x => x.Resources)
                .ToListAsync();
            return entities.Select(MapToEntity);
        }

        public async Task<StudyTask> GetByIdAsync(int id)
        {
            var ef = await _context.StudyTasks
                .Include(x => x.Logs)
                .Include(x => x.Resources)
                .FirstOrDefaultAsync(x => x.Id == id);
            return ef == null ? null : MapToEntity(ef);
        }

        public async Task<StudyTask> AddAsync(StudyTask entity)
        {
            var ef = MapToEf(entity);
            _context.StudyTasks.Add(ef);
            await _context.SaveChangesAsync();
            return MapToEntity(ef);
        }

        public async Task UpdateAsync(StudyTask entity)
        {
            var ef = await _context.StudyTasks
                .Include(x => x.Logs)
                .Include(x => x.Resources)
                .FirstOrDefaultAsync(x => x.Id == entity.Id);
            if (ef == null) return;

            ef.PlanCourseId = entity.PlanCourseId;
            ef.CourseTopicId = entity.CourseTopicId;
            ef.TaskName = entity.TaskName;
            ef.TaskDescription = entity.TaskDescription;
            ef.EstimatedHours = entity.EstimatedHours;
            ef.DueDate = entity.DueDate;
            ef.ScheduledDate = entity.ScheduledDate;
            ef.Status = entity.Status;
            ef.CompletionDate = entity.CompletionDate;
            // Optionally update Logs and Resources here

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var ef = await _context.StudyTasks.FindAsync(id);
            if (ef == null) return;
            _context.StudyTasks.Remove(ef);
            await _context.SaveChangesAsync();
        }

        // Mapping helpers
        private StudyTask MapToEntity(StudyTaskEf ef) =>
    new StudyTask
    {
        Id = ef.Id,
        PlanCourseId = ef.PlanCourseId,
        CourseTopicId = ef.CourseTopicId,
        TaskName = ef.TaskName,
        TaskDescription = ef.TaskDescription,
        EstimatedHours = ef.EstimatedHours,
        DueDate = ef.DueDate,
        ScheduledDate = ef.ScheduledDate,
        Status = ef.Status,
        CompletionDate = ef.CompletionDate,
        Logs = ef.Logs?.Select(log => new StudyLog
        {
            Id = log.Id,
            TaskId = log.TaskId,
            ActualTimeSpent = log.ActualTimeSpent,
            LogDate = log.LogDate
        }).ToList(),
        Resources = ef.Resources?.Select(res => new TaskResource
        {
            Id = res.Id,
            TaskId = res.TaskId,
            ResourceType = Enum.TryParse<ResourceType>(res.ResourceType, out var parsedType) ? parsedType : ResourceType.Other,
            ResourceURL = res.ResourceURL
        }).ToList()
    };

        private StudyTaskEf MapToEf(StudyTask entity) =>
            new StudyTaskEf
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
                // Optionally map Logs and Resources here
            };
    }
}
