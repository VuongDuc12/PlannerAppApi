namespace Ucm.Application.Dtos
{
    public class StudyPlanCourseDto
    {
        public int Id { get; set; }
        public int StudyPlanId { get; set; }
        public int CourseId { get; set; }
        public Guid? UserId { get; set; }
        // Add Task DTOs if needed
    }
}