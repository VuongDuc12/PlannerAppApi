using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Domain.Entities;

namespace Ucm.Domain.IRepositories
{
    public interface ITaskResourceRepository
    {
        Task<IEnumerable<TaskResource>> GetAllAsync();
        Task<TaskResource> GetByIdAsync(int id);
        Task<TaskResource> AddAsync(TaskResource entity);
        Task UpdateAsync(TaskResource entity);
        Task DeleteAsync(int id);
    }
}