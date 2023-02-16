using CadastroAPI.Data;
using CadastroAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CadastroAPI.Controllers
{
  [ApiController]
  [Route("api/controller")]
  public class PessoaController : Controller
  {
    private readonly PessoaDbContext pessoaDbContext;
    public PessoaController(PessoaDbContext pessoaDbContext)
    {
      this.pessoaDbContext = pessoaDbContext;
    }
    //Get all people
    [HttpGet]
    public async Task<IActionResult> GetAllPeople()
    {
      var pessoas = await pessoaDbContext.Pessoas.ToListAsync();
      return Ok(pessoas);
    }

    //Get people
    [HttpGet]
    [Route("{id:guid}")]
    [ActionName("GetPessoa")]
    public async Task<IActionResult> GetPessoa([FromRoute] Guid id)
    {
      var pessoa = await pessoaDbContext.Pessoas.FirstOrDefaultAsync(x => x.Id == id);
      if (pessoa != null){
        return Ok(pessoa);
      }
      return NotFound("Pessoa Not Found");
    }

    //Add Pessoa
    [HttpPost]
    public async Task<IActionResult> AddPessoa([FromBody] Pessoa pessoa)
    {
      pessoa.Id = Guid.NewGuid();

      await pessoaDbContext.Pessoas.AddAsync(pessoa);
      await pessoaDbContext.SaveChangesAsync();

      return CreatedAtAction(nameof(GetPessoa),new { id = pessoa.Id }, pessoa);
    }

    //Updating a Pessoa
    [HttpPut]
    [Route("{id:guid}")]
    public async Task<IActionResult> UpdatePessoa([FromRoute] Guid id, [FromBody] Pessoa pessoa)
    {
      var existingPessoa = await pessoaDbContext.Pessoas.FirstOrDefaultAsync(x => x.Id == id);
      if (existingPessoa != null)
      {
        existingPessoa.Nome = pessoa.Nome;
        existingPessoa.Email = pessoa.Email;
        existingPessoa.Password = pessoa.Password;
        await pessoaDbContext.SaveChangesAsync();
        return Ok(existingPessoa);

      }
      return NotFound("Pessoa Not Found");
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public async Task<IActionResult> DeletePessoa([FromRoute] Guid id)
    {
      var existingPessoa = await pessoaDbContext.Pessoas.FirstOrDefaultAsync(x => x.Id == id);
      if (existingPessoa != null)
      {
        pessoaDbContext.Remove(existingPessoa);
        await pessoaDbContext.SaveChangesAsync();
        return Ok(existingPessoa);

      }
      return NotFound("Pessoa Not Found");
    }
  }
}
