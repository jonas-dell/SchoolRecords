using MediatR;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.Login.UseCases;
using SRD.Domain.User.DTO;
using SRD.Domain.User.Repositories;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IUserRepository _userRepository;

        public ForgotPasswordController( IUserRepository userRepository,IMediator mediator)
        {
            _userRepository = userRepository;
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO forgotPasswordDTO)
        {
            var command = new ForgotPassword.Command() { ForgotPasswordDTO = forgotPasswordDTO };

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
