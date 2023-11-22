// Em SRD.Application.ForgotPassword.UseCases
using MediatR;
using SRD.Application.Services;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.User.DTO;
using SRD.Domain.User.Entities;
using SRD.Domain.User.Repositories;

namespace SRD.Application.ForgotPassword.UseCases
{
    public class UpdatePassword
    {
        public class Command : IRequest<IRequestResponse>
        {
            public ForgotPasswordDTO? ForgotPasswordDTO { get; set; }
            public NewPasswordDTO? NewPassword { get; set; }
        }

        public class CommandHandler : BaseCommandHandler, IRequestHandler<Command, IRequestResponse>
        {
            private readonly IUserRepository _userRepository;
            private readonly IForgotPasswordRepository _forgotPasswordRepository;

            public CommandHandler(IUserRepository userRepository, IForgotPasswordRepository forgotPasswordRepository)
            {
                _userRepository = userRepository;
                _forgotPasswordRepository = forgotPasswordRepository;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                
                var recoveryToken = Login.UseCases.ForgotPassword._recovery;

                var userToken = _userRepository.GetByIdUpdatePassword(recoveryToken.UserId);

                userToken.Password = request.NewPassword.NewPassword;
               

                _userRepository.UpdatePassword(recoveryToken.UserId,userToken);

                return RequestResponse.SuccessResponse();
            }
        }
    }
}
