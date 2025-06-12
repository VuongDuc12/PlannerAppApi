using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Ucm.Infrastructure.Data.Models;

namespace Ucm.Infrastructure.Data
{
    public class AppDbContext : IdentityDbContext<AppUserEF, IdentityRole<Guid>, Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSets cho các entity
        public DbSet<CourseEf> Courses { get; set; }
        public DbSet<CourseTopicEf> CourseTopics { get; set; }
        public DbSet<UserEnrollmentEf> UserEnrollments { get; set; }
        public DbSet<StudyPlanEf> StudyPlans { get; set; }
        public DbSet<StudyTaskEf> StudyTasks { get; set; }
        public DbSet<StudyLogEf> StudyLogs { get; set; }
        public DbSet<TaskResourceEf> TaskResources { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Table rename nếu cần (tùy chọn)
            builder.Entity<AppUserEF>().ToTable("Users");
            builder.Entity<IdentityRole<Guid>>().ToTable("Roles");
            builder.Entity<IdentityUserRole<Guid>>().ToTable("UserRoles");
            builder.Entity<IdentityUserClaim<Guid>>().ToTable("UserClaims");
            builder.Entity<IdentityUserLogin<Guid>>().ToTable("UserLogins");
            builder.Entity<IdentityRoleClaim<Guid>>().ToTable("RoleClaims");
            builder.Entity<IdentityUserToken<Guid>>().ToTable("UserTokens");

            // Fluent API cho quan hệ nếu cần (ví dụ StudyTask → StudyPlan)
            builder.Entity<StudyTaskEf>()
                .HasOne(t => t.Plan)
                .WithMany(p => p.Tasks)
                .HasForeignKey(t => t.PlanId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserEnrollmentEf>()
                .HasOne(e => e.User)
                .WithMany(u => u.Enrollments)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserEnrollmentEf>()
                .HasOne(e => e.Course)
                .WithMany(c => c.Enrollments)
                .HasForeignKey(e => e.CourseId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<TaskResourceEf>()
                .HasOne(r => r.Task)
                .WithMany(t => t.Resources)
                .HasForeignKey(r => r.TaskId)
                .OnDelete(DeleteBehavior.Cascade);
            // Add more fluent configurations here if needed
        }
    }
}
