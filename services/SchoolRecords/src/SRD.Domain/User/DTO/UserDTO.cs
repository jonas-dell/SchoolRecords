using SRD.Domain.Perfil.DTO;

namespace SRD.Domain.User.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
        public string? Email { get; set; }
        public PerfilDTO? Perfil { get; set; }
        public List<UserDTO>? Contacts { get; set; }
    }
}
