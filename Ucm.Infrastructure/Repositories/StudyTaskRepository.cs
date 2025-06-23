using HotelApp.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ucm.Domain.Entities;
using Ucm.Domain.Enums;
using Ucm.Domain.IRepositories;
using Ucm.Infrastructure.Common.Mappers;
using Ucm.Infrastructure.Data;
using Ucm.Infrastructure.Data.Models;

namespace Ucm.Infrastructure.Repositories
{
    public class StudyTaskRepository : RepositoryBase<StudyTask, StudyTaskEf>, IStudyTaskRepository
    {
       
        public StudyTaskRepository(AppDbContext context, IEntityEfMapper<StudyTask, StudyTaskEf> mapper)
          : base(context, mapper) { }

        public async Task<IEnumerable<StudyTask>> GetByDateAsync(Guid userId, DateTime date)
        {
            var planCourseIdsForUser = await _context.StudyPlanCourses
                                                     .Where(spc => spc.UserId == userId)
                                                     .Select(spc => spc.Id)
                                                     .ToListAsync();

            if (!planCourseIdsForUser.Any())
            {
                return new List<StudyTask>();
            }

            var entities = await _context.StudyTasks
                .Where(x => x.ScheduledDate.HasValue && x.ScheduledDate.Value == DateOnly.FromDateTime(date) && planCourseIdsForUser.Contains(x.PlanCourseId))
                .ToListAsync();

            return entities.Select(_mapper.ToEntity);
        }

        public async Task<IEnumerable<StudyTask>> GetByStudyPlanIdAsync(Guid userId, int studyPlanId)
        {
            var planCourseIds = await _context.StudyPlanCourses
                                              .Where(spc => spc.StudyPlanId == studyPlanId && spc.UserId == userId)
                                              .Select(spc => spc.Id)
                                              .ToListAsync();

            if (!planCourseIds.Any())
            {
                return new List<StudyTask>();
            }

            var entities = await _context.StudyTasks
                .Where(x => planCourseIds.Contains(x.PlanCourseId))
                .ToListAsync();

            return entities.Select(_mapper.ToEntity);
        }
    }
}
