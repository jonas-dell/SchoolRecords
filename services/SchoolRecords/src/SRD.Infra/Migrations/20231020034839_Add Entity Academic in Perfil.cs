using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class AddEntityAcademicinPerfil : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AcademicEducationId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_AcademicEducationId",
                table: "User",
                column: "AcademicEducationId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_AcademicEducation_AcademicEducationId",
                table: "User",
                column: "AcademicEducationId",
                principalTable: "AcademicEducation",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_AcademicEducation_AcademicEducationId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_AcademicEducationId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "AcademicEducationId",
                table: "User");
        }
    }
}
