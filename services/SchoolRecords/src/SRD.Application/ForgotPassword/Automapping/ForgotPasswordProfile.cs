using AutoMapper;
using SRD.Domain.User.DTO;

namespace SRD.Application.ForgotPassword.Automapping
{
    public class ForgotPasswordProfile : Profile
    {
        public ForgotPasswordProfile()
        {
            CreateMap<ForgotPasswordDTO, Domain.User.Entities.ForgotPassword>();

        }
    }
}
