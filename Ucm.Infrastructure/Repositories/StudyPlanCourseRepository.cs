using HotelApp.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;
using Ucm.Infrastructure.Common.Mappers;
using Ucm.Infrastructure.Data;
using Ucm.Infrastructure.Data.Models;
using System;
using System.Linq.Expressions;
using Ucm.Shared.Common.Pagination;

namespace Ucm.Infrastructure.Repositories
{
    public class StudyPlanCourseRepository : RepositoryBase<StudyPlanCourse, StudyPlanCourseEf>, IStudyPlanCourseRepository
    {
        public StudyPlanCourseRepository(AppDbContext context, IEntityEfMapper<StudyPlanCourse, StudyPlanCourseEf> mapper)
            : base(context, mapper) { }
            
        public async Task<IEnumerable<StudyPlanCourse>> GetByUserIdAsync(Guid userId)
        {
            var efItems = await _context.StudyPlanCourses
                .Where(spc => spc.UserId == userId)
                .ToListAsync();
            return efItems.Select(_mapper.ToEntity);
        }

        public async Task<IEnumerable<StudyPlanCourse>> GetByStudyPlanIdAsync(int studyPlanId)
        {
            var efItems = await _context.StudyPlanCourses
                .Where(spc => spc.StudyPlanId == studyPlanId)
                .ToListAsync();
            return efItems.Select(_mapper.ToEntity);
        }

        public async Task<int> CountByStudyPlanIdAsync(int studyPlanId)
        {
            return await _context.StudyPlanCourses
                .CountAsync(spc => spc.StudyPlanId == studyPlanId);
        }
    }
}