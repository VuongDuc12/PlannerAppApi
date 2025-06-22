using System;
using System.Collections.Generic;
using Ucm.Application.DTOs;

namespace Ucm.Application.Dtos
{
    public class StudyTaskDto
    {
        public int Id { get; set; }
        public int PlanCourseId { get; set; }
        public int? CourseTopicId { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public decimal? EstimatedHours { get; set; }
        public DateTime? DueDate { get; set; }
        public DateOnly? ScheduledDate { get; set; }
        public string Status { get; set; }
        public DateTime? CompletionDate { get; set; }
        public List<StudyLogDto> Logs { get; set; }
        public List<TaskResourceDto> Resources { get; set; }
    }


   
}