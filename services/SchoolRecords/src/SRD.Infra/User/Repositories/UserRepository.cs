using Microsoft.EntityFrameworkCore;
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

        public IList<Domain.User.Entities.User> FindAll()
        {
            return _context.Users.ToList();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public Domain.User.Entities.User GetById(int id)
        {
            return _context.Users
                        .Where(x => x.Id == id)
                        .Include(x => x.Contacts)
                        .ThenInclude(x => x.Users)
                        .First();
        }

        public void Update(Domain.User.Entities.User user)
        {
            _context.Users.Update(user);
        }

        public Domain.User.Entities.User? GetByUserName(string username)
        {
            return _context.Users.Where(x => x.Username == username).FirstOrDefault();
        }
    }
}
