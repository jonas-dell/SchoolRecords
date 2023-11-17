using MediatR;
using SRD.Application.Services;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.User.DTO;
using SRD.Domain.User.Repositories;

namespace SRD.Application.Login.UseCases
{
    public class ForgotPassword
    {
        public class Command : IRequest<IRequestResponse>
        {
            public ForgotPasswordDTO? ForgotPasswordDTO { get; set; }
        }

        public class CommandHandler : BaseCommandHandler, IRequestHandler<Command, IRequestResponse>
        {
            private readonly IUserRepository _userRepository;
            private readonly IEmailService _emailService;

            public CommandHandler(IUserRepository userRepository, IEmailService emailService)
            {
                _userRepository = userRepository;
                _emailService = emailService;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _userRepository.GetByUserEmail(request.ForgotPasswordDTO.Email);

                if (user == null)
                {
                    return RequestResponse.ErrorResponse("Email não cadastrado");
                }

                user.Token = TokenService.GenerateToken(user); 
                //6 primeiras letra no banco de dados


                await _emailService.SendPasswordRecoveryEmail(user.Email, user.Token);

                return RequestResponse.SuccessResponse("Email cadastrado", user);
            }
        }
    }
}
