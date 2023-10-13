using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRD.Domain.Perfil.Entities;


namespace SRD.Infra.Mappings
{
    public class JobExperienceMapping : IEntityTypeConfiguration<Domain.Perfil.Entities.JobExperience>
    {
        public void Configure(EntityTypeBuilder<JobExperience> builder)
        {
            builder.ToTable("JobExperiences");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd()
                .UseIdentityColumn();

            builder.Property(x => x.JobTitle)
                .HasColumnName("JobTitle")
                .HasMaxLength(255)
                .IsRequired();

            builder.Property(x => x.JobType)
                .HasColumnName("JobType")
                .HasMaxLength(100);

            builder.Property(x => x.CompanyName)
                .HasColumnName("CompanyName")
                .HasMaxLength(255) 
                .IsRequired();

            builder.Property(x => x.CompanyLocation)
                .HasColumnName("CompanyLocation")
                .HasMaxLength(200); 

            builder.Property(x => x.TypeLocation)
                .HasColumnName("TypeLocation")
                .HasMaxLength(200);

            builder.Property(x => x.CheckboxJob)
                .HasColumnName("CheckboxJob");

            builder.Property(x => x.JobStartMonth)
                .HasColumnName("JobStartMonth")
                .HasMaxLength(25);

            builder.Property(x => x.JobStartYear)
                .HasColumnName("JobStartYear");

            builder.Property(x => x.JobEndMonth)
                .HasColumnName("JobEndMonth")
                .HasMaxLength(25); 

            builder.Property(x => x.JobEndYear)
                .HasColumnName("JobEndYear");

            builder.Property(x => x.JobSector)
                .HasColumnName("JobSector")
                .HasMaxLength(100);

            builder.Property(x => x.JobDescription)
                .HasColumnName("JobDescription")
                .HasColumnType("text"); 

            builder.Property(x => x.JobTitlePerfil)
                .HasColumnName("JobTitlePerfil")
                .HasMaxLength(50);
        }
    }
}
