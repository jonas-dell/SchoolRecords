using SRD.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.Perfil.Repositories
{
    public interface IJobExperienceRepository : IRepository<Entities.JobExperience>
    {
        void Insert(Entities.JobExperience entity);
        void Update(Entities.JobExperience entity);
        IList<Entities.JobExperience> GetAllJobs();
        Entities.JobExperience? GetJobExperienceById(int id);
        int GetJobExperienceFkByPerfilId(int id);

    }
}
