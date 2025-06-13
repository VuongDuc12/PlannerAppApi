using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ucm.Domain.Enums;


namespace Ucm.Domain.Entities
{
    public class StudyTask
    {
        public int Id { get; set; }
        public int PlanId { get; set; }
        public int CourseId { get; set; }

        public string TaskName { get; set; }
        public string Description { get; set; }
        public int? EstimatedTime { get; set; } // minutes
        public DateTime? Deadline { get; set; }

        public Enums.TaskStatus Status { get; set; }= Enums.TaskStatus.Pending;

        public StudyPlan Plan { get; set; }
        public Course Course { get; set; }
        public ICollection<StudyLog> Logs { get; set; }
        public ICollection<TaskResource> Resources { get; set; }
    }

}
