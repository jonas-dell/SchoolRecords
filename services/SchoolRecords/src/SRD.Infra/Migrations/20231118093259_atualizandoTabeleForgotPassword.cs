using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class atualizandoTabeleForgotPassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ForgotPassword",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "INT", nullable: false),
                    Email = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    Token = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "DATETIME", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForgotPassword", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ForgotPassword");
        }
    }
}
