using SRD.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.Perfil.Repositories
{
    public interface IUserPostRepository : IRepository<Entities.UserPost>
    {
        void Insert(Entities.UserPost entity);
        IList<Entities.UserPost> GetAllPost();
    }
}
