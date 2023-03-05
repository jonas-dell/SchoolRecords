using MediatR;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.Login.DTO;
using SRD.Application.Login.UseCases;

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
        public IActionResult Login([FromBody] LoginDTO loginDTO)
        {
            var command = new Login.Command() { LoginDTO = loginDTO };

            var result = _mediator.Send(command);

            return Ok(result);
        }
    }
}
