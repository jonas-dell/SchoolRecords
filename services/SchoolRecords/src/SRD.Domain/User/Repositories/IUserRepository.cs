using SRD.Core.Data;

namespace SRD.Domain.User.Repositories
{
    public interface IUserRepository: IRepository<Entities.User>
    {
        void Insert(Entities.User user);
        void Update(Entities.User user);
        IList<Entities.User> FindAll();
        Entities.User GetById(int id);
    }
}
