using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class addlistaskills : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "JobTitlePerfil",
                table: "JobExperiences",
                type: "VARCHAR(250)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR(400)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Skills",
                table: "JobExperiences",
                type: "VARCHAR(MAX)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Skills",
                table: "JobExperiences");

            migrationBuilder.AlterColumn<string>(
                name: "JobTitlePerfil",
                table: "JobExperiences",
                type: "VARCHAR(400)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR(250)",
                oldNullable: true);
        }
    }
}
