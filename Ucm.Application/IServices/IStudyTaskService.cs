using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Application.Dtos;

namespace Ucm.Application.IServices
{
    public interface IStudyTaskService
    {
        Task<IEnumerable<StudyTaskDto>> GetAllAsync();
        Task<StudyTaskDto> GetByIdAsync(int id);
        Task<StudyTaskDto> AddAsync(StudyTaskDto dto);
        Task UpdateAsync(StudyTaskDto dto);
        Task DeleteAsync(int id);
    }
}