﻿using AutoMapper;
using SRD.Domain.Perfil.DTO;

namespace SRD.Application.JobExperience.Automapping
{
    public class AcademicEducationProfile : Profile
    {
        public AcademicEducationProfile() 
        {
            CreateMap<JobExperienceDTO, Domain.Perfil.Entities.JobExperience>();
        }
    }
}
