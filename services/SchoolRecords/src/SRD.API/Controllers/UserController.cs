using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SRD.Application.JobExperience.UseCases;
using SRD.Application.Login.UseCases;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.User.DTO;
using SRD.Domain.User.Repositories;
using SRD.Infra.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly DataContext _authContext;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserController(DataContext appDbContext, IUserRepository userRepository, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor)
        {
            _authContext = appDbContext;
            _userRepository = userRepository;
            _mapper = mapper;
            _mediator = mediator;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {

            var userId = await Task.Run(() => int.Parse((_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)).Value));

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (user != null)
                return Ok(user);

            return NotFound("Usuário não encontrado");
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts([FromQuery] int id, [FromQuery] int skip = 10, [FromQuery] int take = 10)
        {
            var contatos = _userRepository.GetContactsByUserId(id).Select(x => new
            {
                x.Id,
                Name = x.Perfil.PerfilName,
                Address = x.Perfil.City,
                Image = x.Perfil.Foto
            });

            return Ok(await Task.Run(() => contatos.Skip(skip).Take(take)));
        }

        [HttpGet] 
        public async Task<IActionResult> GetContactsById([FromQuery] int id)
        {

            var contatos = _userRepository.GetContactsByUserId(id).Select(x => new
            {
                x.Id,
            });
            return Ok(contatos);
        }

        [HttpGet]
        public async Task<IActionResult> GetInvites([FromQuery] int id, [FromQuery] int skip = 10, [FromQuery] int take = 10)
        {
            var contatos = _userRepository.GetInvites(id).Select(x => new
            {
                x.Id,
                Name = x.Perfil.PerfilName,
                Address = x.Perfil.City,
                Image = x.Perfil.Foto,
                Eduacation = x.Perfil.Education
            });

            return Ok(await Task.Run(() => contatos.Skip(skip).Take(take)));
        }



        [HttpPost]
        public async Task<IActionResult> SendInvite([FromBody] int contactId)
        {
            var command = new InviteUser.Command() { ContactId = contactId };

            var result = await _mediator.Send(command);

            return Ok(result);
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
