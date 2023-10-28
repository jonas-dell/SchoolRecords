using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.Perfil.Repositories;
using System.Security.Claims;

namespace SRD.Application.Perfil.UseCases
{
    public class PerfilImagem
    {
        public class Command : IRequest<IRequestResponse>
        {
            public string? Imagem { get; set; }
        }

        public class CommandHandler : BaseCommandHandler, IRequestHandler<Command, IRequestResponse>
        {
            private readonly IMapper _mapper;
            private readonly IPerfilRepository _perfilRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public CommandHandler(IPerfilRepository perfilRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
            {
                _perfilRepository = perfilRepository;
                _mapper = mapper;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var idClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

                if (idClaim != null)
                {
                    int userId = int.Parse(idClaim.Value);

                    var perfil = _perfilRepository.GetById(userId);

                    if (perfil == null)
                        RequestResponse.ErrorResponse("Perfil não cadastrado");
                    else
                    {
                        var perfilToUpdate = _mapper.Map(request.Imagem, perfil.Imagem);
                        _perfilRepository.UpdateImagem(userId, perfilToUpdate.ToString());
                    }
                }
                return await SaveData(_perfilRepository.UnitOfWork);
            }
        }
    }
}
