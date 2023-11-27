namespace SRD.Domain.Perfil.Entities
{
    public class Article
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Authors { get; set; }
        public string? Day { get; set; }
        public string? Month { get; set; }
        public string? Year { get; set; }
        public int NumberPages { get; set; }
        public string? PdfFile { get; set; }
        public int UserId { get; set; } //Chave estrangeira
        public virtual User.Entities.User? User { get; set; } //Propriedade de navegação
    }
}
