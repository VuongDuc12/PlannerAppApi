using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ucm.Domain.Entities;

namespace Ucm.Domain.IRepositories
{
    public interface IStudyLogRepository
    {
        Task<IEnumerable<StudyLog>> GetAllAsync();
        Task<StudyLog> GetByIdAsync(int id);
        Task<StudyLog> AddAsync(StudyLog entity);
        Task UpdateAsync(StudyLog entity);
        Task DeleteAsync(int id);
    }
}
