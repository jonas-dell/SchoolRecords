using SRD.Core.Data;
using SRD.Domain.Perfil.Entities;
using SRD.Domain.Perfil.Repositories;
using SRD.Infra.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Infra.Perfil.Repositories
{
    public class UserPostRepository : IUserPostRepository
    {
        private readonly DataContext _context;

        public UserPostRepository(DataContext context)
        {
            _context = context;
        }
        public IUnitOfWork UnitOfWork => _context;
        public void Dispose()
        {
            _context.Dispose();
        }

      

        public IList<UserPost> GetAllPost()
        {
            List<UserPost> posts = new List<UserPost>();
            posts = _context.UserPost.ToList();
            posts.Reverse();
            return posts;
        }

        public UserPost GetUserPostById(int perfilId)
        {
            return _context.UserPost.Where(p => p.PerfilId == perfilId).FirstOrDefault();
        }
   

        public void Insert(UserPost entity)
        {
            _context.UserPost.Add(entity);
        }

        public void Update(UserPost entity)
        {
            _context.UserPost.Update(entity);
        }
    }
}
