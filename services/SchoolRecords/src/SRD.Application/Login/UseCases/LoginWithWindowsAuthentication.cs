using MediatR;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.User.Repositories;

namespace SRD.Application.Login.UseCases
{
    public class LoginWithWindowsAuthentication
    {
        public class Command : IRequest<IRequestResponse>
        {
            public string UserName { get; set; }
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
                var user = await Task.Run(() => _userRepository.GetByUserName(request.UserName));

                if (user == null) return RequestResponse.ErrorResponse("Usuário não cadastrado");

                return RequestResponse.SuccessResponse($"Bem-Vindo, {user?.Username}", user);
            }
        }
    }
}
