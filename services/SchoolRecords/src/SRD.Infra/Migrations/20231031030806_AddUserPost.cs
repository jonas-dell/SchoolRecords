using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class AddUserPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserPost",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "VARCHAR(4000)", nullable: false),
                    Image = table.Column<string>(type: "Text", nullable: false),
                    Post = table.Column<string>(type: "VARCHAR(4000)", nullable: true),
                    Date = table.Column<string>(type: "VARCHAR(20)", nullable: true),
                    PerfilId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPost_Perfil_PerfilId",
                        column: x => x.PerfilId,
                        principalTable: "Perfil",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserPost_PerfilId",
                table: "UserPost",
                column: "PerfilId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPost");
        }
    }
}
