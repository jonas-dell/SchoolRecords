using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class ADDMidia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "UserPost");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "UserPost",
                type: "VARCHAR(4000)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR(4000)");

            migrationBuilder.AlterColumn<string>(
                name: "JobTitle",
                table: "UserPost",
                type: "VARCHAR(100)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR(100)");

            migrationBuilder.AlterColumn<string>(
                name: "Foto",
                table: "UserPost",
                type: "Text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "Text");

            migrationBuilder.AddColumn<string>(
                name: "Midia",
                table: "UserPost",
                type: "Text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tipo",
                table: "UserPost",
                type: "VARCHAR(100)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Midia",
                table: "UserPost");

            migrationBuilder.DropColumn(
                name: "Tipo",
                table: "UserPost");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "UserPost",
                type: "VARCHAR(4000)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "VARCHAR(4000)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "JobTitle",
                table: "UserPost",
                type: "VARCHAR(100)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "VARCHAR(100)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Foto",
                table: "UserPost",
                type: "Text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "Text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "UserPost",
                type: "Text",
                nullable: false,
                defaultValue: "");
        }
    }
}
