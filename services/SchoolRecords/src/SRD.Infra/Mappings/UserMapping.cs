using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SRD.Infra.Mappings
{
    public class UserMapping : IEntityTypeConfiguration<Domain.User.Entities.User>
    {
        public void Configure(EntityTypeBuilder<Domain.User.Entities.User> builder)
        {
            builder.ToTable("User");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .UseIdentityColumn();

            builder.Property(x => x.Username)
                .HasColumnName("username")
                .IsRequired()
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.Email)
              .HasColumnName("email")
              .IsRequired()
              .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.Password)
                .HasColumnName("password")
                .IsRequired()
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.Role)
                .HasColumnName("role")
                .IsRequired(false)
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.Token)
                .HasColumnName ("token")
               .IsRequired(false)
               .HasColumnType("VARCHAR(100)");

            builder.HasMany(x => x.Contacts)
                   .WithMany(x => x.Users)
                   .UsingEntity<Domain.User.Entities.UserContact>(
                        x => x.HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId),
                        x => x.HasOne(x => x.Contact).WithMany().HasForeignKey(x => x.ContactId));

            builder.HasOne(x => x.Perfil)
                .WithOne(p => p.User)
                .HasForeignKey<Domain.Perfil.Entities.Perfil>(x => x.UserId);

            builder.HasOne(x => x.Article)
                .WithOne(p => p.User)
                .HasForeignKey<Domain.Perfil.Entities.Article>(x => x.UserId);


        }
    }
}
