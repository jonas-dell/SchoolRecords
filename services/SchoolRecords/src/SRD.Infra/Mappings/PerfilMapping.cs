using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace SRD.Infra.Mappings
{
    public class PerfilMapping : IEntityTypeConfiguration<Domain.Perfil.Entities.Perfil>
    {
        public void Configure(EntityTypeBuilder<Domain.Perfil.Entities.Perfil> builder)
        {
            builder.ToTable("Perfil");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id").UseIdentityColumn();

            builder.Property(x => x.PerfilName)
                .HasColumnName("perfilName")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.PerfilLastName)
            .HasColumnName("perfilLastName")
            .HasColumnType("VARCHAR(200)");
            
            builder.Property(x => x.About)
            .HasColumnName("about")
            .HasColumnType("VARCHAR(4000)");

            builder.Property(x => x.Sector)
                .HasColumnName("sector")
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.Education)
                .HasColumnName("education")
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.Country)
                .HasColumnName("country")
                .HasColumnType("VARCHAR(100)");

            builder.Property(x => x.ZipCode)
                .HasColumnName("zipCode")
                .HasColumnType("VARCHAR(12)");

            builder.Property(x => x.Street)
                .HasColumnName("street")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.Number)
                .HasColumnName("number")
                .HasColumnType("INT");

            builder.Property(x => x.Complement)
                .HasColumnName("complement")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.Neighborhood)
                .HasColumnName("neighborhood")
                .HasColumnType("VARCHAR(300)");

            builder.Property(x => x.City)
                .HasColumnName("city")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.State)
                .HasColumnName("state")
                .HasColumnType("VARCHAR(10)");

            builder.Property(x => x.Number)
                .HasColumnName("number")
                .HasColumnType("INT");

            builder.Property(x => x.Foto)
                .HasColumnName("foto")
                .HasColumnType("TEXT");

            builder.Property(x => x.Imagem)
                .HasColumnName("imagem")
                .HasColumnType("TEXT");

            builder.HasOne(x => x.JobExperience)
                .WithOne(p => p.Perfil)
                .HasForeignKey<Domain.Perfil.Entities.JobExperience>(x => x.PerfilId);
            
            builder.HasOne(x => x.AcademicEducation)
             .WithOne(p => p.Perfil)
             .HasForeignKey<Domain.Perfil.Entities.AcademicEducation>(x => x.PerfilId);
        }
    }
}
