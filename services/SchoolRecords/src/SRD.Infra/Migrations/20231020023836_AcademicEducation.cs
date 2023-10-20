using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class AcademicEducation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AcademicEducation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    AcademicType = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    StudyArea = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    StudyStartMonth = table.Column<string>(type: "VARCHAR(25)", maxLength: 25, nullable: true),
                    StudyStartYear = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    StudyEndMonth = table.Column<string>(type: "VARCHAR(25)", maxLength: 25, nullable: true),
                    StudyEndYear = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    Note = table.Column<decimal>(type: "DECIMAL(38,17)", nullable: true),
                    ActivitiesGroups = table.Column<string>(type: "VARCHAR(400)", nullable: true),
                    Description = table.Column<string>(type: "VARCHAR(1000)", nullable: true),
                    PerfilId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcademicEducation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AcademicEducation_Perfil_PerfilId",
                        column: x => x.PerfilId,
                        principalTable: "Perfil",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AcademicEducation_PerfilId",
                table: "AcademicEducation",
                column: "PerfilId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AcademicEducation");
        }
    }
}
