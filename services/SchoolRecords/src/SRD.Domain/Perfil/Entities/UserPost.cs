using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.Perfil.Entities
{
    public  class UserPost
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? JobTitle { get; set; }
        public string? Foto { get; set; }
        public string? Midia { get; set; }
        public string? Tipo { get; set; }
        public string? Post { get; set; }
        public string? Date { get; set; }
        public int PerfilId { get; set; }
        public Perfil? Perfil { get; set; }
    }

}
