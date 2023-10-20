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
    public class AcademicEducation
    {
        public class Command : IRequest<IRequestResponse> 
        {
            public AcademicEducationDTO? AcademicEducationDTO { get; set; }
        }

        public class CommandHandler : BaseCommandHandler, IRequestHandler<Command, IRequestResponse>
        {
            private readonly IMapper _mapper;
            private readonly IAcademicEducationRepository _academicEducationRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public CommandHandler(IAcademicEducationRepository academicEducationRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
            {
                _academicEducationRepository = academicEducationRepository;
                _mapper = mapper;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {

                var idClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

                if (idClaim != null)
                {
                    int AcadEducId = int.Parse(idClaim.Value);

                    var academicEducation = _academicEducationRepository.GetAcadEducationById(AcadEducId);

                    if(academicEducation == null)
                        RequestResponse.ErrorResponse("Trabalho não encontrado");
                    else
                    {
                        var acadEducaToUpdate = _mapper.Map(request.AcademicEducationDTO, academicEducation);
                        _academicEducationRepository.Update(acadEducaToUpdate);
                    }
                }

                return await SaveData(_academicEducationRepository.UnitOfWork);

            }
        }
    }
}
