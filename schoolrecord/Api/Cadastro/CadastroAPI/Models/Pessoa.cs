using System.ComponentModel.DataAnnotations;

namespace CadastroAPI.Models
{
  public class Pessoa
  {
    [Key]
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
  }
}
