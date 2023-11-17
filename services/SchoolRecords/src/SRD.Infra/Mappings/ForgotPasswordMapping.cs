using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRD.Domain.User.Entities;

namespace SRD.Infra.Mappings
{
    public class ForgotPasswordMapping : IEntityTypeConfiguration<ForgotPassword>
    {
        public void Configure(EntityTypeBuilder<ForgotPassword> builder)
        {
            builder.ToTable("PasswordRecoveryToken");

            builder.HasKey(x => x.Id);

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id").UseIdentityColumn();

            builder.Property(x => x.UserId)
                .HasColumnName("UserId")
                .IsRequired();

            builder.Property(x => x.Token)
                .HasColumnName("Token")
                .IsRequired()
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.CreatedAt)
                .HasColumnName("CreatedAt")
                .IsRequired()
                .HasColumnType("DATETIME");

            // Definindo relacionamento com a entidade User
            builder.HasOne<Domain.User.Entities.User>()
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}
