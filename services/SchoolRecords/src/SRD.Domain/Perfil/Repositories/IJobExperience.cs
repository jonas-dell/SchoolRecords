using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.Perfil.Repositories
{
    public interface IJobExperience
    {
        void Insert(Entities.JobExperience entity);
        void Update(Entities.JobExperience entity);
        IList<Entities.JobExperience> GetAllJobs();
        
    }
}
