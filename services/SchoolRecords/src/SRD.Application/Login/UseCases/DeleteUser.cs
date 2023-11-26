using MediatR;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.User.Repositories;

namespace SRD.Application.Login.UseCases
{
    public class DeleteUser
    {
        public class Command : IRequest<IRequestResponse>
        {
            public int Id { get; set; }
        }

        public class CommandHandler :
            BaseCommandHandler,
            IRequestHandler<Command, IRequestResponse>
        {
            private readonly IUserRepository _userRepository;

            public CommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }
            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {

                _userRepository.Delete(request.Id);
                return RequestResponse.SuccessResponse("Usuário excluído com sucesso.",null);
            }
        }
    }
}
