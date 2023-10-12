using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class Updatepropertiesperfil : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "district",
                table: "Perfil");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "User",
                newName: "username");

            migrationBuilder.RenameColumn(
                name: "Token",
                table: "User",
                newName: "token");

            migrationBuilder.RenameColumn(
                name: "Role",
                table: "User",
                newName: "role");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "User",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "User",
                newName: "email");

            migrationBuilder.AlterColumn<string>(
                name: "city",
                table: "Perfil",
                type: "VARCHAR(200)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR(100)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "complement",
                table: "Perfil",
                type: "VARCHAR(200)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "neighborhood",
                table: "Perfil",
                type: "VARCHAR(400)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "state",
                table: "Perfil",
                type: "VARCHAR(10)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "complement",
                table: "Perfil");

            migrationBuilder.DropColumn(
                name: "neighborhood",
                table: "Perfil");

            migrationBuilder.DropColumn(
                name: "state",
                table: "Perfil");

            migrationBuilder.RenameColumn(
                name: "username",
                table: "User",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "token",
                table: "User",
                newName: "Token");

            migrationBuilder.RenameColumn(
                name: "role",
                table: "User",
                newName: "Role");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "User",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "User",
                newName: "Email");

            migrationBuilder.AlterColumn<string>(
                name: "city",
                table: "Perfil",
                type: "VARCHAR(100)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR(200)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "district",
                table: "Perfil",
                type: "VARCHAR(100)",
                nullable: true);
        }
    }
}
