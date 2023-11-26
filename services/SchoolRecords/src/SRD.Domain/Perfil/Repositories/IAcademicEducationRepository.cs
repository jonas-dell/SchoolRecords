using SRD.Core.Data;
namespace SRD.Domain.Perfil.Repositories
{
    public interface IAcademicEducationRepository : IRepository<Entities.AcademicEducation>
    {
        void Insert(Entities.AcademicEducation entity);
        void Update(Entities.AcademicEducation entity);
        IList<Entities.AcademicEducation> GetAllAcadEducation();
        Entities.AcademicEducation GetAcadEducationById(int id);
        int GetAcadEducationFkByPerfilId(int id);
    }
}
