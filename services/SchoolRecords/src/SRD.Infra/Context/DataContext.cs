using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SRD.Core.Data;

namespace SRD.Infra.Context
{
    public class DataContext : DbContext, IUnitOfWork
    {
        private readonly IConfiguration _configuration;

        public DataContext(IConfiguration configuration)
        {
            _configuration = configuration;   
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (Microsoft.EntityFrameworkCore.Metadata.IMutableProperty property in modelBuilder.Model.GetEntityTypes().SelectMany(
                e => e.GetProperties().Where(p => p.ClrType == typeof(string))))
                property.SetColumnType("VARCHAR(250)");

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(_configuration.GetConnectionString("DefaultConnectionString"));
        }

        public DbSet<Domain.User.Entities.User> Users { get; set; }
        public DbSet<Domain.User.Entities.UserContact> UserContacts { get; set; }
        public DbSet<Domain.Perfil.Entities.Perfil> Perfis { get; set; }
        public DbSet<Domain.Perfil.Entities.JobExperience> JobExperiences { get; set; }
        public DbSet<Domain.Perfil.Entities.AcademicEducation> AcademicEducation { get; set; }
        public DbSet<Domain.Perfil.Entities.UserPost> UserPost { get; set; }
        public DbSet<Domain.Perfil.Entities.Contact> Contacts { get; set; }
        public DbSet<Domain.User.Entities.ForgotPassword> PasswordRecoveryTokens { get; set; }

        public async Task<bool> Commit()
        {
            foreach (Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry entry in ChangeTracker.Entries()
               .Where(entry => entry.Entity.GetType().GetProperty("CreateDate") != null))
            {
                if (entry.State != EntityState.Added)
                {
                    entry.Property("CreateDate").CurrentValue = DateTime.Now;
                }

                if (entry.State != EntityState.Modified)
                {
                    entry.Property("CreateDate").IsModified = false;
                }
            }

            bool success = await base.SaveChangesAsync() > 0;

            return success;
        }
    }
}
