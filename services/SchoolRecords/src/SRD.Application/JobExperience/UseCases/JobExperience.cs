using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Repositories;
using System.Security.Claims;

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
            private readonly IJobExperienceRepository _jobExperienceRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public CommandHandler(IJobExperienceRepository jobExperienceRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
            {   
                _jobExperienceRepository = jobExperienceRepository;
                _mapper = mapper;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {

                var idClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

                if (idClaim != null)
                {
                    int jobId = int.Parse(idClaim.Value);

                    var job = _jobExperienceRepository.GetJobExperienceById(jobId);

                    if(job == null)
                        RequestResponse.ErrorResponse("Trabalho não encontrado");
                    else
                    {
                        var jobToUpdate = _mapper.Map(request.JobExperienceDTO,job);
                        _jobExperienceRepository.Update(jobToUpdate);
                    }
                }

                return await SaveData(_jobExperienceRepository.UnitOfWork);

            }
        }
    }
}
