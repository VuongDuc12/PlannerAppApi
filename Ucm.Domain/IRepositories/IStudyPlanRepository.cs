using Ucm.Domain.Entities;

namespace Ucm.Domain.IRepositories
{
    public interface IStudyPlanRepository : IRepositoryBase<StudyPlan>
    {
        // Thêm các method đặc thù nếu cần, ví dụ:
        Task<IEnumerable<StudyPlan>> GetAllByUserIdAsync(Guid userId);
    }
}