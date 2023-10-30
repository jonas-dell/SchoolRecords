namespace SRD.Domain.Perfil.Entities
{
    public class Contact
    {
        public int Id { get; set; }
        public string? UrlPerfil { get; set; }
        public string? Email { get; set; }
        public string? NumberPhone { get; set; }
        public string? TypePhone { get; set; }
        public string? Day { get; set; }
        public string? Month { get; set; }
        public string? Year { get; set; }
        public string? UrlSite { get; set; }
        public string? TypeSite { get; set; }
        public int PerfilId { get; set; }
        public Perfil? Perfil { get; set; }
    }
}
