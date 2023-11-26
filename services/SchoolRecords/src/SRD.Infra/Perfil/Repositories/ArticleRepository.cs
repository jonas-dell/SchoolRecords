using SRD.Core.Data;
using SRD.Domain.Perfil.Entities;
using SRD.Domain.Perfil.Repositories;
using SRD.Infra.Context;

namespace SRD.Infra.Perfil.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly DataContext _context;

        public ArticleRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public IUnitOfWork UnitOfWork => _context;

        public void Dispose()
        {
            _context.Dispose();
        }

        public void Insert(Article article)
        {
            _context.Articles.Add(article);
            _context.SaveChanges();
        }

        public void Update(Article article)
        {
            _context.Articles.Update(article);
        }

        public IList<Article> GetAll()
        {
            return _context.Articles.ToList();
        }

        public Article GetById(int id)
        {
            return _context.Articles.Where(a => a.UserId == id).FirstOrDefault();
        }

        public int GetArticleByFkByUserId(int id)
        {
            var article = _context.Articles
                         .Where(je => je.UserId == id)
                         .FirstOrDefault();
            return 0;
        }
    }
}
