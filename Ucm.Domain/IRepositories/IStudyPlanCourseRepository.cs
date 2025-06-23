using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Domain.Entities;

namespace Ucm.Domain.IRepositories
{
    public interface IStudyPlanCourseRepository : IRepositoryBase<StudyPlanCourse>
    {
        Task<IEnumerable<StudyPlanCourse>> GetAllAsync();
        Task<StudyPlanCourse> GetByIdAsync(int id);
        Task AddAsync(StudyPlanCourse entity);
        Task UpdateAsync(StudyPlanCourse entity);
        Task DeleteAsync(int id);
        Task<IEnumerable<StudyPlanCourse>> GetByIdsAsync(List<int> ids);
        // Optional: If you want to return the entity after adding
        // Task<StudyPlanCourse> AddAndReturnAsync(StudyPlanCourse entity);
    }
}