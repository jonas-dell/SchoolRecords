using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.Perfil.Entities
{
    public class AcademicEducation
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? AcademicType { get; set; }
        public string? StudyArea { get; set; }
        public string? StudyStartMonth { get; set; }
        public string? StudyStartYear { get; set; }
        public string? StudyEndMonth { get; set; }
        public string? StudyEndYear { get; set; }
        public double? Note { get; set; }
        public string? ActivitiesGroups { get; set; }
        public string? Description { get; set; }
        public int PerfilId{ get; set; }
        public Perfil? Perfil { get; set; }
    }
}
