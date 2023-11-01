using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.Perfil.DTO
{
    public class UserPostDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public string? Post { get; set; }
        public string? Date { get; set; }
        public int? PerfilId { get; set; }
    }
}
