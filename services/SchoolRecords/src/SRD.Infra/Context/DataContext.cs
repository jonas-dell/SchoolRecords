using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SRD.Domain.User.Entities;

namespace SRD.Infra.Context
{
    public class DataContext : DbContext
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

        public DbSet<User> Users { get; set; }
    }
}
