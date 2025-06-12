using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ucm.Infrastructure.Data.Models
{
    public class StudyTaskEf
    {
        public int Id { get; set; } // TaskId

        public int PlanId { get; set; }
        public StudyPlanEf Plan { get; set; }

        public int CourseId { get; set; }
        public CourseEf Course { get; set; }

        public string TaskName { get; set; }
        public string Description { get; set; }

        public int? EstimatedTime { get; set; } // phút
        public DateTime? Deadline { get; set; }

        public string Status { get; set; } = "Pending"; // enum dùng string để dễ scale

        public ICollection<StudyLogEf> Logs { get; set; }
        public ICollection<TaskResourceEf> Resources { get; set; }
    }

}
