using AutoMapper;
using SRD.Domain.Perfil.DTO;

namespace SRD.Application.Contact.Automapping
{
    public class ContactProfile : Profile
    {
        public ContactProfile()
        {
            CreateMap<ContactDTO, Domain.Perfil.Entities.Contact>();
        }
    }
}
