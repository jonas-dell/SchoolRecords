using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Repositories;

namespace SRD.Application.JobExperience.UseCases
{
    public class JobExperience
    {
        public class Command : IRequest<IRequestResponse> 
        {
            public JobExperienceDTO? JobExperienceDTO { get; set; }
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

            public Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                throw new NotImplementedException();
            }
        }
    }
}
