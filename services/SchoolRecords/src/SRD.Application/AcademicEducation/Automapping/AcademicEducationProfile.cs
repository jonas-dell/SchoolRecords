using AutoMapper;
using SRD.Domain.Perfil.DTO;

namespace SRD.Application.AcademicEducation.Automapping
{
    public class AcademicEducationProfile : Profile
    {
        public AcademicEducationProfile() 
        {
            CreateMap<AcademicEducationDTO, Domain.Perfil.Entities.AcademicEducation>();
        }
    }
}
