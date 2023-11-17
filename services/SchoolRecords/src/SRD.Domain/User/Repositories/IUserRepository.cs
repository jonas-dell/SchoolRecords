using SRD.Core.Data;

namespace SRD.Domain.User.Repositories
{
    public interface IUserRepository: IRepository<Entities.User>
    {
        void Insert(Entities.User user);
        void Update(Entities.User user);
        IList<Entities.User> FindAll();
        IList<Entities.User> GetContactsByUserId(int userId);
        IList<Entities.User> GetInvites(int userId);
        Entities.User GetById(int id);
        Entities.User? GetByUserName(string userName);
        Entities.User? GetByUserEmail(string email);
        void InsertContact(Entities.UserContact userContact);
    }
}
