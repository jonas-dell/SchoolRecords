﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SRD.Infra.Context;

#nullable disable

namespace SRD.Infra.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20231031201857_add-pronouns")]
    partial class addpronouns
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.AcademicEducation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AcademicType")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("AcademicType");

                    b.Property<string>("ActivitiesGroups")
                        .HasColumnType("VARCHAR(400)")
                        .HasColumnName("ActivitiesGroups");

                    b.Property<string>("Description")
                        .HasColumnType("VARCHAR(1000)")
                        .HasColumnName("Description");

                    b.Property<decimal?>("Note")
                        .HasColumnType("DECIMAL(38,17)")
                        .HasColumnName("Note");

                    b.Property<int>("PerfilId")
                        .HasColumnType("int");

                    b.Property<string>("StudyArea")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("StudyArea");

                    b.Property<string>("StudyEndMonth")
                        .HasMaxLength(25)
                        .HasColumnType("VARCHAR(25)")
                        .HasColumnName("StudyEndMonth");

                    b.Property<string>("StudyEndYear")
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("StudyEndYear");

                    b.Property<string>("StudyStartMonth")
                        .HasMaxLength(25)
                        .HasColumnType("VARCHAR(25)")
                        .HasColumnName("StudyStartMonth");

                    b.Property<string>("StudyStartYear")
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("StudyStartYear");

                    b.Property<string>("Title")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("Title");

                    b.HasKey("Id");

                    b.HasIndex("PerfilId")
                        .IsUnique();

                    b.ToTable("AcademicEducation", (string)null);
                });

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Day")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("Day");

                    b.Property<string>("Email")
                        .HasColumnType("VARCHAR(300)")
                        .HasColumnName("Email");

                    b.Property<string>("Month")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("Month");

                    b.Property<string>("NumberPhone")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("NumberPhone");

                    b.Property<int>("PerfilId")
                        .HasColumnType("int");

                    b.Property<string>("TypePhone")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("TypePhone");

                    b.Property<string>("TypeSite")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("TypeSite");

                    b.Property<string>("UrlPerfil")
                        .HasColumnType("VARCHAR(800)")
                        .HasColumnName("UrlPerfil");

                    b.Property<string>("UrlSite")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("UrlSite");

                    b.Property<string>("Year")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("Year");

                    b.HasKey("Id");

                    b.HasIndex("PerfilId")
                        .IsUnique();

                    b.ToTable("Contact", (string)null);
                });

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.JobExperience", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("CheckboxJob")
                        .HasColumnType("bit")
                        .HasColumnName("CheckboxJob");

                    b.Property<string>("CompanyLocation")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("CompanyLocation");

                    b.Property<string>("CompanyName")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("CompanyName");

                    b.Property<string>("JobDescription")
                        .HasColumnType("TEXT")
                        .HasColumnName("JobDescription");

                    b.Property<string>("JobEndMonth")
                        .HasMaxLength(25)
                        .HasColumnType("VARCHAR(25)")
                        .HasColumnName("JobEndMonth");

                    b.Property<string>("JobEndYear")
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("JobEndYear");

                    b.Property<string>("JobSector")
                        .HasMaxLength(100)
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("JobSector");

                    b.Property<string>("JobStartMonth")
                        .HasMaxLength(25)
                        .HasColumnType("VARCHAR(25)")
                        .HasColumnName("JobStartMonth");

                    b.Property<string>("JobStartYear")
                        .HasColumnType("VARCHAR(50)")
                        .HasColumnName("JobStartYear");

                    b.Property<string>("JobTitle")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("JobTitle");

                    b.Property<string>("JobTitlePerfil")
                        .HasColumnType("VARCHAR(400)")
                        .HasColumnName("JobTitlePerfil");

                    b.Property<string>("JobType")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("JobType");

                    b.Property<int>("PerfilId")
                        .HasColumnType("int");

                    b.Property<string>("TypeLocation")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("TypeLocation");

                    b.HasKey("Id");

                    b.HasIndex("PerfilId")
                        .IsUnique();

                    b.ToTable("JobExperiences", (string)null);
                });

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.Perfil", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("About")
                        .HasColumnType("VARCHAR(4000)")
                        .HasColumnName("about");

                    b.Property<string>("City")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("city");

                    b.Property<string>("Complement")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("complement");

                    b.Property<string>("Country")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("country");

                    b.Property<string>("Education")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("education");

                    b.Property<string>("Foto")
                        .HasColumnType("TEXT")
                        .HasColumnName("foto");

                    b.Property<string>("Imagem")
                        .HasColumnType("TEXT")
                        .HasColumnName("imagem");

                    b.Property<string>("Neighborhood")
                        .HasColumnType("VARCHAR(300)")
                        .HasColumnName("neighborhood");

                    b.Property<int>("Number")
                        .HasColumnType("INT")
                        .HasColumnName("number");

                    b.Property<string>("PerfilLastName")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("perfilLastName");

                    b.Property<string>("PerfilName")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("perfilName");

                    b.Property<string>("Pronome")
                        .HasColumnType("VARCHAR(40)")
                        .HasColumnName("pronome");

                    b.Property<string>("Sector")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("sector");

                    b.Property<string>("State")
                        .HasColumnType("VARCHAR(10)")
                        .HasColumnName("state");

                    b.Property<string>("Street")
                        .HasColumnType("VARCHAR(200)")
                        .HasColumnName("street");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("ZipCode")
                        .HasColumnType("VARCHAR(12)")
                        .HasColumnName("zipCode");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Perfil", (string)null);
                });

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.UserPost", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Date")
                        .HasColumnType("VARCHAR(20)")
                        .HasColumnName("Date");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("Text")
                        .HasColumnName("Image");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("VARCHAR(4000)")
                        .HasColumnName("Name");

                    b.Property<int>("PerfilId")
                        .HasColumnType("int");

                    b.Property<string>("Post")
                        .HasColumnType("VARCHAR(4000)")
                        .HasColumnName("Post");

                    b.HasKey("Id");

                    b.HasIndex("PerfilId");

                    b.ToTable("UserPost", (string)null);
                });

            modelBuilder.Entity("SRD.Domain.User.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("email");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("password");

                    b.Property<string>("Role")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("role");

                    b.Property<string>("Token")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("token");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("username");

                    b.HasKey("Id");

                    b.ToTable("User", (string)null);
                });

            modelBuilder.Entity("SRD.Domain.User.Entities.UserContact", b =>
                {
                    b.Property<int>("ContactId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ContactId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserContact", (string)null);
                });

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.AcademicEducation", b =>
                {
                    b.HasOne("SRD.Domain.Perfil.Entities.Perfil", "Perfil")
                        .WithOne("AcademicEducation")
                        .HasForeignKey("SRD.Domain.Perfil.Entities.AcademicEducation", "PerfilId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Perfil");
                });

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.Contact", b =>
                {
                    b.HasOne("SRD.Domain.Perfil.Entities.Perfil", "Perfil")
                        .WithOne("Contact")
                        .HasForeignKey("SRD.Domain.Perfil.Entities.Contact", "PerfilId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Perfil");
                });

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.JobExperience", b =>
                {
                    b.HasOne("SRD.Domain.Perfil.Entities.Perfil", "Perfil")
                        .WithOne("JobExperience")
                        .HasForeignKey("SRD.Domain.Perfil.Entities.JobExperience", "PerfilId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Perfil");
                });

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.Perfil", b =>
                {
                    b.HasOne("SRD.Domain.User.Entities.User", "User")
                        .WithOne("Perfil")
                        .HasForeignKey("SRD.Domain.Perfil.Entities.Perfil", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.UserPost", b =>
                {
                    b.HasOne("SRD.Domain.Perfil.Entities.Perfil", "Perfil")
                        .WithMany("UserPosts")
                        .HasForeignKey("PerfilId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Perfil");
                });

            modelBuilder.Entity("SRD.Domain.User.Entities.UserContact", b =>
                {
                    b.HasOne("SRD.Domain.User.Entities.User", "Contact")
                        .WithMany()
                        .HasForeignKey("ContactId")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();

                    b.HasOne("SRD.Domain.User.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Contact");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SRD.Domain.Perfil.Entities.Perfil", b =>
                {
                    b.Navigation("AcademicEducation");

                    b.Navigation("Contact");

                    b.Navigation("JobExperience");

                    b.Navigation("UserPosts");
                });

            modelBuilder.Entity("SRD.Domain.User.Entities.User", b =>
                {
                    b.Navigation("Perfil");
                });
#pragma warning restore 612, 618
        }
    }
}
