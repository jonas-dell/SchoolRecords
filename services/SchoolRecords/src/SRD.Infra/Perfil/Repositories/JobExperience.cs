using SRD.Core.Data;
using SRD.Domain.Perfil.Repositories;
using SRD.Infra.Context;


namespace SRD.Infra.Perfil.Repositories
{
    public class JobExperience : IJobExperience
    {
        private readonly DataContext _context;

        public JobExperience(DataContext dataContext)
        {
            _context = dataContext;
        }

        public IUnitOfWork UnitOfWork => _context;

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

        public void Dispose()
        {
            _context.Dispose();
        }
      
      
    }
}
