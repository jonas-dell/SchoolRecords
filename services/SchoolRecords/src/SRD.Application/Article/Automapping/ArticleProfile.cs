using AutoMapper;
using SRD.Domain.Perfil.DTO;

namespace SRD.Application.Article.Automapping
{
    public class ArticleProfile : Profile
    {
        public ArticleProfile()
        {
            CreateMap<ArticleDTO, Domain.Perfil.Entities.Article>();
        }
    }
}
