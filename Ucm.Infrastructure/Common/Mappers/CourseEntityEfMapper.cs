using Ucm.Domain.Entities;
using Ucm.Infrastructure.Data.Models;

namespace Ucm.Infrastructure.Common.Mappers
{
    public class CourseEntityEfMapper : IEntityEfMapper<Course, CourseEf>
    {
        public Course ToEntity(CourseEf ef)
        {
            if (ef == null) return null;

            return new Course
            {
                Id = ef.Id,
                CourseName = ef.CourseName,
                Credits = ef.Credits,
                Description = ef.Description
            };
        }

        public CourseEf ToEf(Course entity)
        {
            if (entity == null) return null;

            return new CourseEf
            {
                Id = entity.Id,
                CourseName = entity.CourseName,
                Credits = entity.Credits,
                Description = entity.Description
            };
        }
    }
}
