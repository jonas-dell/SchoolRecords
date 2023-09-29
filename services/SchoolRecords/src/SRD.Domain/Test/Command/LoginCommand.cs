using SRD.Core.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SRD.Domain.Test.Entities;
using SRD.Domain.Test.Repositories;

    using MediatR;
using SRD.Core.Commands;
using SRD.Domain.User.Repositories;

namespace SRD.Domain.Test.Command
{
    public class LoginCommand
    {
        public class Command : IRequest<IRequestResponse>
        {
            public Teste? Login { get; set; }
        }

       
        public class CommandHandler :
            BaseCommandHandler,
            IRequestHandler<Command, IRequestResponse>
        {
            private readonly ITestRepository _userRepository;

            public CommandHandler(ITestRepository userRepository)
            {
                _userRepository = userRepository;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _userRepository.Logar(request.Login.Name);

                if (user == null) return RequestResponse.ErrorResponse("Usuário não cadastrado");

                if (user != null && user.Password != request.Login.Password)
                    return RequestResponse.ErrorResponse("Usuário ou senha incorretos");

                return  RequestResponse.SuccessResponse($"Bem-Vindo, {user?.Name}", user);
            }
        }
    }
}
