using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Domain.Entities;

namespace Ucm.Domain.IRepositories
{
    public interface IStudyPlanCourseRepository
    {
        Task<IEnumerable<StudyPlanCourse>> GetAllAsync();
        Task<StudyPlanCourse> GetByIdAsync(int id);
        Task<StudyPlanCourse> AddAsync(StudyPlanCourse entity);
        Task UpdateAsync(StudyPlanCourse entity);
        Task DeleteAsync(int id);
    }
}