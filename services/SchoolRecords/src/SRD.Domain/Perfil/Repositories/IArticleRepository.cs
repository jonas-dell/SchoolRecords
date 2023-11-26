using SRD.Core.Data;

namespace SRD.Domain.Perfil.Repositories
{
    public interface IArticleRepository : IRepository<Entities.Article>
    {
        void Insert(Entities.Article article);
        void Update(Entities.Article article);
        IList<Entities.Article> GetAll();
        Entities.Article GetById(int id);
        int GetArticleByFkByUserId(int id);
    }
}
