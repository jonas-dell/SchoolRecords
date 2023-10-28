
using SRD.Core.Data;

namespace SRD.Domain.Perfil.Repositories
{
    public interface IPerfilRepository : IRepository<Entities.Perfil>
    {
        void Insert(Entities.Perfil entity);
        void Update(Entities.Perfil entiy);
        void UpdateFoto(int id, string foto);
        void UpdateImagem(int id, string imagem);
        IList<Entities.Perfil> GetAll();
        Entities.Perfil? GetById(int id);
        Entities.Perfil? GetByPerfilName(string perfilName);
    }
}
