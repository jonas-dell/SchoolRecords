using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class UpdateJobExperience : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobExperiences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobTitle = table.Column<string>(type: "VARCHAR(255)", maxLength: 255, nullable: false),
                    JobType = table.Column<string>(type: "VARCHAR(100)", maxLength: 100, nullable: true),
                    CompanyName = table.Column<string>(type: "VARCHAR(255)", maxLength: 255, nullable: false),
                    CompanyLocation = table.Column<string>(type: "VARCHAR(200)", maxLength: 200, nullable: true),
                    TypeLocation = table.Column<string>(type: "VARCHAR(200)", maxLength: 200, nullable: true),
                    CheckboxJob = table.Column<bool>(type: "bit", nullable: false),
                    JobStartMonth = table.Column<string>(type: "VARCHAR(25)", maxLength: 25, nullable: true),
                    JobStartYear = table.Column<int>(type: "int", nullable: false),
                    JobEndMonth = table.Column<string>(type: "VARCHAR(25)", maxLength: 25, nullable: true),
                    JobEndYear = table.Column<int>(type: "int", nullable: false),
                    JobSector = table.Column<string>(type: "VARCHAR(100)", maxLength: 100, nullable: true),
                    JobDescription = table.Column<string>(type: "text", nullable: true),
                    JobTitlePerfil = table.Column<string>(type: "VARCHAR(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobExperiences", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobExperiences");
        }
    }
}
