using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class RelacionamentoPerfilUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Testes");

            migrationBuilder.CreateTable(
                name: "Perfil",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    perfilName = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    perfilLastName = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    sector = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    education = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    country = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    zipCode = table.Column<int>(type: "INT", nullable: true),
                    street = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    district = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    city = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    number = table.Column<int>(type: "INT", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perfil", x => x.id);
                    table.ForeignKey(
                        name: "FK_Perfil_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Perfil_UserId",
                table: "Perfil",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Perfil");

            migrationBuilder.CreateTable(
                name: "Testes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "VARCHAR(250)", nullable: false),
                    Password = table.Column<string>(type: "VARCHAR(250)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Testes", x => x.Id);
                });
        }
    }
}
