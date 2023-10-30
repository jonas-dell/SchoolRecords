using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class CreateContact : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contact",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UrlPerfil = table.Column<string>(type: "VARCHAR(800)", nullable: true),
                    Email = table.Column<string>(type: "VARCHAR(300)", nullable: true),
                    NumberPhone = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    TypePhone = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    Day = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    Month = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    Year = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    UrlSite = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    TypeSite = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    PerfilId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contact", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contact_Perfil_PerfilId",
                        column: x => x.PerfilId,
                        principalTable: "Perfil",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contact_PerfilId",
                table: "Contact",
                column: "PerfilId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contact");
        }
    }
}
