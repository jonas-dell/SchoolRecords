using AutoMapper;
using SRD.Domain.Perfil.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Application.UserPost.Automapping
{
    public class UserPostProfile : Profile
    { 
    public UserPostProfile()
    {
        CreateMap<UserPostDTO,Domain.Perfil.Entities.UserPost>();
    }
}
}
