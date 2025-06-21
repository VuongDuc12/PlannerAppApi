using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;
using Ucm.Infrastructure.Data;
using Ucm.Infrastructure.Data.Models;

namespace Ucm.Infrastructure.Repositories
{
    public class StudyLogRepository : IStudyLogRepository
    {
        private readonly AppDbContext _context;

        public StudyLogRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StudyLog>> GetAllAsync()
        {
            var entities = await _context.StudyLogs.ToListAsync();
            return entities.Select(MapToEntity);
        }

        public async Task<StudyLog> GetByIdAsync(int id)
        {
            var ef = await _context.StudyLogs.FindAsync(id);
            return ef == null ? null : MapToEntity(ef);
        }

        public async Task<StudyLog> AddAsync(StudyLog entity)
        {
            var ef = MapToEf(entity);
            _context.StudyLogs.Add(ef);
            await _context.SaveChangesAsync();
            return MapToEntity(ef);
        }

        public async Task UpdateAsync(StudyLog entity)
        {
            var ef = await _context.StudyLogs.FindAsync(entity.Id);
            if (ef == null) return;
            ef.TaskId = entity.TaskId;
            ef.ActualTimeSpent = entity.ActualTimeSpent;
            ef.LogDate = entity.LogDate;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var ef = await _context.StudyLogs.FindAsync(id);
            if (ef == null) return;
            _context.StudyLogs.Remove(ef);
            await _context.SaveChangesAsync();
        }

        // Mapping helpers
        private StudyLog MapToEntity(StudyLogEf ef) =>
            new StudyLog
            {
                Id = ef.Id,
                TaskId = ef.TaskId,
                ActualTimeSpent = ef.ActualTimeSpent,
                LogDate = ef.LogDate
            };

        private StudyLogEf MapToEf(StudyLog entity) =>
            new StudyLogEf
            {
                Id = entity.Id,
                TaskId = entity.TaskId,
                ActualTimeSpent = entity.ActualTimeSpent,
                LogDate = entity.LogDate
            };
    }
}
    