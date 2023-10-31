using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Repositories;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserPostController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IUserPostRepository _userPostRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IPerfilRepository _perfilRepository;

        public UserPostController(IPerfilRepository perfilRepository, IMediator mediator, IUserPostRepository userPostRepository, IHttpContextAccessor httpContextAccessor)
        {
            _mediator = mediator;
            _userPostRepository = userPostRepository;
            _httpContextAccessor = httpContextAccessor;
            _perfilRepository = perfilRepository;
        }

        [HttpPut]
        public async Task<IActionResult> AddPost([FromBody] UserPostDTO userPost)
        {



            var command = new Application.UserPost.UserCases.UserPost.Command()
            {
                userPostDTO = userPost
            };
            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}
