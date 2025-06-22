using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Application.Dtos;

namespace Ucm.Application.IServices
{
    public interface IStudyPlanCourseService
    {
        Task<IEnumerable<StudyPlanCourseDto>> GetAllAsync();
        Task<StudyPlanCourseDto> GetByIdAsync(int id);
        Task<StudyPlanCourseDto> AddAsync(StudyPlanCourseDto dto);
        Task UpdateAsync(StudyPlanCourseDto dto);
        Task DeleteAsync(int id);
    }
}