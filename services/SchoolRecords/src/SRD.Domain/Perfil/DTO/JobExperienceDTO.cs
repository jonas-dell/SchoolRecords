namespace SRD.Domain.Perfil.DTO
{
    public class JobExperienceDTO
    {
        public string? Title { get; set; }
        public string? JobType { get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyLocation { get; set; }
        public string? TypeLocation { get; set; }
        public bool checkboxJob { get; set; }
        public string? JobStartMonth { get; set; }
        public int JobStartYear { get; set; }
        public string? JobEndMonth { get; set; }
        public int JobEndYear { get; set; }
        public string? JobSector { get; set; }
        public string? JobDescription { get; set; }
        public string? JobTitlePerfil { get; set; }
    }
}
