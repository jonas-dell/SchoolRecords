using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRD.Domain.User.Entities;

namespace SRD.Infra.Mappings
{
    public class ForgotPasswordMapping : IEntityTypeConfiguration<ForgotPassword>
    {
        public void Configure(EntityTypeBuilder<ForgotPassword> builder)
        {
            builder.ToTable("ForgotPassword");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd()
                .UseIdentityColumn();

            builder.Property(x => x.UserId)
                .HasColumnName("UserId")
                .HasColumnType("INT");

            builder.Property(x => x.Email)
                .HasColumnName("Email")
                .HasColumnType("VARCHAR(200)");


            builder.Property(x => x.Token)
                .HasColumnName("Token")
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.CreatedAt)
                .HasColumnName("CreatedAt")
                .HasColumnType("DATETIME");
        }
    }
}
