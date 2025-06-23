using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Domain.Entities;

namespace Ucm.Domain.IRepositories
{
    public interface IStudyTaskRepository: IRepositoryBase<StudyTask>
    {
        Task<IEnumerable<StudyTask>> GetByDateAsync(Guid userId, DateTime date);
        Task<IEnumerable<StudyTask>> GetByStudyPlanIdAsync(Guid userId, int studyPlanId);
    }
}