using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class UpdateTableUserAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_USER",
                table: "USER");

            migrationBuilder.RenameTable(
                name: "USER",
                newName: "User");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "USER");

            migrationBuilder.AddPrimaryKey(
                name: "PK_USER",
                table: "USER",
                column: "Id");
        }
    }
}
