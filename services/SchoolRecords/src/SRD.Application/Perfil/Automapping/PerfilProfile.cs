using AutoMapper;
using SRD.Domain.Perfil.DTO;

namespace SRD.Application.Perfil.Automapping
{
    public class PerfilProfile : Profile
    {
        public PerfilProfile()
        {
            CreateMap<PerfilDTO, Domain.Perfil.Entities.Perfil>();
        }
    }
}
