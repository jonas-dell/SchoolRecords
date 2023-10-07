using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.Perfil.UseCases;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Repositories;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]/[action]")]
    public class PerfilController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IPerfilRepository _perfilRepository;

        public PerfilController(IMediator mediator,IPerfilRepository perfilRepository)
        {
            _mediator = mediator;
            _perfilRepository = perfilRepository;
        }
       
        [HttpPut]
        public async Task<IActionResult> UpdatePerfil([FromBody] PerfilDTO perfilDTO)
        {
            // Recupere o ID do usuário autenticado a partir da sessão
            //var userId = HttpContext.Session.GetInt32("UserId");

            //if(!userId.HasValue)
            //{
            //    return Unauthorized("O usuário não está autenticado");
            //}

            //var perfil = _perfilRepository.GetById(userId.Value);

            //if(perfil == null)
            //{
            //    return NotFound("Perfil não encontrado para este usuário\nPerfil Padrão.");
            //}

            var userId = 1;

            var command = new Perfil.Command() 
            { 
                Id = userId,
                PerfilDTO = perfilDTO 
            };

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
