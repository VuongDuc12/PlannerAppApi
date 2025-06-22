using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ucm.Application.IServices;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;

namespace Ucm.Application.Services
{
    public class StudyPlanService : IStudyPlanService
    {
        private readonly IStudyPlanRepository _repository;

        public StudyPlanService(IStudyPlanRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<StudyPlan>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<IEnumerable<StudyPlan>> GetAllByUserIdAsync(Guid userId)
        {
            return await _repository.GetAllByUserIdAsync(userId);
        }

        public async Task<StudyPlan> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<StudyPlan> CreateAsync(StudyPlan entity)
        {
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> UpdateAsync(StudyPlan entity)
        {
            _repository.Update(entity);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return false;
            _repository.Delete(entity);
            await _repository.SaveChangesAsync();
            return true;
        }
    }
}