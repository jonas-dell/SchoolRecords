using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SRD.Domain.User.DTO;
using SRD.Domain.User.Repositories;
using SRD.Infra.Context;
using System;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RecoveryTokenController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IForgotPasswordRepository _forgotPasswordRepository;
        private readonly DataContext _dataContext;

        public RecoveryTokenController(DataContext dataContext, IForgotPasswordRepository forgotPasswordRepository, IMediator mediator)
        {
            _mediator = mediator;
            _forgotPasswordRepository = forgotPasswordRepository;
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetRecoveryToken([FromQuery] string token)
        {
            var forgotPassword = await _dataContext.PasswordRecoveryTokens.FirstOrDefaultAsync(x => x.Token == token);

            if (forgotPassword != null)
            {
                var timeElapsed = DateTime.Now - forgotPassword.CreatedAt;
                if (timeElapsed.TotalMinutes <= 10)
                {
                    return Ok(200); //200 - OK
                }
                else
                {
                    return Ok(400); //400 - BadRequest
                }
            }
            else
            {
                return Ok(404); //404 - NotFound
            }
        }

    }
}
