using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ucm.Infrastructure.Data.Models
{
    public class UserEnrollmentEf
    {
        public int Id { get; set; } // EnrollmentId

        public string UserId { get; set; }
        public AppUserEF User { get; set; }

        public int CourseId { get; set; }
        public CourseEf Course { get; set; }

        public DateTime EnrollmentDate { get; set; }
    }

}
