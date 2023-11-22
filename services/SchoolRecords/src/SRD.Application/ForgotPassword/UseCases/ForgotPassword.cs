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
        public static Domain.User.Entities.ForgotPassword _recovery;

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

                static string RandomizarToken(string token)
                {
                    char[] chars = token.ToCharArray();
                    Random random = new Random();

                    for (int i = chars.Length - 1; i > 0; i--)
                    {
                        int j = random.Next(0, i + 1);
                        char temp = chars[i];
                        chars[i] = chars[j];
                        chars[j] = temp;
                    }

                    return new string(chars);
                }
                var recoveryToken = new Domain.User.Entities.ForgotPassword
                {
                    UserId = user.Id,
                    Token = RandomizarToken(token.Substring(0,6)),
                    Email = user.Email,
                    CreatedAt = DateTime.UtcNow
                };

                _recovery = recoveryToken;


                _forgotPasswordRepository.Insert(recoveryToken);


                await _emailService.SendPasswordRecoveryEmail(user, recoveryToken.Token);

                return await SaveData(_forgotPasswordRepository.UnitOfWork);
            }

           
        }
    }
}
