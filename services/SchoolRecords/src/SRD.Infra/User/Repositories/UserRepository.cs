﻿using Microsoft.EntityFrameworkCore;
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
                        //.Include(x => x.Contacts)
                        //.ThenInclude(x => x.Users)
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

        public IList<Domain.User.Entities.User> GetContactsByUserId(int userId)
        {
            var contactsId = _context.UserContacts
                .Where(x => x.UserId == userId).Select(x => x.ContactId);

            return _context.Users
                        .Include(u => u.Perfil!)
                        .Where(x => contactsId.Contains(x.Id))
                        .ToList();
        }
    }
}
