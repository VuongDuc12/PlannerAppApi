using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ucm.Infrastructure.Data.Models
{
    public class StudyPlanEf
    {
        public int Id { get; set; } // PlanId

        public string UserId { get; set; }
        public AppUserEF User { get; set; }

        public string PlanName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public ICollection<StudyTaskEf> Tasks { get; set; }
    }

}
