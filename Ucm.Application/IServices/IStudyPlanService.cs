using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Domain.Entities;

namespace Ucm.Application.IServices
{
    public interface IStudyPlanService
    {
        Task<IEnumerable<StudyPlan>> GetAllAsync();
        Task<IEnumerable<StudyPlan>> GetAllByUserIdAsync(Guid userId);
        Task<StudyPlan> GetByIdAsync(int id);
        Task<StudyPlan> CreateAsync(StudyPlan entity);
        Task<bool> UpdateAsync(StudyPlan entity);
        Task<bool> DeleteAsync(int id);
    }
}