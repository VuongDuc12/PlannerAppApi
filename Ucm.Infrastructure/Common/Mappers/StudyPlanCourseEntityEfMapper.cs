using Ucm.Domain.Entities;
using Ucm.Infrastructure.Data.Models;
using System.Linq;

namespace Ucm.Infrastructure.Common.Mappers
{
    public class StudyPlanCourseEntityEfMapper : IEntityEfMapper<StudyPlanCourse, StudyPlanCourseEf>
    {
        private readonly StudyTaskEntityEfMapper _taskMapper = new();

        public StudyPlanCourse ToEntity(StudyPlanCourseEf ef)
        {
            if (ef == null) return null;

            return new StudyPlanCourse
            {
                Id = ef.Id,
                StudyPlanId = ef.StudyPlanId,
                CourseId = ef.CourseId,
                UserId = ef.UserId,
                Tasks = ef.Tasks?.Select(_taskMapper.ToEntity).ToList()
            };
        }

        public StudyPlanCourseEf ToEf(StudyPlanCourse entity)
        {
            if (entity == null) return null;

            return new StudyPlanCourseEf
            {
                Id = entity.Id,
                StudyPlanId = entity.StudyPlanId,
                CourseId = entity.CourseId,
                UserId = entity.UserId,
                Tasks = entity.Tasks?.Select(_taskMapper.ToEf).ToList()
            };
        }
    }
}