using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.JobExperience.UseCases;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Repositories;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class JobExperienceController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IJobExperienceRepository _jobExperience;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public JobExperienceController(IMediator mediator,IJobExperienceRepository jobExperience,IHttpContextAccessor httpContextAccessor)
        {
            _mediator = mediator;
            _jobExperience = jobExperience;
            _httpContextAccessor = httpContextAccessor;
        }


        [HttpPut]
        public async Task<IActionResult> UpdateJobExperience([FromBody] JobExperienceDTO jobExperienceDTO)
        {
            var command = new JobExperience.Command() { JobExperienceDTO = jobExperienceDTO };

            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetJobExperience()
        {
            var idClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

            if(idClaim != null)
            {
                int userId = int.Parse(idClaim.Value);

                var jobExperience = _jobExperience.GetJobExperienceById(userId);

                return Ok(jobExperience);
            }
            return BadRequest();
        }
    }
}
