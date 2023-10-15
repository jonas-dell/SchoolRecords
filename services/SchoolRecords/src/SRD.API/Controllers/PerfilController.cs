using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.JobExperience.UseCases;
using SRD.Application.Perfil.UseCases;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Repositories;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
   
    public class PerfilController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IPerfilRepository _perfilRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PerfilController(IMediator mediator, IPerfilRepository perfilRepository, IHttpContextAccessor httpContextAccessor)
        {
            _mediator = mediator;
            _perfilRepository = perfilRepository;
            _httpContextAccessor = httpContextAccessor;
        }


        [HttpPut]
        public async Task<IActionResult> UpdatePerfil([FromBody] PerfilDTO perfilDTO)
        {
            var command = new Perfil.Command() { PerfilDTO = perfilDTO };

            var result = await _mediator.Send(command);

            return Ok(result);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateFoto([FromBody] string foto)
        {
            var command = new PerfilFoto.Command() { Foto = foto };
            var result = await _mediator.Send(command);
            return Ok(result);
        }

<<<<<<< HEAD
        [HttpPut]
        public async Task<IActionResult> UpdateJobExperience([FromBody] JobExperienceDTO jobExperienceDTO)
        {
            var command = new JobExperience.Command() { JobExperienceDTO = jobExperienceDTO };

            var result = await _mediator.Send(command);

=======

        [HttpPut]
        public async Task<IActionResult> UpdateFoto([FromBody] string foto)
        {
            var command = new PerfilFoto.Command() { Foto = foto };
            var result = await _mediator.Send(command);
>>>>>>> 409cc6581ae59d667bc9305a9f57f70e6b415705
            return Ok(result);
        }
    }
}
