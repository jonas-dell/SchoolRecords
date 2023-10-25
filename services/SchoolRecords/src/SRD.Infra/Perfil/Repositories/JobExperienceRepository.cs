using SRD.Core.Data;
using SRD.Domain.Perfil.Repositories;
using SRD.Infra.Context;


namespace SRD.Infra.Perfil.Repositories
{
    public class JobExperienceRepository : IJobExperienceRepository
    {
        private readonly DataContext _context;

        public JobExperienceRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public IUnitOfWork UnitOfWork => _context;
        
        public void Dispose()
        {
            _context.Dispose();
        }

        public void Insert(Domain.Perfil.Entities.JobExperience jobExperience)
        {
            _context.JobExperiences.Add(jobExperience);
        }
        
        public void Update(Domain.Perfil.Entities.JobExperience jobExperience)
        {
            _context.JobExperiences.Update(jobExperience);
        }

        public IList<Domain.Perfil.Entities.JobExperience> GetAllJobs()
        {
            return _context.JobExperiences.ToList();
        }
        
        public Domain.Perfil.Entities.JobExperience? GetJobExperienceById(int id)
        {
            return _context.JobExperiences.Where(p => p.PerfilId == id).FirstOrDefault();
        }

        public int GetJobExperienceFkByPerfilId(int perfilId)
        {
            var jobExperience = _context.JobExperiences
                                      .Where(je => je.PerfilId == perfilId)
                                      .FirstOrDefault();

            if (jobExperience != null)
            {
                return jobExperience.PerfilId;
            }

            return 0; 
        }
    }
}
