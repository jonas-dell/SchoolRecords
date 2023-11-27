using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SRD.Infra.Migrations
{
    public partial class exclusaoEmCascata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserContact_User_ContactId",
                table: "UserContact");

            migrationBuilder.AddForeignKey(
                name: "FK_UserContact_User_ContactId",
                table: "UserContact",
                column: "ContactId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserContact_User_ContactId",
                table: "UserContact");

            migrationBuilder.AddForeignKey(
                name: "FK_UserContact_User_ContactId",
                table: "UserContact",
                column: "ContactId",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
