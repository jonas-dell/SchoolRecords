using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class AddAboutInPerfil : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "about",
                table: "Perfil",
                type: "VARCHAR(4000)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "about",
                table: "Perfil");
        }
    }
}
