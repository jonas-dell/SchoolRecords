using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.JobExperience.UseCases;
using SRD.Application.Perfil.UseCases;
using SRD.Core.Responses;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Repositories;
using System;
using System.IO;
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

        [HttpPost]
        public async Task<IActionResult> UpdateFoto([FromForm] IFormFile image)
        {
            if (image == null)
            {
                return BadRequest("Imagem não atualizada");
            }

            using (var ms = new MemoryStream())
            {
                await image.CopyToAsync(ms);
                byte[] imageBytes = ms.ToArray();

                string base64String = Convert.ToBase64String(imageBytes);

                var command = new PerfilFoto.Command() { Foto = base64String };

                var result = await _mediator.Send(command);

                return Ok(result);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateImagem([FromForm] IFormFile imagem)
            {
            if (imagem == null)
            {
                return BadRequest("Imagem não atualizada");
            }

            using (var ms = new MemoryStream())
            {
                await imagem.CopyToAsync(ms);
                byte[] imagemBytes = ms.ToArray();

                string base64String = Convert.ToBase64String(imagemBytes);

                var command = new PerfilImagem.Command() { Imagem = base64String };

                var result = await _mediator.Send(command);

                return Ok(result);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetUserPerfil()
        {
            var userId = await Task.Run(() => int.Parse((_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)).Value));

            var perfil = _perfilRepository.GetById(userId);

            return Ok(perfil);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateJobExperience([FromBody] JobExperienceDTO jobExperienceDTO)
        {
            var command = new JobExperience.Command() { JobExperienceDTO = jobExperienceDTO };

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
