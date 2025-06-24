using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ucm.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStudyPlan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "StudyPlans",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CourseCount",
                table: "StudyPlans",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completed",
                table: "StudyPlans");

            migrationBuilder.DropColumn(
                name: "CourseCount",
                table: "StudyPlans");
        }
    }
}
