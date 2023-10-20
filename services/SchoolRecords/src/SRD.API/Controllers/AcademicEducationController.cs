using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Entities;
using SRD.Domain.Perfil.Repositories;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AcademicEducationController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IAcademicEducationRepository _academicEducation;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AcademicEducationController(IMediator mediator, IAcademicEducationRepository academicEducation, IHttpContextAccessor httpContextAccessor)
        {
            _mediator = mediator;
            _academicEducation = academicEducation;
            _httpContextAccessor = httpContextAccessor;
        }


        [HttpPut]
        public async Task<IActionResult> UpdateAcademicEducation([FromBody] AcademicEducationDTO academicEducation)
        {
            var command = new Application.JobExperience.UseCases.AcademicEducation.Command() 
            { 
                AcademicEducationDTO = academicEducation 
            };
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAcademicEducation()
        {
            var idClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

            if(idClaim != null)
            {
                int userId = int.Parse(idClaim.Value);

                var academicEducation = _academicEducation.GetAcadEducationById(userId);

                return Ok(academicEducation);
            }
            return BadRequest();
        }
    }
}
