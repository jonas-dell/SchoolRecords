using SRD.Core.Data;
using SRD.Domain.Perfil.Entities;
using SRD.Domain.Perfil.Repositories;
using SRD.Infra.Context;

namespace SRD.Infra.Perfil.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly DataContext _context;

        public ContactRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public IUnitOfWork UnitOfWork => _context;

        public void Dispose()
        {
            _context.Dispose();
        }

        public IList<Contact> GetAll()
        {
            return _context.Contacts.ToList();
        }

        public Contact GetContactById(int id)
        {
            return _context.Contacts.Where(x => x.PerfilId == id).FirstOrDefault();
        }

        public int GetContactFKById(int perfilId)
        {
            var contact = _context.Contacts
                .Where(x => x.PerfilId == perfilId)
                .FirstOrDefault();

            if(contact != null) 
            {
                return contact.PerfilId;
            }
            return 0;
        }

        public void Insert(Contact contact)
        {
            _context.Contacts.Add(contact);
        }

        public void Update(Contact contact)
        {
            _context.Contacts.Update(contact);
        }
    }
}
