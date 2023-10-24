using AutoMapper;
using SRD.Domain.User.DTO;
using SRD.Domain.User.Entities;

namespace SRD.Application.Login.Automapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<RegisterDTO, User>();
            CreateMap<User, UserDTO>();
        }
    }
}
