using Ucm.Domain.Entities;
using Ucm.Infrastructure.Data.Models;
using System.Linq;

namespace Ucm.Infrastructure.Common.Mappers
{
    public class StudyTaskEntityEfMapper : IEntityEfMapper<StudyTask, StudyTaskEf>
    {
        private readonly StudyLogEntityEfMapper _logMapper = new();
        private readonly TaskResourceEntityEfMapper _resourceMapper = new();

        public StudyTask ToEntity(StudyTaskEf ef)
        {
            if (ef == null) return null;

            return new StudyTask
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
                Logs = ef.Logs?.Select(_logMapper.ToEntity).ToList(),
                Resources = ef.Resources?.Select(_resourceMapper.ToEntity).ToList()
            };
        }

        public StudyTaskEf ToEf(StudyTask entity)
        {
            if (entity == null) return null;

            return new StudyTaskEf
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
                Logs = entity.Logs?.Select(_logMapper.ToEf).ToList(),
                Resources = entity.Resources?.Select(_resourceMapper.ToEf).ToList()
            };
        }
    }
}