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
    public class TaskResourceRepository : ITaskResourceRepository
    {
        private readonly AppDbContext _context;

        public TaskResourceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskResource>> GetAllAsync()
        {
            var entities = await _context.TaskResources.ToListAsync();
            return entities.Select(MapToEntity);
        }

        public async Task<TaskResource> GetByIdAsync(int id)
        {
            var ef = await _context.TaskResources.FindAsync(id);
            return ef == null ? null : MapToEntity(ef);
        }

        public async Task<TaskResource> AddAsync(TaskResource entity)
        {
            var ef = MapToEf(entity);
            _context.TaskResources.Add(ef);
            await _context.SaveChangesAsync();
            return MapToEntity(ef);
        }

        // Fix for CS0029: Convert ResourceType enum to string when assigning to ef.ResourceType
        public async Task UpdateAsync(TaskResource entity)
        {
            var ef = await _context.TaskResources.FindAsync(entity.Id);
            if (ef == null) return;
            ef.TaskId = entity.TaskId;
            ef.ResourceType = entity.ResourceType.ToString(); // Convert enum to string
            ef.ResourceURL = entity.ResourceURL;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var ef = await _context.TaskResources.FindAsync(id);
            if (ef == null) return;
            _context.TaskResources.Remove(ef);
            await _context.SaveChangesAsync();
        }

        // Fix for CS0029: Convert string to ResourceType enum when mapping TaskResourceEf to TaskResource
        private TaskResource MapToEntity(TaskResourceEf ef) =>
            new TaskResource
            {
                Id = ef.Id,
                TaskId = ef.TaskId,
                ResourceType = Enum.TryParse<ResourceType>(ef.ResourceType, out var resourceType) ? resourceType : ResourceType.Other, // Convert string to enum
                ResourceURL = ef.ResourceURL
            };

        // Fix for CS0029: Convert ResourceType enum to string when mapping TaskResource to TaskResourceEf
        private TaskResourceEf MapToEf(TaskResource entity) =>
            new TaskResourceEf
            {
                Id = entity.Id,
                TaskId = entity.TaskId,
                ResourceType = entity.ResourceType.ToString(), // Convert enum to string
                ResourceURL = entity.ResourceURL
            };
    }
}