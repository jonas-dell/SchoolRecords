using MediatR;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.ForgotPassword.UseCases;
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
        private static ForgotPasswordDTO _saveForgotPasswordDTO;

        public ForgotPasswordController( IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO forgotPasswordDTO)
        {
            _saveForgotPasswordDTO = forgotPasswordDTO;
            var command = new ForgotPassword.Command() { ForgotPasswordDTO = forgotPasswordDTO };

            var result = await _mediator.Send(command);

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> UpdatePassword([FromBody] NewPasswordDTO newPassword)
        {
            var command = new UpdatePassword.Command()
            {
                NewPassword = newPassword,
                ForgotPasswordDTO = _saveForgotPasswordDTO
            };

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
