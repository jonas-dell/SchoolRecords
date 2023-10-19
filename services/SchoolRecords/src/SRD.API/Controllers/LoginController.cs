using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.Login.UseCases;
using SRD.Domain.User.DTO;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class LoginController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LoginController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            var command = new RegisterUser.Command() { RegisterDTO = registerDTO };

            var result = await _mediator.Send(command);

            return Ok(result);
        }
        
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var command = new Login.Command() { LoginDTO = loginDTO };

            var result = await _mediator.Send(command);

            return Ok(result);
        }


        [HttpGet]
        public async Task<IActionResult> LoginWindowsAuthentication()
        {
            var userName = HttpContext.User.Identity.Name.Split("\\")[1];

            var command = new LoginWithWindowsAuthentication.Command() { UserName = userName };

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
