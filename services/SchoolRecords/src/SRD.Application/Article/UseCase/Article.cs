using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Entities;
using SRD.Domain.Perfil.Repositories;
using System.Security.Claims;

namespace SRD.Application.Article.UseCase
{
    public class Article
    {
        public class Command : IRequest<IRequestResponse>
        {
            public ArticleDTO ArticleDTO { get; set; }
        }


        public class CommandHandler :
           BaseCommandHandler,
           IRequestHandler<Command, IRequestResponse>
        {
            private readonly IArticleRepository _articleRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly IMapper _mapper;

            public CommandHandler(IArticleRepository articleRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
            {
                _articleRepository = articleRepository;
                _httpContextAccessor = httpContextAccessor;
                _mapper = mapper;

            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var idClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);


                if (idClaim != null)
                {
                    int userId = int.Parse(idClaim.Value);

                    var article = _articleRepository.GetById(userId);

                    if (article == null)
                    {
                        RequestResponse.ErrorResponse("Artigo não encontrado");
                    }
                    else
                    {
                        var articleToUpdae = _mapper.Map(request.ArticleDTO, article);
                        // Verificar se um arquivo PDF foi fornecido
                        if (request.ArticleDTO.PdfFile != null && request.ArticleDTO.PdfFile.Length > 0)
                        {
                            // Atualizar o conteúdo do PDF na entidade Article
                            article.PdfFile = request.ArticleDTO.PdfFile;
                        }

                        // Atualizar o artigo no repositório
                        _articleRepository.Update(article);
                    }
                    
                }
                return await SaveData(_articleRepository.UnitOfWork);
            }
        }
    }
}