using MediatR;
using SRD.Application.Login.DTO;

namespace SRD.Application.Login.UseCases
{
    public class Login
    {
        public class Command : IRequest<string>
        {
            public LoginDTO LoginDTO { get; set; }
        }

        public class CommandHandler : IRequestHandler<Command, string>
        {
            public Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult("Deu bom"); 
            }
        }
    }
}
