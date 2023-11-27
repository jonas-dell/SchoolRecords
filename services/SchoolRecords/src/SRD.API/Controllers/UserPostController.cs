using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.Article.UseCase;
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
    public class UserPostController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IUserPostRepository _userPostRepository;
        private readonly IArticleRepository _articleRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IPerfilRepository _perfilRepository;

        public UserPostController(IPerfilRepository perfilRepository, IMediator mediator, IUserPostRepository userPostRepository, IHttpContextAccessor httpContextAccessor, IArticleRepository articleRepository)
        {
            _mediator = mediator;
            _userPostRepository = userPostRepository;
            _httpContextAccessor = httpContextAccessor;
            _perfilRepository = perfilRepository;
            _articleRepository = articleRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddPost([FromBody] UserPostDTO userPost)
        {
            var command = new Application.UserPost.UserCases.UserPost.Command()
            {
                userPostDTO = userPost
            };
            var result = await _mediator.Send(command);

            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetListPost()
        {
            var perfil = _userPostRepository.GetAllPost();
            return Ok(perfil);
        }


        [HttpPost]
        public async Task<IActionResult> Uploadpdf([FromForm] ArticleDTO articleDTO)
        {
            if (articleDTO.PdfFile == null)
            {
                Console.WriteLine("Deu ruim");
            }
            var command = new Article.Command() { ArticleDTO = articleDTO };

            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetPdf()
        {
            var pdf = _articleRepository.GetAll();

            return Ok(pdf);
        }
    }
}
