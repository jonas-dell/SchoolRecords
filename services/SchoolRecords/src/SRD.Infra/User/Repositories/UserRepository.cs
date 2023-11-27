using Microsoft.EntityFrameworkCore;
using SRD.Core.Data;
using SRD.Domain.User.DTO;
using SRD.Domain.User.Entities;
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

        public void InsertContact(Domain.User.Entities.UserContact userContact)
        {
            _context.UserContacts.Add(userContact);
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
                        .Include(u => u.Perfil!)
                        .Include(x => x.Contacts!)
                        .ThenInclude(x => x.Perfil)
                        .Where(x => x.Id == id)
                        .Select(x => new Domain.User.Entities.User
                        {
                            Id = x.Id,
                            Username = x.Username,
                            Contacts = x.Contacts.Select(c => new Domain.User.Entities.User
                            {
                                Id = c.Id,
                                Username = c.Username,
                                Perfil = c.Perfil,
                            }).ToList()
                        })
                        .First();
        }

        public void Update(Domain.User.Entities.User user)
        {
            _context.Users.Update(user);
        }

        public Domain.User.Entities.User? GetByUserName(string username)
        {
            return _context.Users.FirstOrDefault(x => x.Username == username);
        }

        public Domain.User.Entities.User? GetByUserEmail(string email)
        {

            return _context.Users.FirstOrDefault(x => x.Email == email);
        }

        public IList<Domain.User.Entities.User> GetContactsByUserId(int userId)
        {
            var contactsId = _context.UserContacts
                .Where(x => x.UserId == userId).Select(x => x.ContactId);

            return _context.Users
                        .Include(u => u.Perfil!)
                        .Where(x => contactsId.Contains(x.Id))
                        .ToList();
        }

        public IList<Domain.User.Entities.User> GetInvites(int userId)
        {
            var contactsId = _context.UserContacts
                .Where(x => x.UserId == userId).Select(x => x.ContactId);

            return _context.Users
                        .Include(u => u.Perfil!)
                        .Where(x => !contactsId.Contains(x.Id))
                        .Where(x => x.Id != userId)
                        .ToList();
        }



        public Domain.User.Entities.User GetByIdUpdatePassword(int id)
        {
            return _context.Users
                .Where(x => x.Id == id)
                .Select(x => new Domain.User.Entities.User
                {
                    Id = x.Id,
                    Username = x.Username,
                    Password = x.Password,
                    Token = x.Token,
                    Role = x.Role,
                    Email = x.Email,
                })
                .FirstOrDefault();
        }



        public void UpdatePassword(int userId, Domain.User.Entities.User user)
        {
            var existingUser = GetByIdUpdatePassword(userId);

            if (existingUser != null)
            {
                // Desanexar a entidade se já estiver sendo rastreada
                _context.Entry(existingUser).State = EntityState.Detached;

                // Atualizar apenas a propriedade de senha
                existingUser.Password = user.Password;

                // Anexar e atualizar
                _context.Users.Attach(existingUser);
                _context.Entry(existingUser).Property(x => x.Password).IsModified = true;
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {


            var userToDelete = _context.Users.FirstOrDefault(x => x.Id == id);

            if (userToDelete != null)
            {

                var userContacts = _context.UserContacts.Where(uc => uc.UserId == id || uc.ContactId == id);
                _context.UserContacts.RemoveRange(userContacts);

                var userArticle = _context.Articles.Where(x => x.UserId == id);
                _context.Articles.RemoveRange(userArticle);

                var userPerfil = _context.Perfis.Where(x => x.UserId == id);
                _context.Perfis.RemoveRange(userPerfil);

                
                
                _context.Users.Remove(userToDelete);


                try
                {
                    _context.SaveChanges();
                }
                catch (DbUpdateException ex)
                {
                    foreach (var entry in ex.Entries)
                    {
                        Console.WriteLine($"Entity of type {entry.Entity.GetType().Name} in state {entry.State} has issues.");
                    }
                    Console.WriteLine(ex.Message);
                    throw;
                }
            }
        }
    }
}
