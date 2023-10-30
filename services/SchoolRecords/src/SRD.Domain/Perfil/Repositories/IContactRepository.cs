using SRD.Core.Data;

namespace SRD.Domain.Perfil.Repositories
{
    public interface IContactRepository : IRepository<Entities.Contact>
    {
        void Insert(Entities.Contact entity);
        void Update(Entities.Contact entity);
        IList<Entities.Contact> GetAll();
        Entities.Contact GetContactById(int id);
        int GetContactFKById(int id);
    }
}
