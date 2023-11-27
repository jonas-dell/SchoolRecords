using Microsoft.AspNetCore.Http;

namespace SRD.Domain.Perfil.DTO
{
    public class ArticleDTO
    {
        public string? Title { get; set; }
        public string? Authors { get; set; }
        public string? Day { get; set; }
        public string? Month { get; set; }
        public string? Year { get; set; }
        public int NumberPages { get; set; }
        public string? PdfFile { get; set; }
    }
}
