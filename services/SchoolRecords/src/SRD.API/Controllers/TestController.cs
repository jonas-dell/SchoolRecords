using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SRD.Domain.Test.Command;
using SRD.Domain.Test.Entities;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]/[action]")]
    public class TestController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TestController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Teste loginDTO)
        {
            var command = new LoginCommand.Command() { Login = loginDTO };

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
