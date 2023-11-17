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
            private readonly IForgotPasswordRepository _forgotPasswordRepository;
            private readonly IEmailService _emailService;

            public CommandHandler(IUserRepository userRepository, IEmailService emailService, IForgotPasswordRepository forgotPasswordRepository)
            {
                _userRepository = userRepository;
                _emailService = emailService;
                _forgotPasswordRepository = forgotPasswordRepository;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _userRepository.GetByUserEmail(request.ForgotPasswordDTO.Email);

                if (user == null)
                {
                    return RequestResponse.ErrorResponse("Email não cadastrado");
                }

                string token = TokenService.GenerateToken(user);

                var recoveryToken = new Domain.User.Entities.ForgotPassword
                {
                    UserId = user.Id,
                    Token = token.Substring(0,6),
                    CreatedAt = DateTime.UtcNow
                };

                _forgotPasswordRepository.Insert(recoveryToken);
                
                //await _emailService.SendPasswordRecoveryEmail(user, user.Token);

                return RequestResponse.SuccessResponse("Email cadastrado", recoveryToken);
            }
        }
    }
}
