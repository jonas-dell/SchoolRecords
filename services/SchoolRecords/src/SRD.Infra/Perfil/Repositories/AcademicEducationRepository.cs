using SRD.Core.Data;
using SRD.Domain.Perfil.Entities;
using SRD.Domain.Perfil.Repositories;
using SRD.Infra.Context;


namespace SRD.Infra.Perfil.Repositories
{
    public class AcademicEducationRepository : IAcademicEducationRepository
    {
        private readonly DataContext _context;

        public AcademicEducationRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public IUnitOfWork UnitOfWork => _context;
        
        public void Dispose()
        {
            _context.Dispose();
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

        public void Insert(AcademicEducation entity)
        {
            _context.AcademicEducation.Add(entity);
        }

        public void Update(AcademicEducation entity)
        {
            _context.AcademicEducation.Update(entity);

        }

        public IList<AcademicEducation> GetAllAcadEducation()
        {
            return _context.AcademicEducation.ToList();    
        }

        public AcademicEducation GetAcadEducationById(int id)
        {
            return _context.AcademicEducation.Where(p => p.PerfilId == id).FirstOrDefault();
        }

        public int GetAcadEducationFkByPerfilId(int id)
        {
            var AcadEducation = _context.AcademicEducation
                                    .Where(e => e.PerfilId == id)
                                    .FirstOrDefault();

            if (AcadEducation != null)
            {
                return AcadEducation.PerfilId;
            }

            return 0;

        }
    }
}
