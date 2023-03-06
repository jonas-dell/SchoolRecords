using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRD.Domain.User.Entities;

namespace SRD.Infra.Mappings
{
    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .UseIdentityColumn();

            builder.Property(x => x.Username)
                .IsRequired()
                .HasColumnType("VARCHAR(100)");

            builder.ToTable("User");
        }
    }
}
