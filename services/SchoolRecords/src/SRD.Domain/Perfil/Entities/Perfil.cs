using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public string? District { get; set; }
        public string? City { get; set; }
        public int Number { get; set; }
        public User.Entities.User User { get; set; }
        public int UserId { get; set; }
    }
}
