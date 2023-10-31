using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRD.Domain.Perfil.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Infra.Mappings
{
    public class UserPostMapping : IEntityTypeConfiguration<Domain.Perfil.Entities.UserPost>
    {
        public void Configure(EntityTypeBuilder<UserPost> builder)
        {
            builder.ToTable("UserPost");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd()
                .UseIdentityColumn();

            builder.Property(x => x.Name)
                .HasColumnName("Name")
                .HasColumnType("VARCHAR(4000)");

            builder.Property(x => x.Image)
                .HasColumnName("Image")
                .HasColumnType("Text");
            
            builder.Property(x => x.Post)
                .HasColumnName("Post")
                .HasColumnType("VARCHAR(4000)");

            builder.Property(x => x.Date)
                .HasColumnName("Date")
                .HasColumnType("VARCHAR(20)");

        }
    }
}
