using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.Contact.UseCase;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Repositories;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ContactController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IContactRepository _contactRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ContactController(IMediator mediator, IContactRepository contactRepository, IHttpContextAccessor httpContextAccessor)
        {
            _mediator = mediator;
            _contactRepository = contactRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateContact([FromBody] ContactDTO contactDTO)
        {
            var command = new Contact.Command() { ContactDTO = contactDTO };

            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
