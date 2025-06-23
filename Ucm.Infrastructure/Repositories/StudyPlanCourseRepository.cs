using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;
using Ucm.Infrastructure.Data;
using Ucm.Infrastructure.Data.Models;
using System;
using System.Linq.Expressions;
using Ucm.Shared.Common.Pagination;

namespace Ucm.Infrastructure.Repositories
{
    public class StudyPlanCourseRepository : IStudyPlanCourseRepository
    {
        private readonly AppDbContext _context;

        public StudyPlanCourseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StudyPlanCourse>> GetAllAsync()
        {
            return await _context.StudyPlanCourses
                .Select(ef => MapToEntity(ef))
                .ToListAsync();
        }

        public async Task<StudyPlanCourse> GetByIdAsync(int id)
        {
            var ef = await _context.StudyPlanCourses.FindAsync(id);
            return ef == null ? null : MapToEntity(ef);
        }

        public async Task<IEnumerable<StudyPlanCourse>> GetByIdsAsync(List<int> ids)
        {
            var efItems = await _context.StudyPlanCourses
                .Where(spc => ids.Contains(spc.Id))
                .ToListAsync();
            return efItems.Select(MapToEntity);
        }

        public async Task AddAsync(StudyPlanCourse entity)
        {
            var ef = MapToEf(entity);
            _context.StudyPlanCourses.Add(ef);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(StudyPlanCourse entity)
        {
            var ef = await _context.StudyPlanCourses.FindAsync(entity.Id);
            if (ef == null) return;
            ef.StudyPlanId = entity.StudyPlanId;
            ef.CourseId = entity.CourseId;
            ef.UserId = entity.UserId;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var ef = await _context.StudyPlanCourses.FindAsync(id);
            if (ef == null) return;
            _context.StudyPlanCourses.Remove(ef);
            await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<StudyPlanCourse>> GetPagedAsync(PaginationParams pagination)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<StudyPlanCourse>> FindAsync(Expression<Func<StudyPlanCourse, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public void Update(StudyPlanCourse entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(StudyPlanCourse entity)
        {
            throw new NotImplementedException();
        }

        public async Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }

        // Mapping helpers
        private StudyPlanCourse MapToEntity(StudyPlanCourseEf ef) =>
            new StudyPlanCourse
            {
                Id = ef.Id,
                StudyPlanId = ef.StudyPlanId,
                CourseId = ef.CourseId,
                UserId = ef.UserId
            };

        private StudyPlanCourseEf MapToEf(StudyPlanCourse entity) =>
            new StudyPlanCourseEf
            {
                Id = entity.Id,
                StudyPlanId = entity.StudyPlanId,
                CourseId = entity.CourseId,
                UserId = entity.UserId
            };
    }
}