using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class AddAcademicEducation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_AcademicEducation_AcademicEducationId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_AcademicEducationId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_AcademicEducation_PerfilId",
                table: "AcademicEducation");

            migrationBuilder.DropColumn(
                name: "AcademicEducationId",
                table: "User");

            migrationBuilder.CreateIndex(
                name: "IX_AcademicEducation_PerfilId",
                table: "AcademicEducation",
                column: "PerfilId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AcademicEducation_PerfilId",
                table: "AcademicEducation");

            migrationBuilder.AddColumn<int>(
                name: "AcademicEducationId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_AcademicEducationId",
                table: "User",
                column: "AcademicEducationId");

            migrationBuilder.CreateIndex(
                name: "IX_AcademicEducation_PerfilId",
                table: "AcademicEducation",
                column: "PerfilId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_AcademicEducation_AcademicEducationId",
                table: "User",
                column: "AcademicEducationId",
                principalTable: "AcademicEducation",
                principalColumn: "Id");
        }
    }
}
