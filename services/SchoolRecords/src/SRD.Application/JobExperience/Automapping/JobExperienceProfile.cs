using AutoMapper;
using SRD.Domain.Perfil.DTO;

namespace SRD.Application.JobExperience.Automapping
{
    public class JobExperienceProfile : Profile
    {
        public JobExperienceProfile() 
        {
            CreateMap<JobExperienceDTO, Domain.Perfil.Entities.JobExperience>();
        }
    }
}
