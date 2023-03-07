using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SRD.Infra.Mappings
{
    public class UserMapping : IEntityTypeConfiguration<Domain.User.Entities.User>
    {
        public void Configure(EntityTypeBuilder<Domain.User.Entities.User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .UseIdentityColumn();

            builder.Property(x => x.Username)
                .IsRequired()
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.Password)
                .IsRequired()
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.Role)
                .IsRequired(false)
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.Token)
               .IsRequired(false)
               .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.Email)
              .IsRequired()
              .HasColumnType("VARCHAR(100)");

            builder.ToTable("User");
        }
    }
}
