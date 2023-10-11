using AutoMapper;
using MediatR;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.User.DTO;
using SRD.Domain.User.Entities;
using SRD.Domain.User.Repositories;

namespace SRD.Application.Login.UseCases
{
    public class RegisterUser
    {
        public class Command : IRequest<IRequestResponse>
        {
            public RegisterDTO? RegisterDTO { get; set; }
        }

        public class CommandHandler :
            BaseCommandHandler,
            IRequestHandler<Command, IRequestResponse>
        {
            private readonly IMapper _mapper;
            private readonly IUserRepository _userRepository;

            public CommandHandler(IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _mapper.Map<User>(request.RegisterDTO);

                var perfil = new Domain.Perfil.Entities.Perfil();
                user.Perfil = perfil;

                _userRepository.Insert(user);

                return await SaveData(_userRepository.UnitOfWork);
            }
        }
    }
}
