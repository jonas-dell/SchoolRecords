using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SRD.API.Context;
using SRD.API.Models;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;

        public UserController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();

            }
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username || x.Email == userObj.Email && x.Password == userObj.Password);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            return Ok(new
            
                { Message = "Deu bom", Successful = true
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registred",
                Successful = true
            });
        }

        [HttpGet("get-user")]
        //[Route("{id:int}")]
        //[ActionName("GetUser")]

        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            var pessoa = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            
            if (pessoa != null)
                return Ok(pessoa);
            
            return NotFound("Pessoa Not Found");
        }

        [HttpGet]
        public string GetName()
        {
            return "Rafael";
        }
    }
}
