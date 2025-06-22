using HotelApp.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ucm.Domain.Entities;
using Ucm.Domain.IRepositories;
using Ucm.Infrastructure.Common.Mappers;
using Ucm.Infrastructure.Data;
using Ucm.Infrastructure.Data.Models;

namespace Ucm.Infrastructure.Repositories
{


    public class StudyPlanRepository : RepositoryBase<StudyPlan, StudyPlanEf>, IStudyPlanRepository
    {
        public StudyPlanRepository(AppDbContext context, IEntityEfMapper<StudyPlan, StudyPlanEf> mapper)
            : base(context, mapper) { }

        public async Task<IEnumerable<StudyPlan>> GetAllByUserIdAsync(Guid userId)
        {
            var studyPlanEfs = await _context.StudyPlans
                .Where(x => x.UserId == userId)
                .ToListAsync();

            return studyPlanEfs.Select(ef => _mapper.ToEntity(ef));
        }

    }

}
