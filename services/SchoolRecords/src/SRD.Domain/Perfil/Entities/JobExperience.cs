using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.Perfil.Entities
{
    public class JobExperience
    {
        public int Id { get; set; }
        public string? JobTitle { get; set; }
        public string? JobType { get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyLocation { get; set; }
        public string? TypeLocation { get; set; }
        public bool CheckboxJob { get; set; }
        public string? JobStartMonth { get; set; }
        public int JobStartYear { get; set; }
        public string? JobEndMonth { get; set; }
        public int JobEndYear { get; set; }
        public string? JobSector { get; set; }
        public string? JobDescription { get; set; }
        public string? JobTitlePerfil { get; set; }
    }
}
