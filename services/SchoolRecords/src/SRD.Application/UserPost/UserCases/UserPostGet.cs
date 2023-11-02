using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Entities;
using SRD.Domain.Perfil.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Application.UserPost.UserCases
{
    public class UserPostGet 
    {
        public class Command : IRequest<IRequestResponse>
        {
            public UserPostDTO userPostDTO { get; set; }

        }
        public class CommandHandler : BaseCommandHandler, IRequestHandler<Command, IRequestResponse>
        {
            private readonly IMapper _mapper;
            private readonly IUserPostRepository _userPostRepository;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public CommandHandler(IMapper mapper, IUserPostRepository userPostRepository, IHttpContextAccessor httpContextAccessor)
            {
                _mapper = mapper;
                _userPostRepository = userPostRepository;
                _httpContextAccessor = httpContextAccessor;

            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {


                var userId = await Task.Run(() => int.Parse((_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)).Value));
         

               var userPost = new Domain.Perfil.Entities.UserPost();
                        _userPostRepository.GetAllPost();
                    
                
                return await SaveData(_userPostRepository.UnitOfWork);
            }

          
        }
    }
}
