using SRD.Core.Data;
using SRD.Domain.User.Repositories;
using SRD.Infra.Context;

namespace SRD.Infra.User.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public IUnitOfWork UnitOfWork => _context;

        public void Insert(Domain.User.Entities.User user)
        {
            _context.Users.Add(user);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
