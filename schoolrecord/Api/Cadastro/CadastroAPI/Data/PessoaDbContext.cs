using CadastroAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CadastroAPI.Data
{
  public class PessoaDbContext : DbContext
  {
    public PessoaDbContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Pessoa> Pessoas{get; set;}
  }
}
