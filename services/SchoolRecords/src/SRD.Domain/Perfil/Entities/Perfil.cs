namespace SRD.Domain.Perfil.Entities
{
    public class Perfil
    {
        public int Id { get; set; }
        public string? PerfilName { get; set; }
        public string? PerfilLastName { get; set; }
        public string? Sector { get; set; }
        public string? Education { get; set; }
        public string? Country { get; set; }
        public int? ZipCode { get; set; }
        public string? Street { get; set; }
        public int Number { get; set; }
        public string? Complement { get; set; }
        public string? Neighborhood { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public int UserId { get; set; }
        public User.Entities.User? User { get; set; }
    }
}
