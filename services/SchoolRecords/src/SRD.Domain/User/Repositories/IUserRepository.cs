using SRD.Core.Data;

namespace SRD.Domain.User.Repositories
{
    public interface IUserRepository: IRepository<Entities.User>
    {
        void Insert(Entities.User user);
    }
}
