using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRD.Domain.Perfil.Entities;

namespace SRD.Infra.Mappings
{
    public class ContactMapping : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.ToTable("Contact");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd()
                .UseIdentityColumn();

            builder.Property(x => x.UrlPerfil)
                .HasColumnName("UrlPerfil")
                .HasColumnType("VARCHAR(800)");

            builder.Property(x => x.Email)
                .HasColumnName("Email")
                .HasColumnType("VARCHAR(300)");

            builder.Property(x => x.NumberPhone)
                .HasColumnName("NumberPhone")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.TypePhone)
                .HasColumnName("TypePhone")
                .HasColumnType("VARCHAR(200)");


            builder.Property(x => x.Day)
                .HasColumnName("Day")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.Month)
                .HasColumnName("Month")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.Year)
                .HasColumnName("Year")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.UrlSite)
                .HasColumnName("UrlSite")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.TypeSite)
                .HasColumnName("TypeSite")
                .HasColumnType("VARCHAR(200)");
        }
    }
}
