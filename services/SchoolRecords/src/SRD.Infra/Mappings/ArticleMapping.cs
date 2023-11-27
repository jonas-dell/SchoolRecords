using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRD.Domain.Perfil.Entities;

namespace SRD.Infra.Mappings
{
    public class ArticleMapping: IEntityTypeConfiguration<Domain.Perfil.Entities.Article>
    {


        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.ToTable("Article");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd()
                .UseIdentityColumn();

            builder.Property(x => x.Title)
                .HasColumnName("Title")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.Authors)
                .HasColumnName("Authors")
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

            builder.Property(x => x.NumberPages)
                .HasColumnName("NumberPages")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.PdfFile)
                .HasColumnName("PdfContent")
                .HasColumnType("VARBINARY(MAX)");

        }
    }
}
