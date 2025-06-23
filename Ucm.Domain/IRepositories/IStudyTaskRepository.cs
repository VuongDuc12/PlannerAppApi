using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Domain.Entities;

namespace Ucm.Domain.IRepositories
{
    public interface IStudyTaskRepository
    {
        Task<IEnumerable<StudyTask>> GetAllAsync();
        Task<StudyTask> GetByIdAsync(int id);
        Task<IEnumerable<StudyTask>> GetByDateAsync(Guid userId, DateTime date);
        Task<IEnumerable<StudyTask>> GetByStudyPlanIdAsync(Guid userId, int studyPlanId);
        Task<StudyTask> AddAsync(StudyTask entity);
        Task UpdateAsync(StudyTask entity);
        Task DeleteAsync(int id);
    }
}