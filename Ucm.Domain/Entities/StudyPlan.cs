using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ucm.Domain.Entities
{
    public class StudyPlan
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string PlanName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public AppUser User { get; set; }
        public ICollection<StudyTask> Tasks { get; set; }
    }

}
