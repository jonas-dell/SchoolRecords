﻿namespace SRD.Domain.Perfil.Entities
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
        public string? JobStartYear { get; set; }
        public string? JobEndMonth { get; set; }
        public string? JobEndYear { get; set; }
        public string? JobSector { get; set; }
        public string? JobDescription { get; set; }
        public string? JobTitlePerfil { get; set; }
        public List<string>? Skills { get; set; }
        public int PerfilId{ get; set; }
        public Perfil? Perfil { get; set; }
    }
}
