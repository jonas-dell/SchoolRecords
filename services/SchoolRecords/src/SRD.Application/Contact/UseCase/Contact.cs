using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Repositories;
using System.Security.Claims;

namespace SRD.Application.Contact.UseCase
{
    public class Contact
    {
        public class Command : IRequest<IRequestResponse>
        {
            public ContactDTO? ContactDTO { get; set; }
        }

        public class CommandHandler : BaseCommandHandler, IRequestHandler<Command, IRequestResponse>
        {
            private readonly IMapper _mapper;
            private readonly IContactRepository _contactRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public CommandHandler(IMapper mapper, IContactRepository contactRepository, IHttpContextAccessor httpContextAccessor)
            {
                _mapper = mapper;
                _contactRepository = contactRepository;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var idClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

                if (idClaim != null)
                {
                    int contactId = int.Parse(idClaim.Value);

                    var contact = _contactRepository.GetContactById(contactId);

                    if (contact == null)
                        RequestResponse.ErrorResponse("Contato não encontrado");
                    else
                    {
                        var contactToUpdate = _mapper.Map(request.ContactDTO, contact);
                        _contactRepository.Update(contactToUpdate);
                    }
                }
                return await SaveData(_contactRepository.UnitOfWork);
            }
        }
    }
}
