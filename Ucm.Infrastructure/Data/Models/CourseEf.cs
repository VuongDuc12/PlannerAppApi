using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ucm.Infrastructure.Data.Models
{
    public class CourseEf
    {
        public int Id { get; set; } // CourseId

        public string CourseName { get; set; }
        public int Credits { get; set; }
        public string Description { get; set; }

        public ICollection<CourseTopicEf> Topics { get; set; }
        public ICollection<UserEnrollmentEf> Enrollments { get; set; }
        public ICollection<StudyTaskEf> StudyTasks { get; set; }
    }

}
