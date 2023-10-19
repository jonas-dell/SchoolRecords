using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class changingZipcodeType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "zipCode",
                table: "Perfil",
                type: "VARCHAR(12)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INT",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "zipCode",
                table: "Perfil",
                type: "INT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR(12)",
                oldNullable: true);
        }
    }
}
