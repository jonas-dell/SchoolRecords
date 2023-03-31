using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SRD.Infra.Context;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _authContext;

        public UserController(DataContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user != null)
                return Ok(user);

            return NotFound("Usuário não encontrado");
        }
    }
}
