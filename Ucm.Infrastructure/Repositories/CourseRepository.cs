using HotelApp.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;
using Ucm.Infrastructure.Common.Mappers;
using Ucm.Infrastructure.Data;
using Ucm.Infrastructure.Data.Models;

namespace Ucm.Infrastructure.Repositories
{
    public class CourseRepository : RepositoryBase<Course, CourseEf>, ICourseRepository
    {
        public CourseRepository(AppDbContext context, IEntityEfMapper<Course, CourseEf> mapper) : base(context, mapper)
        {

        }
        protected override IQueryable<CourseEf> ApplySearchFilter(IQueryable<CourseEf> query, string searchTerm)
        {
            return query.Where(c => c.CourseName.Contains(searchTerm));
        }
    }

}
