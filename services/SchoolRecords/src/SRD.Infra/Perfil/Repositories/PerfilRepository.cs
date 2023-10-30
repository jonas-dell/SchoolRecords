using SRD.Core.Data;
using SRD.Domain.Perfil.Repositories;
using SRD.Infra.Context;


namespace SRD.Infra.Perfil.Repositories
{
    public class PerfilRepository : IPerfilRepository
    {
        private readonly DataContext _context;
        public PerfilRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public IUnitOfWork UnitOfWork => _context;
        public void Insert(Domain.Perfil.Entities.Perfil perfil)
        {
            _context.Perfis.Add(perfil);
        }
        public void Update(Domain.Perfil.Entities.Perfil perfil)
        {
            _context.Perfis.Update(perfil);
        }
        public IList<Domain.Perfil.Entities.Perfil> GetAll()
        {
            return _context.Perfis.ToList();
        }
        public void Dispose()
        {
            _context.Dispose();
        }

        public Domain.Perfil.Entities.Perfil? GetById(int id)
        {
            var perfil = _context.Perfis.Where(p => p.UserId == id).FirstOrDefault();

            return perfil;
        }
        public Domain.Perfil.Entities.Perfil? GetByPerfilName(string perfilName)
        {
            return _context.Perfis.Where(x => x.PerfilName == perfilName).FirstOrDefault();
        }
        public void UpdateFoto(int id , string foto)
        {
            var perfil = _context.Perfis.Where(p => p.UserId == id).First();
            perfil.Foto = foto;
            _context.Perfis.Update(perfil);
        }

        public void UpdateImagem(int id, string imagem)
        {
            var perfil = _context.Perfis.Where(p => p.UserId == id).First();
            perfil.Imagem = imagem;
            _context.Perfis.Update(perfil);
        }
    }
}
