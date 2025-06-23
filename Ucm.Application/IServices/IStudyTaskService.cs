using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Application.Dtos;

namespace Ucm.Application.IServices
{
    public interface IStudyTaskService
    {
        Task<IEnumerable<StudyTaskDto>> GetAllAsync();
        Task<StudyTaskDto> GetByIdAsync(int id);
        Task<IEnumerable<StudyTaskDto>> GetByDateAsync(Guid userId, DateTime date);
        Task<IEnumerable<StudyTaskDto>> GetTodayAsync(Guid userId);
        Task<IEnumerable<StudyTaskDto>> GetByStudyPlanIdAsync(Guid userId, int studyPlanId);
        Task<StudyTaskDto> AddAsync(StudyTaskDto dto);
        Task UpdateAsync(StudyTaskDto dto);
        Task DeleteAsync(int id);
    }
}