namespace SRD.Domain.Perfil.Entities
{
    public class Perfil
    {
        public int Id { get; set; }
        public string? PerfilName { get; set; }
        public string? PerfilLastName { get; set; }
        public string? About { get; set; }
        public string? Sector { get; set; }
        public string? Education { get; set; }
        public string? Country { get; set; }
        public string? ZipCode { get; set; }
        public string? Street { get; set; }
        public int Number { get; set; }
        public string? Complement { get; set; }
        public string? Neighborhood { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Foto { get; set; }
        public string? Imagem { get; set; }
        public int UserId { get; set; }
        public User.Entities.User? User { get; set; }
        public virtual JobExperience? JobExperience { get; set; }
        public virtual AcademicEducation? AcademicEducation { get; set; }
        public virtual ICollection<UserPost?> UserPosts { get; set; } = new List<UserPost>();
        public virtual Contact? Contact { get; set; }
    }
}
