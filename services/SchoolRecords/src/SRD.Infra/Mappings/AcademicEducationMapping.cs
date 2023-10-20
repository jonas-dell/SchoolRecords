using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRD.Domain.Perfil.Entities;


namespace SRD.Infra.Mappings
{
    public class AcademicEducationMapping : IEntityTypeConfiguration<Domain.Perfil.Entities.AcademicEducation>
    {
        public void Configure(EntityTypeBuilder<AcademicEducation> builder)
        {
            builder.ToTable("AcademicEducation");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd()
                .UseIdentityColumn();

            builder.Property(x => x.Title)
                .HasColumnName("Title")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.AcademicType)
                .HasColumnName("AcademicType")
                .HasColumnType("VARCHAR(200)");

            builder.Property(x => x.StudyArea)
                .HasColumnName("StudyArea")
                .HasColumnType("VARCHAR(200)");


            builder.Property(x => x.StudyStartMonth)
                .HasColumnName("StudyStartMonth")
                .HasMaxLength(25);

            builder.Property(x => x.StudyStartYear)
                .HasColumnType("VARCHAR(50)")
                .HasColumnName("StudyStartYear");

            builder.Property(x => x.StudyEndMonth)
                .HasColumnName("StudyEndMonth")
                .HasMaxLength(25);

            builder.Property(x => x.StudyEndYear)
                .HasColumnType("VARCHAR(50)")
                .HasColumnName("StudyEndYear");

            builder.Property(x => x.Note)
                 .HasColumnName("Note")
                 .HasColumnType("DECIMAL");

            builder.Property(x => x.ActivitiesGroups)
                .HasColumnName("ActivitiesGroups")
                .HasColumnType("VARCHAR(400)");

            builder.Property(x => x.Description)
                 .HasColumnName("Description")
                 .HasColumnType("VARCHAR(1000)");
        }
    }
}
