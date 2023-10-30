using MediatR;
using Microsoft.AspNetCore.Http;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.User.Entities;
using SRD.Domain.User.Repositories;
using System.Security.Claims;

namespace SRD.Application.JobExperience.UseCases
{
    public class InviteUser
    {
        public class Command : IRequest<IRequestResponse>
        {
            public int ContactId { get; set; }
        }

        public class CommandHandler : BaseCommandHandler, IRequestHandler<Command, IRequestResponse>
        {
            private readonly IUserRepository _userRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public CommandHandler(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
            {
                _userRepository = userRepository;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var userId = int.Parse((_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)).Value);

                var userContact = new UserContact
                {
                    UserId = userId,
                    ContactId = request.ContactId
                };

                _userRepository.InsertContact(userContact);

                return await SaveData(_userRepository.UnitOfWork);
            }
        }
    }
}
