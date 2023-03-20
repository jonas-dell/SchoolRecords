using MediatR;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.Login.DTO;
using SRD.Domain.User.Repositories;

namespace SRD.Application.Login.UseCases
{
    public class Login
    {
        public class Command : IRequest<IRequestResponse>
        {
            public LoginDTO LoginDTO { get; set; }
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
                var user = _userRepository.GetByUserName(request.LoginDTO.UserName);

                if (user == null) return RequestResponse.ErrorResponse("Usuário não cadastrado");

                if (user != null && user.Password != request.LoginDTO.Password)
                    return RequestResponse.ErrorResponse("Usuário ou senha incorretos");

                return RequestResponse.SuccessResponse($"Bem-Vindo, {user?.Username}", user);
            }
        }
    }
}
