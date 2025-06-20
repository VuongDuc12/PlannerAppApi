using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;
using Ucm.Infrastructure.Data;
using Ucm.Infrastructure.Data.Models;

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

        public async Task<StudyPlanCourse> AddAsync(StudyPlanCourse entity)
        {
            var ef = MapToEf(entity);
            _context.StudyPlanCourses.Add(ef);
            await _context.SaveChangesAsync();
            return MapToEntity(ef);
        }

        public async Task UpdateAsync(StudyPlanCourse entity)
        {
            var ef = await _context.StudyPlanCourses.FindAsync(entity.Id);
            if (ef == null) return;
            ef.StudyPlanId = entity.StudyPlanId;
            ef.CourseId = entity.CourseId;
            ef.UserId = entity.UserId;
            // Update other fields as needed
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var ef = await _context.StudyPlanCourses.FindAsync(id);
            if (ef == null) return;
            _context.StudyPlanCourses.Remove(ef);
            await _context.SaveChangesAsync();
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