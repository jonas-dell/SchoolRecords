﻿using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using SRD.Core.Commands;
using SRD.Core.Responses;
using SRD.Domain.Perfil.DTO;
using SRD.Domain.Perfil.Entities;
using SRD.Domain.Perfil.Repositories;
using SRD.Domain.User.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Application.UserPost.UserCases
{
    public class UserPost 
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
            private readonly IPerfilRepository _perfilRepository;
            private readonly IJobExperienceRepository _jobExperienceRepository;
            private readonly IUserRepository _userRepository;
            public CommandHandler(IUserRepository userRepository,IJobExperienceRepository jobExperienceRepository, IPerfilRepository perfilRepository,IMapper mapper, IUserPostRepository userPostRepository, IHttpContextAccessor httpContextAccessor)
            
            {

                _mapper = mapper;
                _userRepository = userRepository;
                _userPostRepository = userPostRepository;
                _httpContextAccessor = httpContextAccessor;
                _perfilRepository = perfilRepository;
                _jobExperienceRepository= jobExperienceRepository;
            }

            public async Task<IRequestResponse> Handle(Command request, CancellationToken cancellationToken)
            {


               var userId = await Task.Run(() => int.Parse((_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)).Value));
               var user = _userRepository.GetById(userId);
                var perfil = _perfilRepository.GetById(userId);
               request.userPostDTO.PerfilId = perfil.Id;
               var job = " ";
                if (perfil.PerfilName != null)
                {
                     request.userPostDTO.Name = perfil.PerfilName;
                    job = _jobExperienceRepository.GetJobExperienceById(perfil.Id).JobTitlePerfil;
                }
                else {
                    request.userPostDTO.Name = user.Username;
                }
               
               request.userPostDTO.JobTitle = job;
               request.userPostDTO.Foto = perfil.Foto;
               request.userPostDTO.Date = DateTime.Now.ToString();
               var userPost = new Domain.Perfil.Entities.UserPost();
               var userPostUpdate = _mapper.Map(request.userPostDTO,userPost);
                        _userPostRepository.Insert(userPostUpdate);
                    
                return await SaveData(_userPostRepository.UnitOfWork);
            }

          
        }
    }
}
