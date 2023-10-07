namespace SRD.Domain.User.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
        public string? Email { get; set; }
        public Perfil.Entities.Perfil Perfil { get; set; }
        public IList<User>? Contacts { get; set; }
        public IList<User>? Users { get; set; }
    }
}
