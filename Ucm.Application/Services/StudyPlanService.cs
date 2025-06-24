using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Ucm.Application.IServices;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;

namespace Ucm.Application.Services
{
    public class StudyPlanService : IStudyPlanService
    {
        private readonly IStudyPlanRepository _repository;
        private readonly IStudyPlanCourseRepository _studyPlanCourseRepository;

        public StudyPlanService(IStudyPlanRepository repository, IStudyPlanCourseRepository studyPlanCourseRepository)
        {
            _repository = repository;
            _studyPlanCourseRepository = studyPlanCourseRepository;
        }

        public async Task<IEnumerable<StudyPlan>> GetAllAsync()
        {
            var plans = await _repository.GetAllAsync();
            // Đếm trực tiếp từ database cho mỗi plan
            foreach (var plan in plans)
            {
                plan.CourseCount = await _studyPlanCourseRepository.CountByStudyPlanIdAsync(plan.Id);
            }
            return plans;
        }

        public async Task<IEnumerable<StudyPlan>> GetAllWithCoursesAsync()
        {
            var plans = await _repository.GetAllAsync();
            // Load courses cho mỗi plan
            foreach (var plan in plans)
            {
                var planWithCourses = await _repository.GetByIdWithCoursesAsync(plan.Id);
                if (planWithCourses != null)
                {
                    plan.PlanCourses = planWithCourses.PlanCourses;
                }
                // Đếm trực tiếp từ database
                plan.CourseCount = await _studyPlanCourseRepository.CountByStudyPlanIdAsync(plan.Id);
            }
            return plans;
        }

        public async Task<IEnumerable<StudyPlan>> GetAllByUserIdAsync(Guid userId)
        {
            var plans = await _repository.GetAllByUserIdAsync(userId);
            // Đếm trực tiếp từ database cho mỗi plan
            foreach (var plan in plans)
            {
                plan.CourseCount = await _studyPlanCourseRepository.CountByStudyPlanIdAsync(plan.Id);
            }
            return plans;
        }

        public async Task<StudyPlan> GetByIdAsync(int id)
        {
            var plan = await _repository.GetByIdWithCoursesAsync(id);
            if (plan != null)
            {
                System.Diagnostics.Debug.WriteLine($"GetByIdAsync: StudyPlan {id} - PlanCourses count: {plan.PlanCourses?.Count ?? 0}");
                if (plan.PlanCourses != null)
                {
                    foreach (var pc in plan.PlanCourses)
                    {
                        System.Diagnostics.Debug.WriteLine($"  - StudyPlanCourse {pc.Id}: CourseId = {pc.CourseId}");
                    }
                }
                
                // Đếm trực tiếp từ database
                plan.CourseCount = await _studyPlanCourseRepository.CountByStudyPlanIdAsync(plan.Id);
            }
            return plan;
        }

        public async Task<StudyPlan> CreateAsync(StudyPlan entity)
        {
            // Đếm từ PlanCourses nếu có, hoặc 0 nếu chưa có
            entity.CourseCount = entity.PlanCourses?.Count ?? 0;
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> UpdateAsync(StudyPlan entity)
        {
            // Đếm trực tiếp từ database
            entity.CourseCount = await _studyPlanCourseRepository.CountByStudyPlanIdAsync(entity.Id);
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

        public async Task<bool> UpdateCourseCountAsync(int studyPlanId)
        {
            // Đếm trực tiếp từ database
            var courseCount = await _studyPlanCourseRepository.CountByStudyPlanIdAsync(studyPlanId);
            System.Diagnostics.Debug.WriteLine($"Service: StudyPlan {studyPlanId} has {courseCount} courses");
            
            // Cập nhật chỉ CourseCount mà không ảnh hưởng đến PlanCourses
            var success = await _repository.UpdateCourseCountOnlyAsync(studyPlanId, courseCount);
            
            System.Diagnostics.Debug.WriteLine($"Service: Update result = {success}");
            
            return success;
        }
    }
}